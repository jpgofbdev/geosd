/* ============================================================
   GeoSD — Service Worker hors-ligne : fond de carte PMTiles +
   coquille applicative (HTML/JS/CSS/bibliothèques externes).

   Deux responsabilités bien séparées dans ce fichier :

   1) FOND DE CARTE (régions PMTiles) — la bibliothèque `pmtiles` fait
      des requêtes HTTP avec en-tête `Range` vers un fichier régional
      (ex. CVL.pmtiles), que ce soit en ligne ou hors ligne — son code
      ne change jamais. Ce Service Worker intercepte ces requêtes et,
      si une copie de la région existe en IndexedDB (téléchargée via
      geosd-offline-map.js), découpe le fichier stocké avec
      Blob.slice() pour reconstruire une vraie réponse 206. Sinon,
      laisse passer vers le réseau (repli transparent).

   2) COQUILLE APPLICATIVE (HTML/JS/CSS de GeoSD + bibliothèques
      externes type Leaflet/protomaps-leaflet/polices) — mise en cache
      automatique dès la première visite en ligne, pour que
      l'application puisse redémarrer même après une coupure réseau
      totale (tablette éteinte, onglet fermé), pas seulement pour la
      lecture de données pendant une session déjà ouverte. Deux
      stratégies différentes selon le type de ressource (voir plus
      bas) : priorité réseau pour les fichiers de GeoSD lui-même (pour
      rester à jour dès qu'il y a du réseau), priorité cache pour les
      bibliothèques externes (qui changent rarement, donc autant
      privilégier la vitesse).

   Base IndexedDB partagée avec geosd-offline-map.js (mêmes noms de
   base et de magasin) pour le fond de carte ; les caches HTTP
   (Cache Storage) ci-dessous sont propres à ce fichier.
   ============================================================ */
const PMTILES_BASE_URL = 'https://tiles.jpg-cvl-dev.fr/tiles/';
const DB_NAME = 'geosd_pmtiles_offline';
const STORE_NAME = 'regions';

// Coquille applicative : fichiers propres à GeoSD, indispensables au
// démarrage de la page. Chemins relatifs à ce script (donc résolus
// dans le même dossier que sw-precache.js sur GitHub Pages).
const SHELL_CACHE = 'geosd-shell-v1';
const APP_SHELL_URLS = [
  'geosd-terrain-saisie.html',
  'geosd-themes.js',
  'geosd-offline-map.js',
  'geosd-common.css',
  'geosd-tokens.css',
  // Bibliothèques vendorisées (copies locales de Leaflet et
  // protomaps-leaflet, cf. README-spike.md étape 28) : désormais
  // same-origin, donc précachées ici comme le reste de la coquille —
  // plus besoin de dépendre d'un CDN externe dès le tout premier
  // chargement sur un nouvel appareil.
  'vendor/leaflet.css',
  'vendor/leaflet.js',
  'vendor/protomaps-leaflet.js'
];

// Bibliothèques externes (CDN) utilisées par l'application : mises en
// cache à la volée au premier chargement de chacune (pas de liste figée
// d'URLs exactes ici, pour rester robuste aux versions/hash de Google
// Fonts), reconnues par leur domaine.
const RUNTIME_CACHE = 'geosd-runtime-v1';
const CDN_HOST_PATTERN = /^https:\/\/(cdn\.jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(cache =>
      Promise.all(APP_SHELL_URLS.map(url =>
        cache.add(url).catch(err => {
          // Un seul fichier en échec ne doit pas bloquer toute
          // l'installation — juste le signaler.
          console.error('GeoSD SW : échec de mise en cache de ' + url, err);
        })
      ))
    ).then(() => self.skipWaiting()) // active tout de suite, pas d'attente de fermeture des onglets
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== SHELL_CACHE && k !== RUNTIME_CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim()) // prend le contrôle des pages déjà ouvertes
  );
});

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
function idbGet(key) {
  return openDb().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  }));
}

// Extrait le code région (ex. "CVL") d'une URL de tuileset, ou null si
// l'URL ne correspond pas au schéma attendu — dans ce cas la requête
// n'est pas concernée par cette partie du Service Worker.
function regionCodeFromUrl(url) {
  if (url.indexOf(PMTILES_BASE_URL) !== 0) return null;
  const rest = url.slice(PMTILES_BASE_URL.length);
  const match = /^([A-Za-z0-9_-]+)\.pmtiles/.exec(rest);
  return match ? match[1] : null;
}

self.addEventListener('fetch', event => {
  const url = event.request.url;

  // 1) Données cartographiques régionales — logique dédiée, prioritaire.
  const regionCode = regionCodeFromUrl(url);
  if (regionCode) {
    event.respondWith(handlePmtilesRequest(event.request, regionCode));
    return;
  }

  // Le reste (coquille applicative) ne concerne que les lectures GET.
  if (event.request.method !== 'GET') return;

  if (url.indexOf(self.location.origin) === 0) {
    // 2) Fichiers propres à GeoSD : priorité réseau (reste à jour dès
    // qu'il y a du réseau), repli sur le cache si hors ligne.
    event.respondWith(networkFirstThenCache(event.request, SHELL_CACHE));
  } else if (CDN_HOST_PATTERN.test(url)) {
    // 3) Bibliothèques externes : priorité cache (changent rarement,
    // donc autant privilégier la vitesse), rafraîchies en tâche de
    // fond dès qu'il y a du réseau.
    event.respondWith(staleWhileRevalidate(event.request, RUNTIME_CACHE));
  }
  // Sinon (autres domaines : tuiles OSM/IGN, etc.) : non concerné,
  // requête laissée totalement inchangée.
});

async function networkFirstThenCache(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw err;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then(response => {
      // Les requêtes cross-origin sans CORS explicite (cas des balises
      // <link>/<script> classiques vers un CDN, sans l'attribut
      // crossorigin) donnent des réponses "opaques" : statut toujours
      // 0, donc response.ok toujours faux même en cas de succès réel.
      // Il faut les mettre en cache quand même (type "opaque" ou
      // "basic"/"cors" avec ok), sinon rien n'est jamais stocké.
      if (response && (response.ok || response.type === 'opaque')) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);
  return cached || (await networkPromise) || Response.error();
}

async function handlePmtilesRequest(request, code) {
  let blob;
  try {
    blob = await idbGet(code);
  } catch (err) {
    blob = null;
  }

  if (!blob) {
    // Région pas (ou plus) téléchargée localement : laisser passer
    // vers le réseau normalement (repli transparent).
    return fetch(request);
  }

  const total = blob.size;
  const rangeHeader = request.headers.get('range');

  if (!rangeHeader) {
    return new Response(blob, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': String(total),
        'Accept-Ranges': 'bytes'
      }
    });
  }

  const match = /bytes=(\d+)-(\d+)?/.exec(rangeHeader);
  if (!match) {
    return new Response(blob, { status: 200 });
  }
  const start = Number(match[1]);
  const end = match[2] !== undefined ? Number(match[2]) : total - 1;
  const chunk = blob.slice(start, end + 1);

  return new Response(chunk, {
    status: 206,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Content-Length': String(chunk.size),
      'Accept-Ranges': 'bytes'
    }
  });
}
