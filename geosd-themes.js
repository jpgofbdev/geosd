/* ============================================================
   GeoSD — Configuration des thématiques + fonctions utilitaires
   communes aux 3 versions de l'application.

   ⚠️ NE PAS ÉDITER LE BLOC THEMES À LA MAIN : il est régénéré
   automatiquement par generate_themes.py à partir de
   modele-formulaires.csv. Pour modifier le modèle, éditer le CSV
   puis relancer le script.

   Ce fichier doit être chargé (<script src="geosd-themes.js">)
   AVANT le script propre à chaque page HTML.
   ============================================================ */

// ==THEMES_START==
const THEMES = {
  chasse: {
    label: "Chasse",
    subtypes: null,
    fields: [
      { name: "moment", label: "Braconnage", type: "select", required: true, options: ["Jour", "Nuit"] },
      { name: "nb_coups_de_feu", label: "Nombre de coups de feu entendus", type: "number", required: false },
      { name: "type_arme", label: "Type d'arme perçu", type: "select", required: false, options: ["Carabine", "Fusil", "Indéterminé"] },
      { name: "gibier_recherche", label: "Gibier supposé recherché", type: "select", required: false, options: ["Gros", "Petit", "Indéterminé"] },
      { name: "gibier_retrouve", label: "Gibier retrouvé / emmené", type: "text", required: false },
      { name: "vehicule_utilise", label: "Véhicule utilisé", type: "text", required: false },
      { name: "plaque_immatriculation", label: "Plaque d'immatriculation", type: "text", required: false },
      { name: "commune", label: "Commune", type: "text", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "heure", label: "Heure", type: "time", required: false },
      { name: "auteur_signalement", label: "Auteur signalement", type: "text", required: false },
      { name: "auteur_faits", label: "Auteur faits", type: "text", required: false },
      { name: "commentaire", label: "Commentaire", type: "text", required: false },
      { name: "fiabilite", label: "Fiabilité", type: "select", required: false, options: ["1", "2", "3", "4", "5"] }
    ]
  },
  peche: {
    label: "Pêche",
    subtypes: null,
    fields: [
      { name: "moment", label: "Braconnage", type: "select", required: true, options: ["Soir", "Nuit"] },
      { name: "type_milieu", label: "Type de milieu", type: "select", required: true, options: ["Étang", "Rivière", "Loire"] },
      { name: "nom_milieu", label: "Nom du milieu", type: "text", required: false },
      { name: "espece_ciblee", label: "Espèce ciblée supposée", type: "text", required: false },
      { name: "espece_retrouvee", label: "Espèce retrouvée", type: "text", required: false },
      { name: "vehicule_utilise", label: "Véhicule utilisé", type: "text", required: false },
      { name: "plaque_immatriculation", label: "Plaque d'immatriculation", type: "text", required: false },
      { name: "commune", label: "Commune", type: "text", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "heure", label: "Heure", type: "time", required: false },
      { name: "auteur_signalement", label: "Auteur signalement", type: "text", required: false },
      { name: "auteur_faits", label: "Auteur faits", type: "text", required: false },
      { name: "commentaire", label: "Commentaire", type: "text", required: false },
      { name: "fiabilite", label: "Fiabilité", type: "select", required: false, options: ["1", "2", "3", "4", "5"] }
    ]
  },
  eau: {
    label: "Eau",
    subtypes: {
      pollution: {
        label: "Pollution",
        fields: [
          { name: "type_pollution", label: "Type de pollution", type: "select", required: true, options: ["Organique", "Chimique", "Hydrocarbure", "Indéterminé"] },
          { name: "coloration", label: "Coloration observée", type: "text", required: false },
          { name: "odeur", label: "Odeur observée", type: "text", required: false },
          { name: "auteur_suppose", label: "Auteur supposé", type: "select", required: false, options: ["Particulier", "Entreprise", "Exploitation agricole"] },
          { name: "commune", label: "Commune", type: "text", required: true },
          { name: "date", label: "Date", type: "date", required: true },
          { name: "heure", label: "Heure", type: "time", required: false },
          { name: "auteur_signalement", label: "Auteur signalement", type: "text", required: false },
          { name: "auteur_faits", label: "Auteur faits", type: "text", required: false },
          { name: "commentaire", label: "Commentaire", type: "text", required: false },
          { name: "fiabilite", label: "Fiabilité", type: "select", required: false, options: ["1", "2", "3", "4", "5"] }
        ]
      }
    }
  },
  phytosanitaires: {
    label: "Phytosanitaires",
    subtypes: null,
    fields: [
      { name: "commune", label: "Commune", type: "text", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "heure", label: "Heure", type: "time", required: false },
      { name: "auteur_signalement", label: "Auteur signalement", type: "text", required: false },
      { name: "auteur_faits", label: "Auteur faits", type: "text", required: false },
      { name: "commentaire", label: "Commentaire", type: "text", required: false },
      { name: "fiabilite", label: "Fiabilité", type: "select", required: false, options: ["1", "2", "3", "4", "5"] }
    ]
  },
  vtm: {
    label: "VTM",
    subtypes: null,
    fields: [
      { name: "commune", label: "Commune", type: "text", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "heure", label: "Heure", type: "time", required: false },
      { name: "auteur_signalement", label: "Auteur signalement", type: "text", required: false },
      { name: "auteur_faits", label: "Auteur faits", type: "text", required: false },
      { name: "commentaire", label: "Commentaire", type: "text", required: false },
      { name: "fiabilite", label: "Fiabilité", type: "select", required: false, options: ["1", "2", "3", "4", "5"] }
    ]
  },
  fsc: {
    label: "FSC",
    subtypes: null,
    fields: [
      { name: "commune", label: "Commune", type: "text", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "heure", label: "Heure", type: "time", required: false },
      { name: "auteur_signalement", label: "Auteur signalement", type: "text", required: false },
      { name: "auteur_faits", label: "Auteur faits", type: "text", required: false },
      { name: "commentaire", label: "Commentaire", type: "text", required: false },
      { name: "fiabilite", label: "Fiabilité", type: "select", required: false, options: ["1", "2", "3", "4", "5"] }
    ]
  },
  habitat_especes: {
    label: "Habitat / espèces protégées",
    subtypes: null,
    fields: [
      { name: "commune", label: "Commune", type: "text", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "heure", label: "Heure", type: "time", required: false },
      { name: "auteur_signalement", label: "Auteur signalement", type: "text", required: false },
      { name: "auteur_faits", label: "Auteur faits", type: "text", required: false },
      { name: "commentaire", label: "Commentaire", type: "text", required: false },
      { name: "fiabilite", label: "Fiabilité", type: "select", required: false, options: ["1", "2", "3", "4", "5"] }
    ]
  },
  cueillette: {
    label: "Cueillette",
    subtypes: null,
    fields: [
      { name: "commune", label: "Commune", type: "text", required: true },
      { name: "date", label: "Date", type: "date", required: true },
      { name: "heure", label: "Heure", type: "time", required: false },
      { name: "auteur_signalement", label: "Auteur signalement", type: "text", required: false },
      { name: "auteur_faits", label: "Auteur faits", type: "text", required: false },
      { name: "commentaire", label: "Commentaire", type: "text", required: false },
      { name: "fiabilite", label: "Fiabilité", type: "select", required: false, options: ["1", "2", "3", "4", "5"] }
    ]
  }
};
// ==THEMES_END==

