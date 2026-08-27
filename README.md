# GeoSD — SIG minimaliste à 3 versions
 
Application de saisie de points géolocalisés par thématique, sans compte
utilisateur ni serveur applicatif. Le projet est découpé en
**3 versions indépendantes**, chacune adaptée à un usage précis, plus une
page d'accueil de présentation (`index.html`) pour l'hébergement public
(GitHub Pages).
 
## Les 3 versions
 
| Fichier | Usage | Où | Écriture |
|---|---|---|---|
| `geosd-admin.html` | Intégration du fichier central, fusion des envois terrain, tableau et statistiques | Poste desktop (Chrome/Edge/Opera) | Directe sur disque (File System Access API) |
| `geosd-terrain-saisie.html` | Saisie de nouveaux points sur le terrain | Tablette Android (ou tout mobile) | En mémoire locale (localStorage) + export groupé en fin de tournée |
| `geosd-terrain-consultation.html` | Consultation des points déjà connus, lecture seule | Tablette Android (ou tout mobile) | Aucune — fichier local ou dépôt distant |
 
Toutes les trois partagent deux fichiers communs à ne jamais dupliquer :
- `geosd-themes.js` — configuration des thématiques et des territoires (généré/édité)
- `geosd-common.css` — apparence
**Tous les fichiers doivent rester dans le même dossier** (ou à la racine
du même dépôt pour un hébergement web).
 
**Deux pages de présentation, deux publics.** `index.html` est la page
publique (GitHub Pages) : elle ne présente que les deux versions terrain
(saisie, consultation), sans aucune mention ni lien vers l'administration.
La présentation de l'administration vit dans `index_admin.html`, une page
séparée, volontairement non liée depuis `index.html` — son URL est à
transmettre directement aux administrateurs qui intègrent les envois
terrain, pas à afficher publiquement.
 
## Fichiers du projet
 
| Fichier | Rôle | À éditer ? |
|---|---|---|
| `index.html` | Page d'accueil / présentation publique (hébergement GitHub Pages) — ne présente que les 2 versions terrain, aucun lien vers l'administration | Occasionnellement (copie/coordonnées) |
| `index_admin.html` | Page de présentation de l'administration — **non liée depuis `index.html`**, à transmettre directement aux administrateurs qui intègrent les envois terrain | Occasionnellement (copie/coordonnées) |
| `GeoSD_Note_de_presentation.docx` | Note de présentation détaillée (atouts, sécurité, frugalité, limites) — liée depuis le pied de page de `index.html` | Occasionnellement |
| `GeoSD_Plaquette.pdf` | Version courte une page de la note ci-dessus, format « argumentaire flash » — liée depuis le pied de page de `index.html` | Occasionnellement |
| `GeoSD_Presentation.pptx` | Support de présentation générale (9 diapositives), incluant une diapositive dédiée au choix d'hébergement des données en local/réseau | Occasionnellement |
| `geosd-admin.html` | Application desktop administrateur | Non |
| `geosd-terrain-saisie.html` | Application terrain — saisie | Non |
| `geosd-terrain-consultation.html` | Application terrain — consultation | Éventuellement, pour `DEPOT_URL` (voir plus bas) |
| `geosd-tokens.css` | Couleurs et polices (charte graphique) — **seul fichier à éditer pour un changement de style** | Oui, si évolution de charte |
| `geosd-common.css` | Mise en page et composants communs aux 3 versions (importe `geosd-tokens.css`) | Non |
| `geosd-themes.js` | Config. des thématiques et des territoires (généré/édité) — **ne pas éditer le bloc THEMES à la main** | Oui, pour `TERRITOIRES` (voir plus bas) |
| `modele-formulaires.csv` | Modèle de champs par thématique + champs communs (`theme_key=commun`) — **source de vérité** | **Oui**, c'est le fichier à modifier |
| `generate_themes.py` | Régénère le bloc THEMES de `geosd-themes.js` à partir du CSV | Non |
| `points2.geojson` | Jeu de données de démonstration (aucune vraie donnée) | Non |
| `*.geojson` (données réelles) | Données saisies | Non manuellement |
| `JOURNAL_DECISIONS.md` | Historique des arbitrages et de leur raison d'être — **fichier actuellement manquant du dossier de travail, à reconstituer/reverser** | Ajouter une entrée si nouvelle décision structurante |
 
