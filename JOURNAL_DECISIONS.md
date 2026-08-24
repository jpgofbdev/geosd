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
- **Purge manuelle avec confirmation écrite** (taper "SUPPRIMER", pas un
  simple bouton OK/Annuler) plutôt qu'une confirmation faible façon
  `window.confirm()` — cohérent avec la gravité de l'action (irréversible),
  tout en restant un geste volontaire de l'agent, jamais initié par le
  système.
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

## Nom du projet

Le projet s'est appelé **Geoshar** avant d'être renommé **GeoSD**, pour
mieux correspondre à l'usage par un service départemental. Tous les
fichiers, titres et clés de stockage local ont été alignés en conséquence.


Verdict — Fond de carte PMTiles hors-ligne (spike geosdspike)

Date : 21/08/2026 Dépôt du spike : https://github.com/jpgofbdev/geosdspike Question posée : Un fond de carte PMTiles (rendu via Leaflet) peut-il remplacer/compléter les fonds actuels pour un usage hors connexion, sans perturber le reste de l'application ?

Verdict : ça tient, sous ces conditions

Le mécanisme fonctionne de bout en bout — fond de carte, coquille applicative, bibliothèques externes — validé sur desktop et sur Android réel (Samsung S20 FE), y compris à froid (tablette éteinte/onglet fermé, sans réseau au redémarrage).

Ce qui a été validé
Rendu du fond PMTiles — vectoriel (protomaps-leaflet), avec des règles de style transposées à la main depuis le style MapLibre du prototype offline-map-lab (occupation du sol, eau, cours d'eau permanents/intermittents, routes, libellés).
Cohabitation avec la couche de marqueurs — clic, popup, formulaire de saisie, tous fonctionnels par-dessus le fond PMTiles.
Fonctionnement hors connexion réel — architecture Service Worker + IndexedDB (voir "Architecture retenue" ci-dessous), validée en coupure réseau effective, pas seulement onglet resté ouvert.
Poids/téléchargement sur tablette — ~300 Mo téléchargés et exploités sans souci sur Android réel, avec suivi de progression.
Fidélité visuelle — rendu jugé proche du prototype MapLibre de référence.

Au-delà du périmètre initial, un module de gestion complet a été construit : choix parmi 13 régions, jauge d'espace avec avertissement au-delà de 50% d'occupation estimée, téléchargement piloté avec progression et annulation, purge, affichage de l'âge du fond téléchargé.

Architecture retenue
Fond de carte : protomaps-leaflet (vectoriel — le format des fichiers .pmtiles disponibles est du MVT, pas du raster). Lecture directe d'un Blob local testée et abandonnée (structurellement non fonctionnelle dans la bibliothèque, quelle que soit la version).
Hors-ligne : Service Worker interceptant les requêtes réseau (Range pour le fond de carte régional, standard pour la coquille applicative et les bibliothèques externes) et les servant depuis IndexedDB / Cache Storage. pmtiles continue de croire qu'il parle au réseau — aucune modification de son usage normal.
Bibliothèques externes (Leaflet, protomaps-leaflet) vendorisées dans le dépôt (vendor/) plutôt que tirées d'un CDN, pour éliminer toute dépendance réseau externe même au tout premier chargement sur un nouvel appareil.
Limitations connues / risques résiduels
Validation Android partielle : le module complet (coquille + bibliothèques vendorisées) n'a été testé que sur desktop après les derniers ajouts. Seule la brique de base (fond de carte seul) avait été confirmée sur Android réel.
Mémoire pendant le téléchargement : les ~300 Mo sont accumulés en mémoire JS avant écriture — sans souci observé sur le matériel testé, à surveiller sur des appareils plus anciens/limités.
Piège des réponses opaques (requêtes cross-origin sans CORS explicite, statut toujours 0 côté Service Worker) — corrigé, mais suffisamment subtil pour mériter une note dans la documentation du dépôt principal à l'intention des futurs mainteneurs de sw-precache.js.
Versionnement des caches (geosd-shell-v1, geosd-runtime-v1, geosd-pmtiles-offline) fonctionnel mais sans convention documentée pour les futurs mainteneurs (quand bumper la version).
Périmètre non tranché : seul geosd-terrain-saisie.html a été traité. geosd-terrain-consultation.html n'a pas été évalué — à décider avant intégration si un usage hors-ligne y est pertinent.
Fichiers concernés (pour intégration)
geosd-terrain-saisie.html — bouton d'en-tête ajouté
geosd-themes.js — liste des régions PMTiles, région active mémorisée, candidats CDN étendus aux copies vendorisées
geosd-offline-map.js — nouveau, module de gestion hors-ligne
sw-precache.js — nouveau, Service Worker (fond de carte + coquille + bibliothèques)
vendor/leaflet.css, vendor/leaflet.js, vendor/protomaps-leaflet.js — nouveaux, copies locales vendorisées
Recommandation

Réintégration recommandée, sous réserve de :

Compléter la validation Android sur le module final (post-ajout coquille/vendoring).
Trancher le périmètre geosd-terrain-consultation.html.
Documenter le piège des réponses opaques et la convention de versionnement des caches dans la documentation du dépôt principal.
Passer par une revue de code normale (pull request) plutôt qu'une copie directe des fichiers — voir section suivante.