/* ---- Couleurs par thématique (palette colorblind-friendly, cyclique) ---- */
const THEME_COLOR_PALETTE = [
  '#1b9e77', '#d95f02', '#7570b3', '#e7298a',
  '#66a61e', '#e6ab02', '#a6761d', '#666666'
];
const THEME_KEYS = Object.keys(THEMES);
function themeColor(themeKey) {
  const i = THEME_KEYS.indexOf(themeKey);
  return THEME_COLOR_PALETTE[i >= 0 ? i % THEME_COLOR_PALETTE.length : 0];
}

/* ---- Résolution des champs à afficher selon thématique / sous-type ---- */
function getFieldsFor(themeKey, subtypeKey) {
  const theme = THEMES[themeKey];
  if (!theme) return [];
  if (theme.subtypes) {
    const sub = theme.subtypes[subtypeKey];
    return sub ? sub.fields : [];
  }
  return theme.fields || [];
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

function normalizeText(str) {
  return String(str || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // retire les accents
}

/* ---- Contenu HTML du popup d'un point (identique dans les 3 versions) ---- */
function popupHtml(feature, opts) {
  opts = opts || {};
  const theme = THEMES[feature.properties.theme];
  const isRef = !!feature.properties.__ref;
  const canDelete = opts.canDelete && !isRef;
  const canEdit = opts.canEdit && !isRef;
  if (!theme) {
    let btns = '';
    if (canEdit) btns += `<button class="popup-edit" type="button">Modifier</button>`;
    if (canDelete) btns += `<button class="popup-del" type="button">Supprimer</button>`;
    return `<p class="popup-title">Point</p>` + btns;
  }
  const fields = getFieldsFor(feature.properties.theme, feature.properties.subtype);
  const titleLabel = theme.subtypes
    ? (theme.subtypes[feature.properties.subtype] || {}).label || theme.label
    : theme.label;
  const titleValue = fields.length ? feature.properties[fields[0].name] : null;
  let html = `<p class="popup-title">${escapeHtml(titleValue || titleLabel)}${isRef ? ' <span style="font-weight:400;color:var(--ink-soft);">(référence)</span>' : ''}</p>`;
  fields.slice(1).forEach(f => {
    const val = feature.properties[f.name];
    if (val) html += `<p class="popup-field"><b>${escapeHtml(f.label)} :</b> ${escapeHtml(val)}</p>`;
  });
  if (canEdit || canDelete) {
    html += `<div class="popup-actions">`;
    if (canEdit) html += `<button class="popup-edit" type="button">Modifier</button>`;
    if (canDelete) html += `<button class="popup-del" type="button">Supprimer</button>`;
    html += `</div>`;
  }
  return html;
}

/* ---- Style d'un marqueur circulaire selon la thématique (ou référence) ---- */
function markerStyle(feature) {
  const isRef = !!feature.properties.__ref;
  return isRef ? {
    radius: 6, weight: 1, color: '#8a8a8a', fillColor: '#cfcac0', fillOpacity: 0.6
  } : {
    radius: 8, weight: 2, color: '#fff', fillColor: themeColor(feature.properties.theme), fillOpacity: 0.9
  };
}

/* ---- Chargement robuste de Leaflet (CSS + JS) avec CDN de secours ---- */
function loadCss(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });
}
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
async function loadFromCandidates(loader, candidates) {
  for (const url of candidates) {
    try { await loader(url); return true; } catch (e) { /* essaie la source suivante */ }
  }
  return false;
}
const LEAFLET_CSS_CANDIDATES = [
  'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css'
];
const LEAFLET_JS_CANDIDATES = [
  'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js'
];
async function loadLeaflet() {
  const cssOk = await loadFromCandidates(loadCss, LEAFLET_CSS_CANDIDATES);
  const jsOk = await loadFromCandidates(loadScript, LEAFLET_JS_CANDIDATES);
  return cssOk && jsOk && typeof window.L !== 'undefined';
}

