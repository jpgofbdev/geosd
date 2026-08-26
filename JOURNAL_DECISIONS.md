# Journal des décisions — GeoSD

Ce document capture le **pourquoi** des choix non-évidents faits sur ce
projet. Le README explique l'architecture ; ce fichier explique les
arbitrages qui ont mené à cette architecture — pour éviter de revenir en
arrière par erreur, ou de refaire les mêmes hésitations.

## Architecture générale

- **Aucun serveur, par choix assumé.** Le secteur public implique une
  contractualisation lourde (marché de service, hébergement agréé,
  maintenance pluriannuelle) même pour un besoin technique modeste.
  L'écriture de fichier via la File System Access API (Chrome/Edge/Opera)
  a été retenue précisément parce qu'elle évite ce circuit — malgré ses
  limites (pas de Firefox/Safari, pas de mobile natif).

- **3 versions séparées plutôt qu'un seul fichier avec bascule de mode.**
  Un premier prototype unique (`carte-points.html`) changeait de
  comportement selon le navigateur détecté. Décision de scinder en 3
  fichiers autonomes (`geosd-admin`, `geosd-terrain-saisie`,
  `geosd-terrain-consultation`) pour plus de clarté d'usage — chaque
  version a un rôle exclusif, pas de logique conditionnelle cachée.

- **CSV + script Python comme source de vérité du modèle de champs**,
  plutôt qu'édition manuelle du JS. Choisi dès que l'évolutivité du modèle
  (8 thématiques, ajouts prévus) a été confirmée comme un besoin durable,
  pas ponctuel.

## Décisions spécifiques à chaque version

- **`geosd-admin.html` : Chrome/Edge/Opera desktop uniquement, assumé.**
  Aucune tentative de compatibilité mobile pour cette version — l'écriture
  de fichier n'est pas fiable sur Android (voir plus bas) et absente sur
  iOS.

- **Mode terrain forcé sur Android, même quand l'API semble disponible.**
  `showSaveFilePicker`/`showOpenFilePicker` existent parfois sur Chrome
  Android mais échouent à l'usage ("permission d'écriture refusée",
  confirmé par test réel sur tablette). La détection se fait donc aussi
  par user-agent Android, pas uniquement par présence de la fonction.

- **Envoi terrain par point (mail + partage natif) — décision initiale
  revenue en arrière.** Choix d'origine : mail ET partage natif au choix de
  l'agent, pour transmettre chaque point immédiatement après saisie.
  Abandonné après usage : le partage natif (`navigator.share`) s'est révélé
  peu fiable en pratique (dépend fortement des applications installées), et
  le mail par point n'a jamais permis de joindre le fichier — `mailto` ne
  supporte aucune pièce jointe, c'est une limite du protocole, pas un bug
  contournable. Plutôt que de garder un mécanisme à moitié fonctionnel,
  simplification nette : un seul geste de sortie des données, **"Exporter
  tout"** en fin de tournée, laissant l'agent joindre le fichier lui-même
  depuis son application mail habituelle. Plus simple à expliquer, moins de
  code à maintenir, aucune perte réelle de fonctionnalité (l'agent gardait
  de toute façon "Exporter tout" en filet de sécurité dès le départ).

- **Export groupé conservé comme unique méthode de sortie** — devenu le
  seul mécanisme après le retrait ci-dessus, plutôt qu'un simple filet de
  secours parmi d'autres.

## Gestion du stockage local terrain (purge)

- **Aucune purge automatique, sous aucun prétexte.** Envisagé et écarté :
  vider automatiquement après export, ou après clic sur "Exporter tout".
  Rejeté parce qu'aucun de ces mécanismes ne confirme une réception réelle
  par l'administrateur (un `mailto` ouvre un brouillon, ça ne garantit pas
  l'envoi ni la lecture). Un automatisme basé sur une action non confirmée
  aurait pu effacer des points jamais réellement intégrés — le pire risque
  identifié sur ce projet à ce stade.
