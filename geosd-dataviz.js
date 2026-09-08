/* =========================================================
   GEOSD — MODULE PARTAGÉ : filtres, légende, statistiques,
   tableau de synthèse.
   =========================================================
   Utilisé par geosd-admin.html ET geosd-consultation-bureau.html.
   Décision du 07/09/2026 (voir JOURNAL_DECISIONS.md) : ces deux
   versions doivent rester strictement identiques sur tout ce qui
   concerne filtres / légende / statistiques / tableau — seule la
   gestion du fichier central (créer, ouvrir en écriture, intégrer un
   envoi terrain, modifier/supprimer un point) diffère entre elles.
   En conséquence, ce code ne doit JAMAIS être dupliqué dans les
   fichiers .html : toute évolution ici s'applique automatiquement
   aux deux versions. Si une évolution ne doit concerner qu'une seule
   des deux, c'est le signe qu'elle n'a pas sa place dans ce module.

   Ce que ce module NE couvre PAS (reste propre à chaque page hôte) :
   - ouverture/création/sauvegarde du fichier central ;
   - le formulaire de saisie/correction d'un point ;
   - l'intégration des envois terrain ;
   - le rendu des marqueurs sur la carte et leur popup (déjà partagé
     séparément via geosd-themes.js : addMarker reste dans chaque
     page hôte, mais popupHtml/themeMarkerIcon sont déjà communs).

   ---------------------------------------------------------
   Utilisation depuis une page hôte, une fois la carte initialisée :

     const dataviz = initDataviz({
       map,                          // instance Leaflet
       markersLayer,                 // L.layerGroup des marqueurs
       getGeojson: () => geojson,    // renvoie la FeatureCollection actuelle
       getMarkersById: () => markersById,
       table: {
         canEdit: true|false,        // affiche/masque "Modifier" dans le tableau
         canDelete: true|false,      // affiche/masque "Supprimer" dans le tableau
         onEdit(feature) { ... },    // requis si canEdit — ouvre le formulaire
         onDelete(id) { ... }        // requis si canDelete — peut être async
       }
     });

   À appeler par la page hôte après toute modification de `geojson`
   (chargement d'un fichier, ajout, modification, suppression) :

     dataviz.refresh();

   Le panneau de filtres "Jour de semaine / Mois" est optionnel : il
   n'apparaît que si le bloc HTML #filter-daymonth-section est présent
   dans la page hôte (absent volontairement des versions terrain
   mobiles — présent dans les 2 versions bureau, admin et
   consultation-bureau).
   ========================================================= */