## Sélecteur de territoire (couverture France métropolitaine)

GeoSD est pensé ici pour être **hébergé une seule fois** (ex. sur GitHub
Pages) et utilisé par n'importe quel service départemental de métropole —
chacun avec ses propres fichiers de données, mais la même application.

**À la première ouverture** (sur un poste ou un appareil donné), un
sélecteur demande de choisir son département dans une liste (les **96
départements métropolitains**, triés alphabétiquement). La carte s'ouvre
alors automatiquement sur le territoire correspondant. Ce choix est
**mémorisé sur l'appareil** (pas de compte, juste `localStorage`) — il ne
sera plus redemandé ensuite.

- **Changer de territoire** : bouton **"Territoire : ..."** dans l'en-tête,
  à tout moment, dans les 3 applications.
- **"Passer"** : ouvre une vue France entière, sans mémoriser de choix — le
  sélecteur réapparaîtra à la prochaine ouverture.
**Ajouter un territoire hors métropole (ou modifier une emprise
existante) :** éditer l'objet `TERRITOIRES` en haut de `geosd-themes.js` —
une ligne par territoire, format :
```js
loiret: { label: "Loiret (45)", bounds: [[47.44, 1.47], [48.38, 3.17]] }
```
Le rectangle est `[[lat_sud, lng_ouest], [lat_nord, lng_est]]`. Comme pour
les thématiques, **un seul fichier à modifier, les 3 applications suivent
automatiquement**.

**Origine des emprises (25/08/2026) :** calculées à partir des contours
officiels IGN/INSEE (dépôt public `gregoiredavid/france-geojson`), avec une
marge d'environ 2 km ajoutée autour de chaque département — pas des
approximations dessinées à la main comme au tout début du projet (voir
JOURNAL_DECISIONS.md). Les clés des 6 départements du Centre-Val de Loire
d'origine (`cher`, `eureetloir`, `indre`, `indreetloire`, `loiretcher`,
`loiret`) sont inchangées : un agent ayant déjà choisi son territoire ne
perd pas son réglage mémorisé après mise à jour du fichier.

**Choix volontairement écarté :** une carte cliquable pour choisir le
territoire. Un menu déroulant reste praticable même à 96 entrées (triées
alphabétiquement), et évite d'avoir à maintenir de vrais contours
géographiques (fichier de frontières administratives) dans le projet —
plus simple à faire évoluer.

## Charte graphique
 
Toutes les couleurs et polices des 3 applications **et** de `index.html`
viennent d'un seul fichier : **`geosd-tokens.css`**. C'est le seul fichier
à modifier pour tout changement de style — une variable changée là se
répercute partout automatiquement (`geosd-common.css` l'importe via
`@import`, `index.html` le lie directement).
 
Palette actuelle : rapprochée de l'identité visuelle de l'OFB
(ofb.gouv.fr) — vert institutionnel sobre. **Codes approximatifs**, aucune
charte graphique officielle OFB trouvée en accès public au moment du
réglage. À remplacer par les codes exacts si obtenus auprès du service
communication OFB (une ligne par variable dans `geosd-tokens.css`).
 
La typographie (IBM Plex Mono/Sans) n'a volontairement pas été changée
pour la police officielle de l'État ("Marianne") — cela aurait ajouté une
dépendance CDN supplémentaire pour un gain visuel marginal. De même, le
bandeau "RÉPUBLIQUE FRANÇAISE" des sites `.gouv.fr` officiels n'a pas été
ajouté : GeoSD est un prototype interne, pas (encore) un service validé
institutionnellement — l'ajouter préventivement aurait pu créer une
confusion sur son statut.
 