- **Purge manuelle avec confirmation écrite** (taper un mot, pas un simple
  bouton OK/Annuler) plutôt qu'une confirmation faible façon
  `window.confirm()` — cohérent avec la gravité de l'action (irréversible),
  tout en restant un geste volontaire de l'agent, jamais initié par le
  système. Mot de confirmation raccourci de "SUPPRIMER" à **"SUP"**
  (24/08/2026), sur retour terrain : trop long à taper sur clavier tactile
  (gants, extérieur). Plusieurs alternatives envisagées (taper le nombre de
  points affiché, presser-maintenir, case à cocher) — "SUP" retenu par
  préférence directe, gardant le principe d'une saisie explicite plutôt
  qu'un geste passif.
- **Pas de risque de doublon identifié même sans purge régulière** : la
  fusion côté admin (par identifiant) rend l'absence de purge sans
  incidence sur l'intégrité des données — seulement un coût de stockage/
  confort, jamais un risque de corruption. Ça a permis de ne pas céder à la
  tentation d'un automatisme "pratique" mais risqué.
- **Périodicité suggérée dans la documentation, pas imposée dans le code**
  (ex. hebdomadaire) — cohérent avec le reste du projet : aucune règle
  métier rigide imposée à l'utilisateur, seulement des repères.

## Dépôt de référence (consultation terrain)

- **Rejet de l'hébergement distant avec authentification.** Piste explorée
  (lien secret + mot de passe unique + compte nominatif) puis abandonnée :
  les agents sont responsables du contenu de leur matériel professionnel,
  donc aucun mécanisme d'accès distant n'est nécessaire. Un DPO peu
  technique mais qui assume les conséquences a aussi pesé dans ce choix —
  mieux vaut un protocole simple et compréhensible qu'un mécanisme
  sophistiqué mais difficile à faire valider.
- **Protocole retenu : copie manuelle depuis le dossier réseau**, avec un
  **indicateur de fraîcheur automatique** (`updated_at` horodaté à chaque
  sauvegarde admin, alerte au-delà de 30 jours) comme garde-fou.
- Le mécanisme d'URL de dépôt distant (`DEPOT_URL`) reste dans le code,
  désactivé, au cas où ce protocole s'avère insuffisant à l'usage — mais
  ce n'est plus la voie recommandée.

## Choix d'ergonomie assumés

- **Suppression sans confirmation** (clic direct) — rapidité privilégiée,
  choix explicite plutôt qu'un oubli.
- **Position d'un point non modifiable en édition** — pour déplacer un
  point mal placé, le supprimer et le ressaisir. Évite tout risque de
  déplacement accidentel via un glisser-déposer.
- **Export CSV, pas de vrai `.xlsx`** — pour ne pas ajouter de dépendance
  CDN externe supplémentaire (SheetJS). Le CSV s'ouvre nativement dans
  Excel avec les accents corrects (BOM UTF-8). Réévaluer seulement si un
  vrai besoin de mise en forme/feuilles multiples apparaît.
- **Statistiques toujours sur l'ensemble du fichier** (ignore les filtres
  actifs) — vue d'ensemble complète assumée. Le tableau de données, lui,
  **respecte les filtres** — les deux usages sont volontairement
  différents.
- **Pas de bibliothèque de graphique externe** — histogramme en SVG fait
  à la main, pour éviter un nouveau risque de dépendance CDN (leçon tirée
  des soucis de chargement de Leaflet en cours de projet).