function initDataviz(ctx) {
  const map = ctx.map;
  const markersLayer = ctx.markersLayer;
  const getGeojson = ctx.getGeojson;
  const getMarkersById = ctx.getMarkersById;
  const tableOpts = ctx.table || {};

  /* =========================================================
     PANNEAU DE FILTRES
     ========================================================= */
  const filtersPanel = document.getElementById('filters-panel');
  const themeCheckList = document.getElementById('theme-check-list');
  const filterSearch = document.getElementById('filter-search');
  const filterDateFrom = document.getElementById('filter-date-from');
  const filterDateTo = document.getElementById('filter-date-to');
  const filterFiabilite = document.getElementById('filter-fiabilite');
  const filterCommune = document.getElementById('filter-commune');
  const filterAgent = document.getElementById('filter-agent');
  const filtersCountEl = document.getElementById('filters-count');
  const hasDaymonth = !!document.getElementById('filter-daymonth-section');

  document.getElementById('btn-toggle-filters').addEventListener('click', () => filtersPanel.classList.toggle('show'));
  document.getElementById('btn-close-filters').addEventListener('click', () => filtersPanel.classList.remove('show'));

  /* ---- Filtre jour de semaine / mois / occurrence (bureau uniquement) ---- */
  // Valeurs alignées sur Date.getDay() : 0=dimanche … 6=samedi
  const WEEKDAYS_FR = [
    { val: 1, label: 'Lun' }, { val: 2, label: 'Mar' }, { val: 3, label: 'Mer' },
    { val: 4, label: 'Jeu' }, { val: 5, label: 'Ven' }, { val: 6, label: 'Sam' },
    { val: 0, label: 'Dim' }
  ];
  const MONTHS_FR = [
    { val: 1, label: 'Janv' }, { val: 2, label: 'Févr' }, { val: 3, label: 'Mars' },
    { val: 4, label: 'Avr' }, { val: 5, label: 'Mai' }, { val: 6, label: 'Juin' },
    { val: 7, label: 'Juil' }, { val: 8, label: 'Août' }, { val: 9, label: 'Sept' },
    { val: 10, label: 'Oct' }, { val: 11, label: 'Nov' }, { val: 12, label: 'Déc' }
  ];
  const OCC_RANKS_FR = [
    { val: 1, label: '1er' }, { val: 2, label: '2e' }, { val: 3, label: '3e' },
    { val: 4, label: '4e' }, { val: -1, label: 'Dernier' }
  ];

  function buildChipList(containerId, items, groupName) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    items.forEach(item => {
      const wrap = document.createElement('label'); wrap.className = 'filters-chip';
      const input = document.createElement('input');
      input.type = 'checkbox'; input.value = item.val; input.id = groupName + '-' + item.val;
      input.addEventListener('change', applyFilters);
      const span = document.createElement('span'); span.textContent = item.label;
      wrap.append(input, span);
      container.appendChild(wrap);
    });
  }
  if (hasDaymonth) {
    buildChipList('filter-weekday-list', WEEKDAYS_FR, 'filter-weekday');
    buildChipList('filter-month-list', MONTHS_FR, 'filter-month');
    buildChipList('filter-occ-weekday-list', WEEKDAYS_FR, 'filter-occ-weekday');
    buildChipList('filter-occ-month-list', MONTHS_FR, 'filter-occ-month');
    buildChipList('filter-occ-rank-list', OCC_RANKS_FR, 'filter-occ-rank');
  }

  function getCheckedValues(containerId) {
    return Array.from(document.querySelectorAll('#' + containerId + ' input:checked')).map(el => parseInt(el.value, 10));
  }
  function daymonthMode() {
    const el = document.querySelector('input[name="filter-daymonth-mode"]:checked');
    return el ? el.value : 'simple';
  }
  if (hasDaymonth) {
    document.querySelectorAll('input[name="filter-daymonth-mode"]').forEach(radio => {
      radio.addEventListener('change', () => {
        document.getElementById('filter-simple-block').style.display = daymonthMode() === 'simple' ? '' : 'none';
        document.getElementById('filter-occurrence-block').style.display = daymonthMode() === 'occurrence' ? '' : 'none';
        applyFilters();
      });
    });
  }
  // Rang (depuis le début / depuis la fin du mois) de l'occurrence du jour de semaine de d dans son mois
  function weekdayRankInMonth(d) {
    const day = d.getDate();
    const lastDateOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    return {
      fromStart: Math.floor((day - 1) / 7) + 1,
      fromEnd: Math.floor((lastDateOfMonth - day) / 7) + 1 // 1 = dernière occurrence du mois
    };
  }

  /* ---- Listes déroulantes Commune / Agent (filtres explicites, valeurs
     réellement présentes dans le fichier chargé — pas la liste officielle
     COMMUNES_CVL, qui contient les 1754 communes du département et serait
     inexploitable ici) ---- */
  function populateFilterSelect(select, values) {
    const previous = select.value;
    const sorted = Array.from(values).sort((a, b) => a.localeCompare(b, 'fr'));
    while (select.options.length > 1) select.remove(1);
    sorted.forEach(v => {
      const opt = document.createElement('option'); opt.value = v; opt.textContent = v;
      select.appendChild(opt);
    });
    select.value = sorted.includes(previous) ? previous : '';
  }
  function buildFilterSelectLists() {
    const geojson = getGeojson();
    const communes = new Set();
    const agents = new Set();
    geojson.features.forEach(f => {
      const commune = (f.properties.commune || '').trim();
      const agent = (f.properties.agent_sd || '').trim();
      if (commune) communes.add(commune);
      if (agent) agents.add(agent);
    });
    populateFilterSelect(filterCommune, communes);
    populateFilterSelect(filterAgent, agents);
  }

  function buildThemeCheckList() {
    const geojson = getGeojson();
    const counts = {}; THEME_KEYS.forEach(k => counts[k] = 0);
    geojson.features.forEach(f => { if (counts[f.properties.theme] !== undefined) counts[f.properties.theme]++; });
    const previousChecked = {};
    themeCheckList.querySelectorAll('input[type=checkbox]').forEach(cb => previousChecked[cb.value] = cb.checked);
    themeCheckList.innerHTML = '';
    THEME_KEYS.forEach(key => {
      const row = document.createElement('div'); row.className = 'theme-check-row';
      const swatch = document.createElement('span'); swatch.className = 'swatch'; swatch.style.background = themeColor(key);
      const cb = document.createElement('input'); cb.type = 'checkbox'; cb.value = key; cb.id = 'filter-theme-' + key;
      cb.checked = previousChecked.hasOwnProperty(key) ? previousChecked[key] : true;
      cb.addEventListener('change', applyFilters);
      const label = document.createElement('label'); label.setAttribute('for', cb.id); label.textContent = THEMES[key].label;
      const count = document.createElement('span'); count.className = 'count'; count.textContent = counts[key];
      row.append(swatch, cb, label, count);
      themeCheckList.appendChild(row);
    });
  }
  document.getElementById('btn-check-all').addEventListener('click', () => {
    themeCheckList.querySelectorAll('input[type=checkbox]').forEach(cb => cb.checked = true); applyFilters();
  });
  document.getElementById('btn-check-none').addEventListener('click', () => {
    themeCheckList.querySelectorAll('input[type=checkbox]').forEach(cb => cb.checked = false); applyFilters();
  });
  document.getElementById('btn-reset-filters').addEventListener('click', () => {
    filterSearch.value = ''; filterDateFrom.value = ''; filterDateTo.value = ''; filterFiabilite.value = '';
    filterCommune.value = ''; filterAgent.value = '';
    themeCheckList.querySelectorAll('input[type=checkbox]').forEach(cb => cb.checked = true);
    if (hasDaymonth) {
      document.getElementById('filter-mode-simple').checked = true;
      document.getElementById('filter-simple-block').style.display = '';
      document.getElementById('filter-occurrence-block').style.display = 'none';
      ['filter-weekday-list', 'filter-month-list', 'filter-occ-weekday-list', 'filter-occ-month-list', 'filter-occ-rank-list']
        .forEach(id => document.querySelectorAll('#' + id + ' input[type=checkbox]').forEach(cb => cb.checked = false));
    }
    applyFilters();
  });
  [filterSearch].forEach(el => el.addEventListener('input', applyFilters));
  [filterDateFrom, filterDateTo, filterFiabilite, filterCommune, filterAgent].forEach(el => el.addEventListener('change', applyFilters));

  function featureMatchesFilters(feature) {
    const props = feature.properties;
    const cb = document.getElementById('filter-theme-' + props.theme);
    if (cb && !cb.checked) return false;
    if (filterCommune.value && (props.commune || '') !== filterCommune.value) return false;
    if (filterAgent.value && (props.agent_sd || '') !== filterAgent.value) return false;
    const query = normalizeText(filterSearch.value.trim());
    if (query && !normalizeText(Object.values(props).join(' ')).includes(query)) return false;
    if (props.date) {
      if (filterDateFrom.value && props.date < filterDateFrom.value) return false;
      if (filterDateTo.value && props.date > filterDateTo.value) return false;
    } else if (filterDateFrom.value || filterDateTo.value) return false;
    if (filterFiabilite.value) {
      const min = parseInt(filterFiabilite.value, 10);
      const val = parseInt(props.fiabilite, 10);
      if (isNaN(val) || val < min) return false;
    }
    if (hasDaymonth) {
      if (daymonthMode() === 'simple') {
        const days = getCheckedValues('filter-weekday-list');
        const months = getCheckedValues('filter-month-list');
        if (days.length || months.length) {
          if (!props.date) return false;
          const d = new Date(props.date + 'T00:00:00');
          if (days.length && !days.includes(d.getDay())) return false;
          if (months.length && !months.includes(d.getMonth() + 1)) return false;
        }
      } else {
        const days = getCheckedValues('filter-occ-weekday-list');
        const months = getCheckedValues('filter-occ-month-list');
        const ranks = getCheckedValues('filter-occ-rank-list');
        if (days.length || months.length || ranks.length) {
          if (!props.date) return false;
          const d = new Date(props.date + 'T00:00:00');
          if (days.length && !days.includes(d.getDay())) return false;
          if (months.length && !months.includes(d.getMonth() + 1)) return false;
          if (ranks.length) {
            const rank = weekdayRankInMonth(d);
            if (!ranks.some(r => r === -1 ? rank.fromEnd === 1 : rank.fromStart === r)) return false;
          }
        }
      }
    }
    return true;
  }
  function applyFilters() {
    const geojson = getGeojson();
    const markersById = getMarkersById();
    let shown = 0;
    geojson.features.forEach(feature => {
      const marker = markersById[feature.id];
      if (!marker) return;
      const match = featureMatchesFilters(feature);
      const onMap = markersLayer.hasLayer(marker);
      if (match && !onMap) markersLayer.addLayer(marker);
      if (!match && onMap) markersLayer.removeLayer(marker);
      if (match) shown++;
    });
    filtersCountEl.textContent = `${shown} / ${geojson.features.length} points affichés`;
  }

  /* =========================================================
     STATISTIQUES : nombre de points par thématique et par mois.
     Toujours calculé sur l'ensemble du fichier (pas les filtres actifs).
     Pas de bibliothèque de graphique externe — un simple histogramme SVG
     généré à la main, pour rester léger et sans dépendance réseau.
     ========================================================= */
  const statsOverlay = document.getElementById('stats-overlay');

  function computeStats() {
    const geojson = getGeojson();
    const counts = {}; // counts[themeKey][yyyy-mm] = n
    THEME_KEYS.forEach(k => counts[k] = {});
    const monthsSet = new Set();
    geojson.features.forEach(f => {
      if (f.properties.__ref) return;
      const themeKey = f.properties.theme;
      if (!counts[themeKey]) counts[themeKey] = {}; // thématique retirée du modèle depuis, on l'affiche quand même
      const ym = (f.properties.date && /^\d{4}-\d{2}/.test(f.properties.date)) ? f.properties.date.slice(0, 7) : 'Sans date';
      monthsSet.add(ym);
      counts[themeKey][ym] = (counts[themeKey][ym] || 0) + 1;
    });
    const months = Array.from(monthsSet).filter(m => m !== 'Sans date').sort();
    if (monthsSet.has('Sans date')) months.push('Sans date');
    return { counts, months };
  }

  function renderStatsChart(counts, months) {
    const container = document.getElementById('stats-chart');
    if (!months.length) { container.innerHTML = '<p class="coords">Aucun point à afficher.</p>'; return; }

    const barWidth = 28, gap = 16, marginLeft = 34, marginBottom = 56, marginTop = 16;
    const chartHeight = 200;
    const width = marginLeft + months.length * (barWidth + gap) + 10;
    const height = marginTop + chartHeight + marginBottom;

    const monthTotals = months.map(m => THEME_KEYS.reduce((s, k) => s + (counts[k]?.[m] || 0), 0));
    const maxTotal = Math.max(1, ...monthTotals);

    let bars = '';
    months.forEach((m, i) => {
      const x = marginLeft + i * (barWidth + gap);
      let yCursor = marginTop + chartHeight;
      THEME_KEYS.forEach(themeKey => {
        const val = counts[themeKey]?.[m] || 0;
        if (!val) return;
        const barH = (val / maxTotal) * chartHeight;
        yCursor -= barH;
        const label = (THEMES[themeKey] ? THEMES[themeKey].label : themeKey) + ' — ' + m + ' : ' + val;
        bars += `<rect x="${x}" y="${yCursor.toFixed(1)}" width="${barWidth}" height="${barH.toFixed(1)}" fill="${themeColor(themeKey)}"><title>${escapeHtml(label)}</title></rect>`;
      });
      const labelX = (x + barWidth / 2).toFixed(1);
      const labelY = marginTop + chartHeight + 14;
      bars += `<text x="${labelX}" y="${labelY}" font-size="10" text-anchor="end" transform="rotate(-40 ${labelX} ${labelY})" fill="var(--ink-soft)">${escapeHtml(m)}</text>`;
      const totalY = marginTop + chartHeight - (monthTotals[i] / maxTotal) * chartHeight - 4;
      bars += `<text x="${labelX}" y="${totalY.toFixed(1)}" font-size="10" text-anchor="middle" fill="var(--ink)">${monthTotals[i]}</text>`;
    });

    const axis = `<line x1="${marginLeft}" y1="${marginTop}" x2="${marginLeft}" y2="${marginTop + chartHeight}" stroke="var(--line)"/>` +
      `<line x1="${marginLeft}" y1="${marginTop + chartHeight}" x2="${width - 10}" y2="${marginTop + chartHeight}" stroke="var(--line)"/>`;

    container.innerHTML = `<svg viewBox="0 0 ${width} ${height}" style="width:100%; height:auto; max-height:280px; font-family:var(--sans);">${axis}${bars}</svg>`;
  }

  function renderStatsLegend() {
    const legend = document.getElementById('stats-legend');
    legend.innerHTML = '';
    THEME_KEYS.forEach(key => {
      const item = document.createElement('span');
      item.className = 'legend-item';
      const swatch = document.createElement('span');
      swatch.className = 'swatch';
      swatch.style.background = themeColor(key);
      item.appendChild(swatch);
      item.append((THEMES[key] ? THEMES[key].label : key));
      legend.appendChild(item);
    });
  }

  function renderStatsTable(counts, months) {
    const table = document.getElementById('stats-table');
    const themeKeysWithData = THEME_KEYS.filter(k => counts[k] && Object.keys(counts[k]).length);
    let thead = '<thead><tr><th>Thématique</th>' + months.map(m => `<th>${escapeHtml(m)}</th>`).join('') + '<th class="stats-total-col">Total</th></tr></thead>';
    let tbody = '<tbody>';
    const colTotals = months.map(() => 0);
    let grandTotal = 0;
    themeKeysWithData.forEach(key => {
      let rowTotal = 0;
      const cells = months.map((m, i) => {
        const val = counts[key][m] || 0;
        rowTotal += val;
        colTotals[i] += val;
        return `<td>${val || ''}</td>`;
      }).join('');
      grandTotal += rowTotal;
      tbody += `<tr><td>${escapeHtml(THEMES[key] ? THEMES[key].label : key)}</td>${cells}<td class="stats-total-col">${rowTotal}</td></tr>`;
    });
    tbody += `<tr class="stats-total-row"><td>Total</td>${colTotals.map(t => `<td>${t}</td>`).join('')}<td class="stats-total-col">${grandTotal}</td></tr>`;
    tbody += '</tbody>';
    table.innerHTML = thead + tbody;
  }

  let lastStats = null;
  function openStats() {
    lastStats = computeStats();
    renderStatsChart(lastStats.counts, lastStats.months);
    renderStatsLegend();
    renderStatsTable(lastStats.counts, lastStats.months);
    statsOverlay.classList.add('show');
  }
  document.getElementById('btn-stats').addEventListener('click', openStats);
  document.getElementById('btn-stats-close').addEventListener('click', () => statsOverlay.classList.remove('show'));
  statsOverlay.addEventListener('click', e => { if (e.target === statsOverlay) statsOverlay.classList.remove('show'); });

  document.getElementById('btn-stats-export').addEventListener('click', () => {
    if (!lastStats) return;
    const { counts, months } = lastStats;
    const themeKeysWithData = THEME_KEYS.filter(k => counts[k] && Object.keys(counts[k]).length);
    const rows = [['Thématique', ...months, 'Total']];
    const colTotals = months.map(() => 0);
    let grandTotal = 0;
    themeKeysWithData.forEach(key => {
      let rowTotal = 0;
      const cells = months.map((m, i) => { const v = counts[key][m] || 0; rowTotal += v; colTotals[i] += v; return v; });
      grandTotal += rowTotal;
      rows.push([THEMES[key] ? THEMES[key].label : key, ...cells, rowTotal]);
    });
    rows.push(['Total', ...colTotals, grandTotal]);
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'geosd_statistiques.csv';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  });

  /* =========================================================
     TABLEAU DE DONNÉES : toutes les valeurs de tous les points,
     avec colonnes communes (déduites automatiquement — les champs
     présents dans toutes les thématiques) + une colonne "Détails
     spécifiques" pour le reste. Respecte les filtres actifs.
     Colonne "Actions" : "Localiser" toujours présent ; "Modifier" et
     "Supprimer" seulement si autorisés par la page hôte (ctx.table).
     ========================================================= */
  const tableOverlay = document.getElementById('table-overlay');
  const tableSortSelect = document.getElementById('table-sort');

  function getCommonFieldNames() {
    // Champs communs à toutes les thématiques : définis une seule fois dans
    // le CSV (theme_key="commun") et ajoutés à chaque formulaire par
    // getFieldsFor() — plus besoin de les déduire par intersection.
    return COMMON_FIELDS.map(f => f.name);
  }
  function getFieldLabel(name) {
    const common = COMMON_FIELDS.find(f => f.name === name);
    if (common) return common.label;
    for (const key of THEME_KEYS) {
      const theme = THEMES[key];
      const fieldLists = theme.subtypes ? Object.values(theme.subtypes).map(s => s.fields) : [theme.fields || []];
      for (const fields of fieldLists) {
        const found = fields.find(f => f.name === name);
        if (found) return found.label;
      }
    }
    return name;
  }
  function specificDetailsText(feature, commonNames) {
    const fields = getFieldsFor(feature.properties.theme, feature.properties.subtype);
    return fields.filter(f => !commonNames.includes(f.name))
      .map(f => feature.properties[f.name] ? `${f.label} : ${feature.properties[f.name]}` : null)
      .filter(Boolean).join(' · ');
  }

  function tableRows() {
    const geojson = getGeojson();
    const commonNames = getCommonFieldNames();
    let rows = geojson.features.filter(f => !f.properties.__ref && featureMatchesFilters(f));
    const sortVal = tableSortSelect.value;
    rows = rows.slice().sort((a, b) => {
      if (sortVal === 'date-desc') return (b.properties.date || '').localeCompare(a.properties.date || '');
      if (sortVal === 'date-asc') return (a.properties.date || '').localeCompare(b.properties.date || '');
      if (sortVal === 'theme') return (THEMES[a.properties.theme]?.label || '').localeCompare(THEMES[b.properties.theme]?.label || '');
      if (sortVal === 'commune') return (a.properties.commune || '').localeCompare(b.properties.commune || '');
      return 0;
    });
    return { rows, commonNames };
  }

  function renderTable() {
    const geojson = getGeojson();
    const { rows, commonNames } = tableRows();
    const table = document.getElementById('data-table');
    const headers = ['Thématique', 'Sous-type', ...commonNames.map(getFieldLabel), 'Détails spécifiques', 'Latitude', 'Longitude', 'Actions'];
    let html = '<thead><tr>' + headers.map(h => `<th>${escapeHtml(h)}</th>`).join('') + '</tr></thead><tbody>';
    rows.forEach(f => {
      const theme = THEMES[f.properties.theme];
      const themeLabel = theme ? theme.label : f.properties.theme;
      const subtypeLabel = theme && theme.subtypes ? (theme.subtypes[f.properties.subtype] || {}).label || '' : '';
      const commonCells = commonNames.map(n => `<td>${escapeHtml(f.properties[n] || '')}</td>`).join('');
      const [lng, lat] = f.geometry.coordinates;
      let actionsHtml = `<button type="button" class="row-locate" data-id="${f.id}">Localiser</button>`;
      if (tableOpts.canEdit) actionsHtml += `<button type="button" class="row-edit" data-id="${f.id}">Modifier</button>`;
      if (tableOpts.canDelete) actionsHtml += `<button type="button" class="row-del" data-id="${f.id}">Supprimer</button>`;
      html += `<tr>` +
        `<td>${escapeHtml(themeLabel)}</td><td>${escapeHtml(subtypeLabel)}</td>${commonCells}` +
        `<td>${escapeHtml(specificDetailsText(f, commonNames))}</td>` +
        `<td class="num-col">${lat.toFixed(5)}</td><td class="num-col">${lng.toFixed(5)}</td>` +
        `<td><div class="row-actions">${actionsHtml}</div></td></tr>`;
    });
    html += '</tbody>';
    table.innerHTML = html;

    const totalCount = geojson.features.filter(f => !f.properties.__ref).length;
    document.getElementById('table-count').textContent =
      rows.length + ' point(s) affiché(s)' + (rows.length !== totalCount ? ` sur ${totalCount} (filtres actifs)` : '');

    table.querySelectorAll('.row-locate').forEach(btn => btn.onclick = () => {
      const feature = getGeojson().features.find(f => f.id === btn.dataset.id);
      if (!feature) return;
      const [lng, lat] = feature.geometry.coordinates;
      tableOverlay.classList.remove('show');
      map.setView([lat, lng], Math.max(map.getZoom(), 16));
      const marker = getMarkersById()[feature.id];
      if (marker) marker.openPopup();
    });
    if (tableOpts.canEdit) {
      table.querySelectorAll('.row-edit').forEach(btn => btn.onclick = () => {
        const feature = getGeojson().features.find(f => f.id === btn.dataset.id);
        if (!feature) return;
        tableOverlay.classList.remove('show');
        tableOpts.onEdit(feature);
      });
    }
    if (tableOpts.canDelete) {
      table.querySelectorAll('.row-del').forEach(btn => btn.onclick = async () => {
        await tableOpts.onDelete(btn.dataset.id);
        refresh();
        renderTable();
      });
    }
  }

  document.getElementById('btn-table').addEventListener('click', () => { renderTable(); tableOverlay.classList.add('show'); });
  document.getElementById('btn-table-close').addEventListener('click', () => tableOverlay.classList.remove('show'));
  tableOverlay.addEventListener('click', e => { if (e.target === tableOverlay) tableOverlay.classList.remove('show'); });
  tableSortSelect.addEventListener('change', renderTable);

  document.getElementById('btn-table-export').addEventListener('click', () => {
    const { rows, commonNames } = tableRows();
    const header = ['Thématique', 'Sous-type', ...commonNames.map(getFieldLabel), 'Détails spécifiques', 'Latitude', 'Longitude'];
    const csvRows = [header];
    rows.forEach(f => {
      const theme = THEMES[f.properties.theme];
      const themeLabel = theme ? theme.label : f.properties.theme;
      const subtypeLabel = theme && theme.subtypes ? (theme.subtypes[f.properties.subtype] || {}).label || '' : '';
      const commonVals = commonNames.map(n => f.properties[n] || '');
      const [lng, lat] = f.geometry.coordinates;
      csvRows.push([themeLabel, subtypeLabel, ...commonVals, specificDetailsText(f, commonNames), lat, lng]);
    });
    const csv = csvRows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'geosd_points.csv';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  });

  /* ---- API publique ---- */
  function refresh() {
    buildThemeCheckList();
    buildFilterSelectLists();
    applyFilters();
  }

  return { refresh, applyFilters, buildThemeCheckList, featureMatchesFilters, openStats };
}