## Hébergement web (GitHub Pages)
 
Le projet peut être servi tel quel comme site statique — `index.html`
présente l'outil et pointe vers les 3 versions et le fichier de démo.
 
- **Tous les fichiers à la racine du même dépôt/branche publiée**
  (`index.html`, les 3 `.html`, `geosd-common.css`, `geosd-themes.js`,
  `points2.geojson`) — les liens entre eux sont en chemin relatif.
- **Documents de présentation optionnels** (`GeoSD_Note_de_presentation.docx`,
  `GeoSD_Plaquette.pdf`, `GeoSD_Presentation.pptx`) : à placer dans ce même
  dossier si vous voulez que les liens du pied de page de `index.html`
  fonctionnent — sinon les retirer du pied de page ou les héberger ailleurs
  et adapter les chemins.
- **Aucune vraie donnée ne doit jamais être commitée** dans ce dépôt —
  seul `points2.geojson` (démonstration fictive) doit s'y trouver. Les
  fichiers `.geojson` réels des services restent en local/réseau, jamais
  sur GitHub.
- Ouvrir `geosd-admin.html` en HTTPS (via GitHub Pages) plutôt qu'en
  `file://` local évite certains soucis rencontrés avec les chemins réseau
  UNC (voir Dépannage) — la File System Access API fonctionne aussi bien
  en HTTPS qu'en `file://`, et le sélecteur de fichier reste libre de
  parcourir n'importe quel lecteur local ou réseau mappé, quelle que soit
  l'origine de la page.
- Pied de page de `index.html` : coordonnées de contact plutôt qu'un lien
  vers le dépôt (le dépôt n'est pas destiné à être mis en avant comme
  "code source" public consultable).

## Page d'accueil (index.html) — ergonomie mobile

Retouches faites sur retour d'usage mobile (25/08/2026, capture d'écran à
l'appui — Samsung Galaxy S8+, 360 px de large) :

- **Navigation d'en-tête qui se chevauchait sous 480 px.** Les 4 liens
  (Fonctionnalités, Les 2 versions, Mode d'emploi, Démo) tentaient de
  tenir sur la même ligne que le logo « SIG GeoSD » et se superposaient.
  Sous 480 px, l'en-tête passe désormais sur deux lignes : le logo seul en
  haut, les 4 liens répartis en pleine largeur juste en dessous
  (`flex-wrap` + `justify-content:space-between` sur `nav.site-nav`).
- **Schéma de points (illustration SVG du hero) trop grand sur mobile**,
  poussant le titre hors de l'écran visible sans défiler. Largeur max
  ramenée de 340 px à 190 px sous 480 px, avec un padding vertical du
  hero réduit d'autant.
- **Fond de plan symbolique ajouté sous la grille de points**, pour mieux
  évoquer l'aspect cartographique du schéma : quelques aplats de couleur
  façon parcelles, une rivière sinueuse et un chemin en pointillés, en
  tons très proches du fond pour ne pas concurrencer les points colorés.
  Toujours en SVG pur intégré au fichier — aucune image externe, cohérent
  avec le choix de n'ajouter aucune dépendance CDN supplémentaire.

## Navigation — lien retour vers l'accueil

Le titre **« GeoSD »** dans l'en-tête des 3 versions est un lien retour
(`.brand a`, `geosd-common.css`) — vers `index.html` en saisie et
consultation, vers `index_admin.html` en administration. Jusqu'ici, rien
ne le distinguait visuellement d'un simple texte avant le survol de la
souris — repéré comme problématique sur tablette (saisie, consultation),
où il n'y a pas de survol au doigt : le lien existait mais personne ne
pouvait deviner qu'il était cliquable.

**Correctif (27/08/2026) :** une flèche « ← » précède désormais le mot
« GeoSD » en permanence (couleur `--accent`, ajoutée en CSS via
`.brand a::before`, aucune modification de balisage nécessaire) — visible
sans interaction, à l'identique sur les 3 versions puisque le composant
est partagé. Un `aria-label` explicite a également été ajouté sur chacun
des 3 liens (`Retour à l'accueil GeoSD` en saisie/consultation, `Retour à
la présentation de l'administration` en admin).

## Modifier le modèle de champs (thématiques communes aux 3 versions)
 
**Encodage du CSV (accents dans Excel) :** `modele-formulaires.csv` doit
rester encodé en UTF-8 avec BOM pour qu'Excel affiche les accents
correctement à l'ouverture. Si vous le modifiez et le réenregistrez
depuis Excel, choisissez impérativement **"CSV UTF-8 (délimité par des
virgules)"** dans la liste des formats — pas "CSV (délimité par des
virgules)" tout court, qui retire le BOM et fait réapparaître le problème.
Le script `generate_themes.py` gère les deux cas (avec ou sans BOM) sans
réglage particulier de votre part.