- **Saisie prédictive du champ "commune" (terrain-saisie) : menu fait
  main en JS, pas `<datalist>` HTML natif.** Première tentative avec
  `<datalist>` (voir décision suivante pour l'intégration des données) :
  invisible en pratique dans Chrome, car le popup natif de suggestions est
  cadré par le premier ancêtre `overflow` non-`visible` — ici `.modal`
  (`overflow:auto`, nécessaire pour les formulaires longs). Bug connu de
  Chromium sans contournement CSS simple. Remplacé par un petit menu
  déroulant positionné en HTML/CSS normal (`position:absolute` dans le
  conteneur du champ, donc jamais clippé), filtrage sur `COMMUNES_CVL` via
  `normalizeText` (déjà utilisé ailleurs pour la recherche/filtre), sans
  dépendance externe. Champ toujours **texte libre** : le menu propose, il
  ne contraint pas.
- **Liste des communes (Centre-Val de Loire, `commune_majusucle_CVL.csv`)
  intégrée au même bloc généré que `THEMES` dans `geosd-themes.js`**
  (`generate_themes.py` étendu), pour rester utilisable hors-ligne et
  cohérent avec le principe "un seul fichier CSV = source de vérité".
  Affichage volontairement en MAJUSCULES (cohérence avec le CSV source /
  exports existants).

- **Géolocalisation "Ma position" (terrain-saisie) : `navigator.geolocation`
  natif**, un seul relevé par clic (`getCurrentPosition`, pas de suivi
  continu `watchPosition`) — plus économique en batterie sur une tournée
  longue, l'agent reclique pour rafraîchir. Bouton de contrôle Leaflet
  custom (topleft, style `leaflet-bar` natif). Sur échec/refus (poste fixe
  sans GPS, politique DSI bloquant la permission, navigateur incompatible)
  → message d'erreur clair via `setStatus(..., 'err')`, rien ne casse
  ailleurs dans l'appli. Raccourci **"Ajouter un point ici"** dans la
  popup de position explicitement facultatif : le clic normal sur la carte
  pour créer un point reste inchangé, disponible en toutes circonstances.

- **Filtre "Jour de semaine / Mois" (24/08/2026) : ajouté uniquement sur
  `geosd-admin.html`**, pas sur `geosd-terrain-consultation.html` (besoin
  exprimé limité à l'admin) ni sur `geosd-terrain-saisie.html` (pas de
  panneau de filtres sur cette version). Deux modes exclusifs (radio, un
  seul actif à la fois) :
  - **Simple** — jours de la semaine et mois multi-sélectionnables
    (puces), combinés en ET entre les deux catégories, en OU à l'intérieur
    d'une même catégorie ; catégorie vide = ignorée.
  - **Occurrence** — mêmes puces jours/mois + une troisième liste
    (1er/2e/3e/4e/Dernier) pour cibler des occurrences précises dans le
    mois (ex. "le 1er lundi d'octobre", "les 2 premiers dimanches de
    novembre", "le dernier vendredi du mois, tous mois confondus").
  Aucune notion d'année propre à ce filtre : il s'ajoute en ET au filtre
  de période existant (date début/fin), qui reste l'unique moyen de borner
  à une plage d'années — comportement volontaire pour rester simple, sans
  dupliquer un sélecteur d'année. Implémentation en JS pur (calcul du rang
  d'occurrence via `Date`), aucune dépendance externe ajoutée.

- **Bandeau jaune d'info remplacé par une popup accessible via un bouton
  « i » (24/08/2026), sur `geosd-terrain-saisie.html` et
  `geosd-terrain-consultation.html`.** Le bandeau fixe occupait une part
  disproportionnée de l'écran sur mobile (retour d'usage direct, capture
  d'écran à l'appui — Samsung Galaxy S8+). Contenu inchangé, simplement
  déplacé dans une modale (`.overlay`/`.modal`, réutilise les classes déjà
  utilisées pour la saisie de point et le fond hors-ligne — aucun nouveau
  style de modale). Le bandeau de fraîcheur du fichier
  (`#freshness-banner`, consultation uniquement) reste, lui, affiché en
  permanence dans l'en-tête : c'est une alerte active et conditionnelle
  (âge du fichier chargé), pas une information statique, elle doit rester
  visible sans action de l'agent.
- **Bouton « ? » ajouté à côté, ouvrant un mode d'emploi propre à chaque
  page** (même mécanisme de popup). Contenu rédigé spécifiquement pour
  chacune des deux versions terrain à partir du fonctionnement réel actuel
  du bouton et non repris du mode d'emploi générique d'`index.html`, qui
  décrit un workflow antérieur (envoi immédiat par mail/partage) retiré
  depuis — voir décision "Envoi terrain par point" plus haut.
  `index.html` n'a volontairement pas été corrigé à cette occasion (hors
  périmètre de cette demande) ; à revoir séparément.

