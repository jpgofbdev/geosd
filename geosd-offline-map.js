/* ============================================================
   GeoSD — Module de gestion du fond de carte hors-ligne (PMTiles).

   Dépend de PMTILES_REGIONS / pmtilesUrlFor / setActivePmtilesRegion
   (définis dans geosd-themes.js) et des classes CSS .overlay/.modal/
   .field déjà présentes dans geosd-common.css. À charger après
   geosd-themes.js.

   Base IndexedDB partagée avec sw-precache.js (mêmes noms de base et
   de magasin) : ce module écrit les fichiers téléchargés, le Service
   Worker les relit lors des requêtes réseau interceptées — aucun
   autre lien direct entre les deux fichiers.

   Un seul fichier régional stocké à la fois (remplacement, pas
   cumul) : conforme à la consigne « module ultra simple ».
   ============================================================ */
(function () {
  const DB_NAME = 'geosd_pmtiles_offline';
  const STORE_NAME = 'regions';
  const META_PREFIX = 'meta:'; // stocke {size, downloadedAt} à part du Blob, sous 'meta:<code>'

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
  function idbSet(key, value) {
    return openDb().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(value, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    }));
  }
  function idbDelete(key) {
    return openDb().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    }));
  }
  function idbKeys() {
    return openDb().then(db => new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).getAllKeys();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    }));
  }

  // Enregistrement du Service Worker, une fois par chargement de page.
  // Silencieux si non supporté : l'application reste utilisable, juste
  // sans fond hors-ligne (dégradation, pas de blocage).
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw-precache.js').catch(err => {
      console.error('GeoSD : échec d\'enregistrement du Service Worker hors-ligne.', err);
    });
  }

  let els = {};

  function fmtMo(bytes) { return (bytes / 1e6).toFixed(1) + ' Mo'; }

  async function currentDownloadedRegion() {
    const keys = await idbKeys();
    const dataKey = keys.find(k => typeof k === 'string' && k.indexOf(META_PREFIX) !== 0);
    if (!dataKey) return null;
    const meta = await idbGet(META_PREFIX + dataKey);
    return { code: dataKey, meta: meta || {} };
  }

  async function refreshStatus() {
    const current = await currentDownloadedRegion();
    if (current) {
      const label = (PMTILES_REGIONS.find(r => r.code === current.code) || {}).label || current.code;
      const dateStr = current.meta.downloadedAt ? new Date(current.meta.downloadedAt).toLocaleDateString('fr-FR') : '';
      els.statusLine.textContent = `Région disponible hors-ligne : ${label} (${fmtMo(current.meta.size || 0)}${dateStr ? ', téléchargée le ' + dateStr : ''}).`;
      els.purgeBtn.disabled = false;
    } else {
      els.statusLine.textContent = 'Aucune région téléchargée sur cet appareil pour l\'instant.';
      els.purgeBtn.disabled = true;
    }

    // Conseil de débit — purement indicatif, jamais bloquant : l'API
    // Network Information n'est pas supportée partout (absente sur
    // Safari/iOS notamment).
    let netHint;
    if (navigator.connection && navigator.connection.effectiveType) {
      const t = navigator.connection.effectiveType;
      netHint = (t === '4g')
        ? 'Connexion rapide détectée — le téléchargement devrait bien se passer.'
        : `Connexion possiblement lente détectée (${t}) — le téléchargement peut prendre du temps.`;
    } else {
      netHint = 'Utilisez de préférence le Wi-Fi ou une bonne 4G/5G pour ce téléchargement (environ 300 Mo selon la région).';
    }

    // Estimation d'espace disponible (approximative : quota alloué à
    // l'origine du site par le navigateur, pas l'espace disque réel de
    // l'appareil — c'est la seule information accessible depuis le web).
    if (navigator.storage && navigator.storage.estimate) {
      try {
        const est = await navigator.storage.estimate();
        const free = est.quota - est.usage;
        netHint += ` Espace estimé disponible pour GeoSD : ${fmtMo(free)}.`;
      } catch (e) { /* estimation indisponible, on continue sans */ }
    }
    els.hint.textContent = netHint;
  }

  function populateRegionSelect() {
    els.select.innerHTML = '';
    PMTILES_REGIONS.forEach(r => {
      const o = document.createElement('option');
      o.value = r.code;
      o.textContent = r.label + ' (' + r.code + ')';
      els.select.appendChild(o);
    });
    els.select.value = getActivePmtilesRegion();
  }

  async function downloadRegion(code) {
    const url = pmtilesUrlFor(code);
    els.progressWrap.style.display = '';
    els.downloadBtn.disabled = true;
    els.progressText.textContent = 'Démarrage du téléchargement...';
    els.progressBar.style.width = '0%';

    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const total = Number(resp.headers.get('content-length')) || 0;

      // Avertissement si le fichier dépasse ~50% de l'espace estimé
      // disponible, une fois la taille réelle connue via l'en-tête.
      if (navigator.storage && navigator.storage.estimate && total) {
        try {
          const est = await navigator.storage.estimate();
          if (est.quota && total > est.quota * 0.5) {
            const proceed = confirm(
              `Ce fichier (${fmtMo(total)}) occuperait plus de la moitié de l'espace estimé disponible sur cet appareil pour GeoSD. Continuer quand même ?`
            );
            if (!proceed) {
              els.progressWrap.style.display = 'none';
              els.downloadBtn.disabled = false;
              els.progressText.textContent = '';
              return;
            }
          }
        } catch (e) { /* estimation indisponible, on continue sans bloquer */ }
      }

      const reader = resp.body.getReader();
      const chunks = [];
      let received = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.length;
        const pct = total ? Math.round(received / total * 100) : null;
        els.progressBar.style.width = (pct || 0) + '%';
        els.progressText.textContent = pct !== null
          ? `${fmtMo(received)} / ${fmtMo(total)} (${pct}%)`
          : `${fmtMo(received)} téléchargés...`;
      }
      const blob = new Blob(chunks);

      // Un seul fichier à la fois : on retire toute région précédente
      // avant d'enregistrer la nouvelle.
      const existing = await currentDownloadedRegion();
      if (existing && existing.code !== code) {
        await idbDelete(existing.code);
        await idbDelete(META_PREFIX + existing.code);
      }
      await idbSet(code, blob);
      await idbSet(META_PREFIX + code, { size: blob.size, downloadedAt: Date.now() });

      if (navigator.storage && navigator.storage.persist) {
        await navigator.storage.persist().catch(() => {});
      }

      setActivePmtilesRegion(code);
      els.progressText.textContent = `✅ Terminé : ${fmtMo(blob.size)}. Cette région est maintenant utilisée comme fond de carte.`;
      await refreshStatus();
    } catch (err) {
      els.progressText.textContent = '❌ Échec du téléchargement : ' + err.message;
    } finally {
      els.downloadBtn.disabled = false;
    }
  }

  async function purgeAll() {
    const keys = await idbKeys();
    for (const k of keys) await idbDelete(k);
    els.progressWrap.style.display = 'none';
    els.progressText.textContent = '';
    await refreshStatus();
  }

  function openPanel() {
    populateRegionSelect();
    refreshStatus();
    els.overlay.classList.add('show');
  }
  function closePanel() {
    els.overlay.classList.remove('show');
  }

  function buildPanel() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id = 'offline-map-overlay';
    overlay.innerHTML = `
      <div class="modal">
        <h2>Fond de carte hors-ligne</h2>
        <p class="coords" id="offline-map-status-line"></p>
        <div class="field">
          <label for="offline-map-region-select">Région à télécharger</label>
          <select id="offline-map-region-select"></select>
        </div>
        <p id="offline-map-hint" style="font-size:12px; color:var(--ink-soft); margin:0 0 14px; line-height:1.5;"></p>
        <div id="offline-map-progress-wrap" style="display:none; margin-bottom:14px;">
          <div style="background:var(--paper); border:1px solid var(--line); border-radius:4px; height:10px; overflow:hidden;">
            <div id="offline-map-progress-bar" style="height:100%; width:0%; background:var(--accent); transition:width .2s;"></div>
          </div>
          <p id="offline-map-progress-text" style="font-size:12px; color:var(--ink-soft); margin:6px 0 0;"></p>
        </div>
        <div class="modal-actions" style="justify-content:space-between;">
          <button type="button" id="offline-map-purge" class="danger">Effacer le fond hors-ligne</button>
          <div style="display:flex; gap:8px;">
            <button type="button" id="offline-map-close">Fermer</button>
            <button type="button" id="offline-map-download" class="primary">Télécharger cette région</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    els = {
      overlay,
      statusLine: overlay.querySelector('#offline-map-status-line'),
      select: overlay.querySelector('#offline-map-region-select'),
      hint: overlay.querySelector('#offline-map-hint'),
      progressWrap: overlay.querySelector('#offline-map-progress-wrap'),
      progressBar: overlay.querySelector('#offline-map-progress-bar'),
      progressText: overlay.querySelector('#offline-map-progress-text'),
      purgeBtn: overlay.querySelector('#offline-map-purge'),
      closeBtn: overlay.querySelector('#offline-map-close'),
      downloadBtn: overlay.querySelector('#offline-map-download')
    };

    overlay.addEventListener('click', e => { if (e.target === overlay) closePanel(); });
    els.closeBtn.addEventListener('click', closePanel);
    els.downloadBtn.addEventListener('click', () => downloadRegion(els.select.value));
    els.purgeBtn.addEventListener('click', async () => {
      if (confirm('Effacer le fond de carte hors-ligne stocké sur cet appareil ?')) await purgeAll();
    });
  }

  function init() {
    buildPanel();
    const trigger = document.getElementById('btn-offline-map');
    if (trigger) trigger.addEventListener('click', openPanel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