**Délimiteur virgule ou point-virgule, détecté automatiquement
(25/08/2026) :** Excel/Google Sheets en locale française réenregistrent
parfois le CSV avec des points-virgules plutôt que des virgules (le
séparateur décimal étant la virgule dans cette locale). `generate_themes.py`
détecte le délimiteur utilisé à l'ouverture du fichier — aucun réglage à
faire de votre côté, les deux formats sont acceptés indifféremment.

**Champs communs à toutes les thématiques** (commune, date, heure, auteur
signalement, auteur faits, agent SD créateur du point, commentaire,
fiabilité) : à saisir **une seule fois** dans le CSV, avec
`theme_key = commun` (n'importe quel `theme_label`, ex. "Tous thèmes").
Ces lignes n'apparaissent pas comme thématique dans le sélecteur — elles
alimentent un bloc `COMMON_FIELDS` dans `geosd-themes.js`, ajouté
automatiquement à la fin du formulaire de **chaque** thématique. Plus
besoin de dupliquer ces 8 champs dans les lignes de chacune des 8
thématiques.

**Thématique sans aucun champ spécifique** (ex. Phytosanitaires, VTM —
seuls les champs communs s'appliquent) : ajouter une seule ligne avec
`theme_key`/`theme_label` renseignés et le reste des colonnes vide, pour
que la thématique reste enregistrée dans le sélecteur (ex.
`vtm,VTM,,,,,,,`) — sinon elle disparaîtrait faute de ligne dans le CSV.
 
1. Éditer `modele-formulaires.csv` (Excel, Google Sheets, VS Code...).
2. Dans un terminal, se placer dans le dossier du projet, puis :
   ```
   python3 generate_themes.py
   ```
3. Vérifier les messages `OK — N thématique(s) écrites`, `OK — N champ(s)
   commun(s) écrits` et, si le fichier de communes est présent, `OK — N
   commune(s) écrites` dans `geosd-themes.js` (partagé par les 3 versions).
4. Recharger les pages ouvertes dans le navigateur — **un seul lancement du
   script met à jour les 3 applications**, plus besoin de le faire 3 fois.
## Filtres de la carte (geosd-admin.html et geosd-terrain-consultation.html)
 
Bouton **"Filtres"** dans l'en-tête, ouvre un panneau latéral : recherche
libre (commune, commentaire, auteur), thématiques (cases à cocher, tout
cocher/décocher), période (date de début/fin du signalement), fiabilité
minimale. Tous les filtres se combinent en ET, et le compteur en bas du
panneau indique le nombre de points affichés sur le total.
 
**Filtre "Jour de semaine / Mois" (`geosd-admin.html` uniquement)** —
permet de sélectionner les points selon des critères calendaires,
combinables en ET avec les autres filtres du panneau :
- **Mode Simple** : jours de la semaine et mois multi-sélectionnables
  (puces cliquables), combinés en ET entre les deux catégories, en OU à
  l'intérieur d'une même catégorie. Catégorie non renseignée = ignorée.
- **Mode Occurrence** : mêmes puces jours/mois, plus une troisième liste
  (1er / 2e / 3e / 4e / Dernier) pour cibler une occurrence précise du
  jour dans le mois — ex. "le premier lundi d'octobre", "les deux
  premiers dimanches de novembre", "le dernier vendredi du mois, tous
  mois confondus".

Les deux modes sont exclusifs (un seul actif à la fois). Ce filtre n'a
pas de notion d'année propre : s'il est combiné avec le filtre de
période (date début/fin), le résultat reste borné à cette période ;
sinon toutes les années présentes dans le fichier sont considérées.
Volontairement absent de `geosd-terrain-consultation.html` et
`geosd-terrain-saisie.html` (besoin limité à l'usage bureau).
## Tableau de données (geosd-admin.html)
 
Bouton **"Tableau"** dans l'en-tête : liste tous les points avec leurs
valeurs complètes — thématique, sous-type, les 8 champs communs (commune,
date, heure, auteur signalement, auteur faits, agent SD créateur du point,
commentaire, fiabilité — issus du bloc `COMMON_FIELDS`, voir "Modifier le
modèle de champs" plus haut), une colonne "Détails spécifiques" pour les
champs propres à chaque thématique, et les coordonnées. **Respecte les
filtres actifs** (contrairement aux statistiques, qui affichent toujours
tout) — utile pour croiser une recherche/filtre avec un export ciblé.
 
- Tri par date, thématique ou commune.
- Actions directement depuis chaque ligne : **Localiser** (centre la carte
  et ouvre le point), **Modifier**, **Supprimer**.
- **"Exporter en CSV (Excel)"** : fichier ouvrable directement dans Excel
  (accents corrects), sur la sélection actuellement affichée dans le
  tableau. Ce n'est pas un `.xlsx` au format natif — volontairement, pour ne
  pas ajouter de dépendance externe supplémentaire au projet. Si un vrai
  `.xlsx` (feuilles multiples, mise en forme) devient nécessaire, il faudra
  ajouter une bibliothèque JS dédiée (SheetJS), avec le même genre de CDN de
  secours déjà en place pour Leaflet.
## Statistiques (geosd-admin.html)
 
Bouton **"Statistiques"** dans l'en-tête : ouvre un histogramme (points par
thématique et par mois, couleurs identiques à la carte) et un tableau
détaillé avec totaux par ligne/colonne, plus un bouton **"Exporter en CSV"**
(utilisable dans Excel). Toujours calculé sur l'ensemble du fichier, sans
tenir compte des filtres actifs sur la carte. Aucune bibliothèque externe —
le graphique est un simple SVG généré à la volée, donc aucune dépendance
réseau supplémentaire et aucune maintenance liée à une librairie tierce.
Les thématiques ajoutées via le CSV apparaissent automatiquement, sans
retouche nécessaire.
 
## Modifier un point existant
 
Sur `geosd-admin.html` et `geosd-terrain-saisie.html`, cliquer sur un point
puis **"Modifier"** dans le popup rouvre le formulaire pré-rempli avec ses
valeurs actuelles (thématique, sous-type, champs). La position géographique
du point n'est volontairement pas modifiable depuis ce formulaire — pour
déplacer un point, le supprimer et le ressaisir au bon endroit.
 
## Workflow terrain → bureau
 
1. **Sur la tablette (`geosd-terrain-saisie.html`)** : facultatif, charger
   le fichier central existant via "Charger points existants" pour avoir un
   contexte visuel (points affichés en gris, non modifiables). Saisir les
   nouveaux points normalement — une brève confirmation ("✓ Point
   enregistré sur la tablette") s'affiche après chaque saisie.
2. **En fin de tournée**, **"Exporter tout"** télécharge un fichier
   `.geojson` regroupant tous les points saisis sur l'appareil — à
   transmettre au bureau par le moyen de son choix (mail avec pièce jointe
   ajoutée manuellement depuis l'application de messagerie, clé USB,
   dossier partagé).
3. **Au bureau (`geosd-admin.html`)** : ouvrir (ou créer) le fichier
   central, puis "Intégrer un envoi terrain" — sélectionner un ou plusieurs
   fichiers reçus (la sélection multiple est possible). Les points déjà
   présents (même identifiant) sont ignorés automatiquement, pas de
   doublon.
4. **Une fois l'intégration confirmée par l'administrateur**, l'agent peut
   effacer sa tablette via **"Effacer les saisies en cours"** (bouton
   rouge, tapez `SUP` pour confirmer). Purement manuel et volontaire
   — voir ci-dessous pourquoi il n'y a aucune suppression automatique.
**Pas d'envoi individuel par point.** Une version antérieure proposait un
envoi immédiat par mail ou partage natif après chaque point. Retirée : le
protocole `mailto` ne permet techniquement de joindre aucun fichier (limite
du protocole, pas un choix), et le partage natif (`navigator.share`)
s'est révélé peu fiable en pratique. L'export groupé en fin de tournée est
désormais l'unique méthode de sortie des données — plus simple à expliquer
aux agents, un seul geste à retenir.
 
### Gestion du stockage local (pourquoi rien n'est automatique)
 
- Les points saisis restent sur l'appareil **indéfiniment** tant que
  l'agent ne les efface pas lui-même — fermer l'onglet, éteindre la
  tablette, rouvrir le lendemain : rien n'est perdu.
- **Aucune purge automatique** n'a lieu, y compris après "Exporter tout" —
  ce mécanisme ne confirme pas que l'administrateur a réellement reçu et
  intégré les points. Supprimer automatiquement sur la foi d'une action non
  confirmée serait le pire risque du projet : perte de données
  irréversible sur le terrain.
- **Pas de risque de doublon en cas de non-purge** : la fusion admin ignore
  déjà les points déjà présents (même identifiant). Le seul coût de ne
  jamais purger est l'accumulation sur l'appareil (fichiers d'export plus
  gros avec le temps), pas un risque de corruption.
- **Périodicité suggérée, pas imposée :** vider l'appareil une fois par
  semaine ou en fin de tournée, après vérification orale/visuelle avec
  l'administrateur que l'intégration a bien eu lieu.
## Version consultation et mise à jour du fichier de référence
 
**Protocole retenu :** les agents étant responsables du contenu de leur
matériel professionnel, aucun mécanisme d'authentification distant n'est
nécessaire. La mise à jour se fait par **copie manuelle à la demande** :
 
1. Le fichier central à jour est disponible sur le dossier réseau de
   l'entreprise (celui géré via `geosd-admin.html`).
2. À intervalle régulier (ou avant une tournée), copier ce fichier sur la
   tablette (câble, synchronisation d'un client déjà installé, etc.).
3. Dans `geosd-terrain-consultation.html` (ou `geosd-terrain-saisie.html`
   pour la couche de référence), bouton **"Charger un fichier"** → sélection
   du fichier copié.
**Indicateur de fraîcheur automatique :** chaque sauvegarde par
`geosd-admin.html` horodate désormais le fichier (`updated_at`). Les
versions terrain affichent cet âge après chargement, avec une alerte
visuelle si le fichier a plus de **30 jours** (seuil réglable dans
`geosd-themes.js`, constante `STALE_AFTER_DAYS`) — rappel simple pour savoir
quand redemander une copie à jour, sans mécanisme d'expiration forcé.
 
**Dépôt distant (optionnel, non retenu pour l'instant) :** le code garde la
possibilité de charger automatiquement depuis une URL (`DEPOT_URL` en haut
de `geosd-terrain-consultation.html`, vide par défaut, bouton "Recharger le
dépôt" masqué tant qu'elle n'est pas renseignée) — à réactiver seulement si
le protocole manuel s'avère trop contraignant à l'usage.
 
## Installer des raccourcis sur la tablette
 
Pour un accès rapide depuis l'écran d'accueil Android, sans passer par un
navigateur ou un gestionnaire de fichiers à chaque fois :
 
1. Ouvrir `geosd-terrain-saisie.html` dans Chrome (double-tap ou via un
   gestionnaire de fichiers).
2. Menu Chrome (⋮, en haut à droite) → **"Ajouter à l'écran d'accueil"**.
3. Répéter avec `geosd-terrain-consultation.html`.
Deux icônes distinctes apparaissent alors sur l'écran d'accueil, chacune
rouvrant directement la bonne version.
 
## Architecture technique
 
- **Aucun serveur applicatif.** `geosd-admin.html` écrit directement sur
  disque via la File System Access API (Chrome/Edge/Opera desktop
  uniquement). Les 2 versions terrain n'écrivent jamais de fichier
  directement — sauvegarde locale (localStorage) + export/envoi manuel.
- **Format des données :** GeoJSON standard, réutilisable dans QGIS.
- **Fonds de carte :** OpenStreetMap et IGN Géoplateforme (`data.geopf.fr`,
  WMTS ouvert, sans clé), identiques dans les 3 versions.
## Limitations connues
 
- **`geosd-admin.html` : Chrome/Edge/Opera desktop uniquement.** Aucune
  version mobile de l'administration n'est prévue — l'écriture directe de
  fichier n'est pas fiable sur Android (voir plus bas) et absente sur iOS.
- **Android ment parfois sur son support de l'écriture de fichiers.** Sur
  certains Android, `showSaveFilePicker` existe mais échoue à l'usage
  ("permission d'écriture refusée"). Les 2 versions terrain n'utilisent donc
  jamais cette API, par choix, indépendamment de ce que le navigateur
  prétend supporter.
- **Pas de fusion automatique en cas de modification simultanée** du fichier
  central par deux personnes — un seul poste administrateur à la fois.
## Dépannage
 
| Symptôme | Cause probable | Solution |
|---|---|---|
| `L is not defined` / carte blanche | Pas d'accès internet, ou fichier ouvert dans un aperçu sandboxé | Ouvrir directement (double-clic), connexion active |
| `Cross origin sub frames aren't allowed...` | Fichier ouvert dans une iframe/aperçu | Ouvrir en onglet direct |
| `User activation is required to request permissions` (Android) | Implémentation Android non fiable de la File System Access API | Normal — utiliser les versions terrain, pas `geosd-admin.html`, sur tablette |
| `Marqueurs THEMES_START/THEMES_END introuvables` | `generate_themes.py` ne trouve pas `geosd-themes.js` dans le dossier courant | Vérifier avec `dir`/`ls` que tous les fichiers sont dans le même dossier |
| `Not allowed to request permissions in this context` (chemin réseau) | Fichier ouvert via un chemin UNC direct (`file://serveur/...`), traité différemment d'un disque local par Chrome | Mapper le dossier réseau en lettre de lecteur (`Z:`) et ouvrir depuis là (`file:///Z:/...`), ou héberger `geosd-admin.html` en HTTPS |
| `ReferenceError: initTerritory is not defined` (ou toute fonction manquante) sur GitHub Pages | Un fichier interdépendant (souvent `geosd-themes.js`) est resté en version périmée sur le dépôt alors que d'autres ont été mis à jour | Renvoyer **tous les fichiers en bloc** sur GitHub à chaque mise à jour, pas au cas par cas |
| GitHub affiche "Your site is published" mais les changements n'apparaissent pas | Badge de publication pas toujours synchrone avec le déploiement réel | Vérifier l'onglet **Actions** du dépôt (horodatage précis du dernier déploiement Pages), puis Ctrl+F5 pour ignorer le cache navigateur |
| `404 Not Found` sur un fichier `.woff2` (police IBM Plex) dans la console | Aléa ponctuel du CDN Google Fonts sur une graisse de police précise | Sans gravité — repli automatique sur une police système via `--sans:'IBM Plex Sans', system-ui, sans-serif`, rien à corriger |
 
## Sauvegarde des données
 
Le fichier `.geojson` central est la donnée la plus précieuse du projet
(le reste est régénérable). Faire une copie datée régulièrement, avant toute
séance d'intégration importante.
 
## Pistes d'évolution
 
- Champs spécifiques restants pour Phytosanitaires, VTM, FSC,
  Habitat/espèces protégées, Cueillette.
- Champ `type_moyen_prohibe` (Chasse) : déclaré en `field_type=text` dans
  le CSV alors que des options (`Véhicule,Piegeage,...`) sont renseignées à
  côté — ces options sont actuellement ignorées (champ texte libre), un
  champ `text` n'utilisant pas la colonne `options`. À clarifier : passer
  en `select` si une liste fermée est voulue, ou retirer les options du CSV
  si le texte libre est le choix assumé.
- PWA installable pour les 2 versions terrain (manifeste + mise en cache
  hors-ligne) — évoqué, pas encore implémenté. Rendrait l'icône d'écran
  d'accueil réellement fonctionnelle sans réseau, pas juste un raccourci
  vers une page à recharger.
- Suivi à prévoir sur l'évolution du support Android de la File System
  Access API (statut en cours de développement côté Chromium, sans
  garantie de date — voir JOURNAL_DECISIONS.md pour le détail).
 
## Fond de carte hors-ligne

GeoSD permet de télécharger un fond de carte vectoriel (PMTiles) pour
un usage sans connexion réseau, y compris à froid (application rouverte
sans réseau après une coupure complète). Accessible via le bouton
« Fond hors-ligne » dans l'en-tête de `geosd-terrain-saisie.html`
**et** de `geosd-terrain-consultation.html` — gestion identique dans les
deux versions (mêmes régions proposées, même jauge d'espace, même purge).

Le fond téléchargé est **partagé entre les deux versions terrain** : le
stockage (IndexedDB) est propre à l'appareil, pas à la page ouverte. Un
agent peut donc télécharger une région depuis la saisie et la retrouver
aussitôt en consultation (ou l'inverse), sans le retélécharger. Un seul
fond régional reste stocké à la fois (remplacement, pas cumul).

- `geosd-offline-map.js` — module de gestion (téléchargement par
  région, jauge d'espace, purge).
- `sw-precache.js` — Service Worker : sert le fond de carte régional,
  l'application elle-même et ses bibliothèques depuis le stockage
  local quand le réseau est absent.
- `vendor/` — copies locales de Leaflet et `protomaps-leaflet`
  (volontairement pas de CDN, pour ne dépendre d'aucun service externe
  y compris au premier chargement).

Détail de l'exploration et des choix techniques : voir
`JOURNAL_DECISIONS.md` (entrée du 21/08/2026) et le dépôt de spike
`geosdspike` (archivé).

## Informations et mode d'emploi (versions terrain)

Sur `geosd-terrain-saisie.html` et `geosd-terrain-consultation.html`,
deux petits boutons ronds dans l'en-tête ouvrent chacun une popup :

- **« i »** — l'information générale sur le fonctionnement de la page
  (sauvegarde locale, export, etc. pour la saisie ; lecture seule et
  protocole de mise à jour pour la consultation). Reprend le contenu qui
  occupait auparavant un bandeau fixe sous l'en-tête, retiré pour libérer
  de l'espace à l'écran sur mobile.
- **« ? »** — un mode d'emploi propre à la page affichée (liste des
  actions disponibles et de leur usage), distinct du mode d'emploi
  général présenté sur `index.html`.

Sur `geosd-terrain-consultation.html`, le bandeau de fraîcheur du fichier
chargé (âge, alerte au-delà de 30 jours) reste affiché directement dans
l'en-tête, sans passer par une popup — c'est une alerte active qui doit
rester visible sans action de l'agent.