## Incidents résolus (pour ne pas les reproduire)

- **`window.MA_CONST` renvoie `undefined` alors que `MA_CONST` fonctionne**
  → une déclaration `const`/`let` au niveau global d'un `<script>` (ex.
  `THEMES`, `COMMUNES_CVL` dans `geosd-themes.js`) n'est **pas** attachée à
  `window`, contrairement à `var` ou à une fonction déclarée globalement.
  Piège rencontré deux fois de suite lors de l'ajout de la saisie
  prédictive "commune" : (1) diagnostic — `window.COMMUNES_CVL.length` en
  console échouait alors que la donnée était bien chargée (`COMMUNES_CVL`
  tout court fonctionnait) ; (2) bug réel dans le code applicatif —
  `attachCommuneAutocomplete` filtrait sur `(window.COMMUNES_CVL || [])`,
  qui valait donc toujours `[]`, d'où un menu de suggestions présent dans
  le DOM mais toujours vide. Corrigé en référençant `COMMUNES_CVL`
  directement (sans `window.`). **Réflexe à garder** : toujours tester
  une variable globale déclarée en `const`/`let` par son nom nu en
  console, jamais via `window.`.
- Chargement Leaflet échouant selon le contexte de test → CDN de secours
  en cascade (jsDelivr → unpkg → cdnjs) + message d'erreur explicite
  distinguant "pas de réseau" de "ouvert dans un aperçu sandboxé".
- `showSaveFilePicker` échouant dans une iframe (aperçu intégré) → erreur
  normale et attendue, pas un bug : le fichier doit être ouvert en onglet
  direct (double-clic), jamais dans un aperçu.
- Fichiers manquants après téléchargement groupé (restés dans un
  `files.zip` non extrait) → rappel systématique de vérifier qu'aucun
  fichier n'est resté compressé avant de tester.
- `Not allowed to request permissions in this context` en ouvrant
  `geosd-admin.html` depuis un chemin réseau UNC direct
  (`file://serveur/partage/...`) → Chrome traite ce type de chemin
  différemment d'un disque local pour la File System Access API. Solution :
  mapper le dossier réseau en lettre de lecteur (`Z:`) et ouvrir depuis là,
  ou héberger la page en HTTPS (le sélecteur de fichier reste libre de
  parcourir n'importe quel lecteur local/réseau mappé quelle que soit
  l'origine de la page — d'où l'intérêt d'héberger aussi `geosd-admin.html`
  via GitHub Pages, pas seulement les 2 versions terrain).
- Accents mal affichés dans `modele-formulaires.csv` ouvert depuis Excel →
  fichier en UTF-8 sans BOM ; Excel Windows suppose l'encodage régional par
  défaut en l'absence de BOM. Solution : ajouter le BOM UTF-8 en tête de
  fichier (invisible, sans effet sur `generate_themes.py` qui gère déjà les
  deux cas via `encoding="utf-8-sig"`) ; en cas de réenregistrement depuis
  Excel, bien choisir "CSV UTF-8" et non "CSV" simple.