/* ---- Fraîcheur du fichier (protocole de mise à jour manuelle) ----
   Le fichier central est timbré (`updated_at`) à chaque sauvegarde par
   geosd-admin.html. Les versions terrain affichent son âge pour rappeler
   qu'une copie récente doit être récupérée sur le dossier réseau. */
const STALE_AFTER_DAYS = 30;
function describeFileAge(updatedAtIso) {
  if (!updatedAtIso) return { text: 'Date de mise à jour inconnue (ancien fichier, sans horodatage)', level: 'unknown' };
  const updated = new Date(updatedAtIso);
  if (isNaN(updated.getTime())) return { text: 'Date de mise à jour illisible', level: 'unknown' };
  const days = Math.floor((Date.now() - updated.getTime()) / 86400000);
  const dateStr = updated.toLocaleDateString('fr-FR');
  if (days < 0) return { text: `Fichier daté du ${dateStr}`, level: 'ok' };
  if (days > STALE_AFTER_DAYS) {
    return { text: `⚠ Fichier daté du ${dateStr} — ${days} jours, à mettre à jour depuis le dossier réseau`, level: 'stale' };
  }
  return { text: `Fichier daté du ${dateStr} — ${days} jour(s)`, level: 'ok' };
}
function ignWmtsLayer(layerName, format) {
  return L.tileLayer(
    'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0' +
    '&LAYER=' + layerName + '&STYLE=normal&FORMAT=' + format +
    '&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    { maxZoom: 19, attribution: '&copy; <a href="https://www.ign.fr/">IGN</a> - Géoplateforme' }
  );
}
function addBaseLayerSwitcher(map) {
  const lyrOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
  const lyrIgnPlan = ignWmtsLayer('GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2', 'image/png');
  const lyrIgnOrtho = ignWmtsLayer('ORTHOIMAGERY.ORTHOPHOTOS', 'image/jpeg');
  lyrOSM.addTo(map);
  L.control.layers(
    { 'OpenStreetMap': lyrOSM, 'Plan IGN': lyrIgnPlan, 'Orthophoto IGN': lyrIgnOrtho },
    null,
    { position: 'topright', collapsed: false }
  ).addTo(map);
}