- `ReferenceError: initTerritory is not defined` sur GitHub Pages après
  ajout du sélecteur de territoire → un seul fichier interdépendant
  (`geosd-themes.js`) était resté en version périmée sur le dépôt distant
  pendant que d'autres avaient été mis à jour. Leçon retenue : toujours
  resynchroniser l'ensemble des fichiers en un seul geste sur GitHub, pas
  fichier par fichier au fil des demandes — le badge "Your site is
  published" de GitHub n'est pas non plus une confirmation fiable à 100%
  du déploiement effectif (préférer l'onglet Actions du dépôt).

## Charte graphique et séparation des fichiers CSS

- **`geosd-tokens.css` séparé de `geosd-common.css`, plutôt qu'un seul
  fichier de style.** Demande initiale : rapprocher la charte de
  l'identité OFB. Plutôt que de dupliquer les couleurs dans
  `geosd-common.css` (3 apps) et dans le bloc `<style>` autonome de
  `index.html`, extraction des seules variables couleurs/polices dans un
  fichier dédié, importé par les deux (`@import` pour le CSS,
  `<link>` pour le HTML). Objectif explicite : un futur changement de
  charte (ex. codes hex exacts obtenus auprès de l'OFB) ne demande plus
  qu'une modification, dans un seul fichier, au lieu de deux à trois
  endroits à synchroniser manuellement.
- **Palette OFB approximative, pas officielle.** Aucune charte graphique
  OFB publiée en accès public trouvée au moment du réglage — palette verte
  institutionnelle construite par approximation visuelle (vert profond
  `#00694d`), documentée comme telle dans le fichier lui-même. À remplacer
  si les codes exacts sont obtenus en interne.
- **Typographie IBM Plex conservée**, pas de bascule vers "Marianne" (police
  officielle de l'État) : gain visuel jugé marginal face au coût d'une
  nouvelle dépendance CDN à gérer (avec son propre risque de chargement,
  comme déjà vécu avec Leaflet).
- **Bandeau "RÉPUBLIQUE FRANÇAISE" des sites .gouv.fr volontairement pas
  ajouté.** GeoSD est un prototype interne non validé institutionnellement
  à ce stade — l'ajouter aurait pu laisser croire à un service officiel
  déjà validé, source de confusion vis-à-vis de la DSI ou de la
  hiérarchie. Point cohérent avec le point de vigilance déjà noté dans la
  section stratégique ci-dessous.
- **Changement de couleur volontairement discret**, pas une refonte
  visuelle — vert institutionnel proche de l'ancien vert "carte
  topographique" du projet. Ne pas s'étonner si la différence est peu
  visible à l'œil nu ; c'était l'intention (sobriété), pas un défaut
  d'application du changement.

## Sélecteur de territoire (déploiement multi-services)

- **Contexte du choix :** GeoSD a d'abord été pensé comme une instance =
  un service. Le vrai plan est différent : **une seule instance
  (hébergée sur GitHub Pages) utilisée par les 6 services départementaux**
  de la région Centre-Val de Loire, chacun avec ses propres fichiers de
  données mais la même application.
- **Menu déroulant retenu, carte cliquable écartée.** Pour 6 territoires
  (et probablement pas beaucoup plus), un menu déroulant nommé suffit très
  largement et ne demande aucune donnée supplémentaire à maintenir. Une
  carte cliquable aurait nécessité d'embarquer de vrais contours
  administratifs (fichier de frontières) — complexité et poids inutiles
  pour ce cas d'usage.
- **Réglage centralisé dans `geosd-themes.js`** (objet `TERRITOIRES`),
  pas dupliqué dans les 3 apps — ajouter un 7ᵉ service = une ligne, dans
  un seul fichier.
- **Choix mémorisé par appareil** (`localStorage`), pas par compte
  utilisateur — cohérent avec le reste du projet (aucune notion de
  compte). Un bouton dans l'en-tête permet de le changer si un poste
  change de main ou en cas d'erreur de sélection initiale.
- **`fitBounds()` plutôt qu'un centre + zoom fixe** par territoire — la
  vue s'adapte automatiquement à la forme/taille de chaque département,
  pas de zoom à calculer à la main pour chacun.
- Emprises des 6 départements actuellement **approximatives** (faites de
  mémoire par l'assistant, pas des contours officiels) — à vérifier
  visuellement avant un vrai déploiement.

## Contexte organisationnel et stratégique

- **Origine du projet :** demande formulée suite à une insatisfaction vis-
  à-vis de QGIS (trop complexe à maîtriser pour de la simple saisie
  terrain) et de QField (solution mobile existante, mais déploiement jugé
  trop lourd/contraignant). GeoSD répond spécifiquement à ce manque : une
  saisie terrain accessible sans formation lourde, sans déploiement
  applicatif complexe.
- **Portage institutionnel :** projet porté depuis la DR (Direction
  Régionale) Centre-Val de Loire, à destination des 6 SD (services
  départementaux) de la région — d'où le sélecteur de territoire
  multi-services plutôt qu'un déploiement isolé par service.
- **Stratégie de déploiement recommandée (par l'assistant, à valider) :**
  ne pas demander un déploiement large d'emblée, mais un **pilote sur 1-2
  départements volontaires** sur 2-3 mois avant généralisation — plus
  simple à obtenir l'accord d'un chef de service, et donne de vrais
  retours terrain avant le déploiement à 6.
- **Point de vigilance identifié :** le projet a été construit hors du
  circuit informatique classique (pas de marché, pas de validation DSI
  formelle) — c'est un atout (rapidité) mais un point à anticiper dans
  toute présentation à la hiérarchie, pour éviter que ça soit perçu comme
  un contournement plutôt qu'un prototypage volontairement léger. Argument
  clé à mettre en avant si la question survient : le format de données
  (GeoJSON standard) n'enferme rien — réversible à tout moment vers QGIS.
- **Présentation au chef des services départementaux prévue** (délai
  d'environ 25 jours donné au moment de la préparation). Cinq arguments
  synthétiques préparés pour cette présentation, à réutiliser tels quels :
  1. Zéro serveur, zéro marché à passer.
  2. Zéro formation nécessaire pour un agent de terrain.
  3. Un seul fichier CSV pilote tout le modèle de champs, pas de code à
     toucher pour le faire évoluer.
  4. Aucun verrouillage : format GeoJSON standard, réversible vers QGIS à
     tout moment.
  5. Une seule instance sert les 6 départements, coût marginal nul pour
     ajouter un 7ᵉ service.
  Recommandation transmise : ne pas demander l'adoption des 6 départements
  d'un coup, mais un **pilote sur 1-2 départements volontaires** sur 2-3
  mois, avec démonstration en direct plutôt qu'en captures d'écran.

## Continuité et documentation

- **Ce fichier + le README sont la vraie source de continuité du projet**,
  pas la mémoire de l'assistant — une conversation, même longue, n'est pas
  un substitut fiable à une documentation à jour. Réflexe à conserver :
  regénérer/mettre à jour ces deux fichiers après toute évolution notable,
  et les reverser dans la base de connaissances du Project Claude associé.
- **`README.html`** existe comme version de lecture autonome du README
  (mise en forme, sommaire cliquable) — dérivée du `.md`, pas une source
  indépendante. Le `.md` reste le fichier à éditer en premier ; regénérer
  le `.html` seulement si une version de lecture confortable est utile
  (présentation, impression).
- **Organisation Claude recommandée :** conversation rangée dans un
  Project dédié, fichiers du dossier `geosd` déposés dans sa base de
  connaissances (déclenche une vraie continuité inter-conversations,
  contrairement à la mémoire de conversation seule qui reste bornée à la
  fenêtre de contexte).

## Fond de carte hors-ligne partagé entre saisie et consultation (24/08/2026)

- **Constat :** le module `geosd-offline-map.js` (bouton « Fond hors-ligne »,
  téléchargement/purge PMTiles) n'était branché que sur
  `geosd-terrain-saisie.html`. `geosd-terrain-consultation.html` appelait
  déjà `addBaseLayerSwitcher(map)` (donc affichait bien la couche PMTiles
  téléchargée si elle existait), mais n'avait ni le bouton pour la gérer, ni
  le Service Worker enregistré depuis cette page.
- **Le stockage (IndexedDB `geosd_pmtiles_offline`) est déjà par origine, pas
  par page** — un fond téléchargé depuis une des deux versions terrain était
  donc déjà techniquement lisible par l'autre, à condition que
  `geosd-offline-map.js` (et donc le Service Worker) ait été chargé au moins
  une fois. Le problème n'était pas le partage des données, mais l'absence
  d'interface et d'enregistrement du Service Worker côté consultation.
- **Correctif :** ajout du bouton `#btn-offline-map` et de
  `<script src="geosd-offline-map.js">` dans
  `geosd-terrain-consultation.html`, à l'identique de la version saisie —
  aucun CSS supplémentaire nécessaire (`.overlay`/`.modal`/`.field` déjà
  communs aux 3 versions via `geosd-common.css`).
- **`sw-precache.js` : `geosd-terrain-consultation.html` ajouté à
  `APP_SHELL_URLS`.** Sans cela, un redémarrage à froid (tablette éteinte,
  aucun réseau) de la version consultation seule (jamais ouverte via
  saisie au préalable) aurait pu échouer à recharger la page elle-même,
  même si le fond de carte régional était bien présent en IndexedDB. Nom de
  cache bumpé `geosd-shell-v1` → `geosd-shell-v2` pour forcer une
  réinstallation propre de la coquille sur les appareils déjà utilisés.
- **Un seul fond régional stocké à la fois, comme avant** — ce
  comportement (remplacement, pas cumul) n'a pas changé, il est juste
  maintenant piloté indifféremment depuis l'une ou l'autre version terrain.
- **Libellé « Fond PMTiles (test) » renommé en « Fond simple hors ligne »
  (24/08/2026)**, dans le sélecteur de fonds de carte (`geosd-themes.js`,
  seul endroit où ce libellé existait). Le nom d'origine, hérité du spike
  d'exploration, n'avait plus lieu d'exposer à l'agent le terme technique
  "PMTiles" ni la mention "test" une fois la fonctionnalité en usage
  courant.
- **Popups « i »/« ? » passées sous les contrôles Leaflet (zoom,
  géolocalisation, sélecteur de fonds) au premier essai (24/08/2026),
  corrigé le jour même.** Les popups (`.overlay`, `z-index:1000`) et les
  conteneurs de contrôles Leaflet (`.leaflet-top`/`.leaflet-bottom`,
  `z-index:1000` défini par `leaflet.css`) partageaient le même z-index :
  à valeur égale, c'est l'ordre d'apparition dans le DOM qui décide, et
  `#map-wrap` (donc les contrôles) suit les popups dans le HTML des deux
  pages terrain — les contrôles gagnaient systématiquement. Corrigé en
  portant `.overlay` à `z-index:2000` dans `geosd-common.css`, réglage
  global qui profite aussi à la modale de saisie de point et à celle du
  fond hors-ligne (déjà correctes par chance d'ordre DOM, mais désormais
  garanties indépendamment de cet ordre).
- **Boutons de zoom +/- retirés de la carte, `geosd-terrain-saisie.html`
  et `geosd-terrain-consultation.html` uniquement (24/08/2026)** —
  `L.map('map', { zoomControl: false })`. Assumé : l'essentiel des agents
  zoome désormais au doigt (pincement) ou à la molette, fonctions Leaflet
  natives non affectées par cette option (elle ne masque que les deux
  boutons). Sur `geosd-terrain-saisie.html`, le contrôle « Ma position »
  (`topleft`, custom) occupe maintenant seul ce coin, sans changement de
  code nécessaire de son côté. `geosd-admin.html` (poste desktop) garde
  ses boutons +/-, non concerné par cette demande.

## Séparation présentation publique / présentation admin (24/08/2026)

- **Constat :** `index.html` annonçait "3 versions" et donnait un accès
  direct (bouton dans le hero + carte dédiée) à `geosd-admin.html`, alors
  que cette page est censée être publique (hébergement GitHub Pages) et
  que l'administration n'a pas vocation à être découverte par n'importe
  qui — seuls les administrateurs qui intègrent les envois terrain doivent
  y accéder.
- **Décision :** `index.html` ne présente plus que les 2 versions terrain
  (saisie, consultation) — carte ADMIN retirée, bouton "Ouvrir
  l'administration" retiré du hero, nav et titres de section repassés à
  "2 versions". Toute la présentation de l'administration (fonctionnalités,
  astuce lecteur réseau mappé, mode d'emploi, démo, lien vers
  `geosd-admin.html`) déplacée dans une nouvelle page dédiée,
  `index_admin.html`, construite avec la même identité visuelle
  qu'`index.html` (cohérence pro pour ce que verront les administrateurs).
- **`index_admin.html` volontairement non lié depuis `index.html`** — page
  "non listée" plutôt que protégée par un mécanisme d'accès (cohérent avec
  le reste du projet : pas d'authentification distante nulle part). Son URL
  est à transmettre directement, par le canal de son choix, aux
  administrateurs concernés.
- **Mode d'emploi de `index.html` réécrit du point de vue de l'agent
  terrain** (saisir, exporter en fin de tournée), avec une étape finale
  qui explique que c'est l'administrateur qui intègre les envois et met à
  jour le fichier central, et qu'il revient à l'agent de recopier
  périodiquement ce fichier à jour sur son appareil de consultation — sans
  décrire le détail du travail de l'administrateur (couvert par le mode
  d'emploi propre à `index_admin.html`).
- **Corrections de contenu périmé au passage**, repérées en retravaillant
  ce texte : plusieurs endroits (`index.html`, et une ligne de tableau du
  présent README) décrivaient encore un envoi immédiat par point (mail ou
  partage natif) après chaque saisie — fonctionnalité retirée depuis (voir
  décision "Envoi terrain par point" plus haut), remplacée par l'export
  groupé en fin de tournée. Reformulé pour refléter le fonctionnement
  actuel.
- **Lien retour ajouté sur `geosd-admin.html` (24/08/2026)** : le titre
  « GeoSD » de l'en-tête pointait vers `index.html` (comme sur les 2
  versions terrain) ; il pointe désormais vers `index_admin.html`, sa
  propre page de présentation, plus pertinente pour ce contexte. Un second
  petit lien « Présentation générale » a été ajouté à côté, vers
  `index.html`, pour ne pas perdre l'accès à la présentation publique.

## Sélecteur de fond de carte replié par défaut (25/08/2026)

Le contrôle Leaflet natif de choix du fond de carte (`addBaseLayerSwitcher`,
`geosd-themes.js`) restait ouvert en permanence (`collapsed:false`) dans
les 3 versions : sur mobile, la liste des fonds (OSM, Plan IGN, Orthophoto
IGN, SCAN25) occupait une bande fixe de l'écran, réduisant d'autant la
zone de carte utile pour la saisie/consultation sur le terrain.

- **Décision :** `collapsed:true` par défaut désormais — le sélecteur se
  réduit à un petit bouton (« 🗺️ Fond de carte ▾ »), qui s'ouvre en liste
  au tap puis se referme (comportement natif du contrôle Leaflet, pas de
  code réécrit). `addBaseLayerSwitcher` accepte un paramètre
  `options.collapsed` pour forcer l'autre comportement au cas par cas.
- **`geosd-admin.html` fait exception** (`collapsed:false` passé
  explicitement) : poste desktop, écran large, pas la même contrainte
  d'espace que sur tablette — le sélecteur reste ouvert comme avant.
- **Icône du bouton replié : texte, pas l'image sprite Leaflet par
  défaut** (`images/layers.png`, chargée en relatif depuis
  `vendor/leaflet.css`). Ce fichier n'existe pas dans `vendor/images/` de
  ce projet (jamais copié, le sélecteur étant jusqu'ici toujours affiché
  ouvert) — l'utiliser tel quel aurait affiché une icône cassée. Un
  libellé CSS (`::after{content:"🗺️ Fond de carte ▾"}`) évite d'avoir à
  ajouter ce fichier image, cohérent avec le choix déjà fait ailleurs
  dans le projet de ne pas dépendre d'assets superflus.
- **Alternative écartée : un vrai `<select>` HTML** plutôt que le contrôle
  Leaflet replié. Aurait demandé de réécrire la logique de bascule de
  fond (et son accroche avec la confirmation SCAN25, `map.on('baselayerchange', ...)`)
  en dehors de l'API native `L.control.layers` — plus de code à
  maintenir pour un gain d'ergonomie marginal par rapport au repliage
  natif, qui répond déjà au problème (place à l'écran).

## Nom du projet

Le projet s'est appelé **Geoshar** avant d'être renommé **GeoSD**, pour
mieux correspondre à l'usage par un service départemental. Tous les
fichiers, titres et clés de stockage local ont été alignés en conséquence.
