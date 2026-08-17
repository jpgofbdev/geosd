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
| `geosd-terrain-saisie.html` | Saisie de nouveaux points sur le terrain | Tablette Android (ou tout mobile) | En mémoire locale (localStorage) + envoi par mail/partage après chaque point |
| `geosd-terrain-consultation.html` | Consultation des points déjà connus, lecture seule | Tablette Android (ou tout mobile) | Aucune — fichier local ou dépôt distant |

Toutes les trois partagent deux fichiers communs à ne jamais dupliquer :
- `geosd-themes.js` — configuration des thématiques et des territoires (généré/édité)
- `geosd-common.css` — apparence

**Tous les fichiers doivent rester dans le même dossier** (ou à la racine
du même dépôt pour un hébergement web).

## Fichiers du projet

| Fichier | Rôle | À éditer ? |
|---|---|---|
| `index.html` | Page d'accueil / présentation (hébergement GitHub Pages) | Occasionnellement (copie/coordonnées) |
| `geosd-admin.html` | Application desktop administrateur | Non |
| `geosd-terrain-saisie.html` | Application terrain — saisie | Non |
| `geosd-terrain-consultation.html` | Application terrain — consultation | Éventuellement, pour `DEPOT_URL` (voir plus bas) |
| `geosd-tokens.css` | Couleurs et polices (charte graphique) — **seul fichier à éditer pour un changement de style** | Oui, si évolution de charte |
| `geosd-common.css` | Mise en page et composants communs aux 3 versions (importe `geosd-tokens.css`) | Non |
| `geosd-themes.js` | Config. des thématiques et des territoires (généré/édité) — **ne pas éditer le bloc THEMES à la main** | Oui, pour `TERRITOIRES` (voir plus bas) |
| `modele-formulaires.csv` | Modèle de champs par thématique — **source de vérité** | **Oui**, c'est le fichier à modifier |
| `generate_themes.py` | Régénère le bloc THEMES de `geosd-themes.js` à partir du CSV | Non |
| `points2.geojson` | Jeu de données de démonstration (aucune vraie donnée) | Non |
| `*.geojson` (données réelles) | Données saisies | Non manuellement |
| `JOURNAL_DECISIONS.md` | Historique des arbitrages et de leur raison d'être | Ajouter une entrée si nouvelle décision structurante |

## Sélecteur de territoire (une instance pour les 6 services de la région)

GeoSD est pensé ici pour être **hébergé une seule fois** (ex. sur GitHub
Pages) et utilisé par les 6 services départementaux de la région Centre-Val
de Loire — chacun avec ses propres fichiers de données, mais la même
application.

**À la première ouverture** (sur un poste ou un appareil donné), un
sélecteur demande de choisir son service départemental dans une liste. La
carte s'ouvre alors automatiquement sur le territoire correspondant. Ce
choix est **mémorisé sur l'appareil** (pas de compte, juste
`localStorage`) — il ne sera plus redemandé ensuite.

- **Changer de territoire** : bouton **"Territoire : ..."** dans l'en-tête,
  à tout moment, dans les 3 applications.
- **"Passer"** : ouvre une vue France entière, sans mémoriser de choix — le
  sélecteur réapparaîtra à la prochaine ouverture.

**Ajouter un 7ᵉ territoire (ou modifier une emprise existante) :** éditer
l'objet `TERRITOIRES` en haut de `geosd-themes.js` — une seule ligne par
territoire, format :
```js
loiret: { label: "Loiret (45)", bounds: [[47.55, 1.50], [48.20, 2.95]] }
```
Le rectangle est `[[lat_sud, lng_ouest], [lat_nord, lng_est]]`. Comme pour
les thématiques, **un seul fichier à modifier, les 3 applications suivent
automatiquement**. Les emprises actuelles sont approximatives — à ajuster
visuellement si besoin en testant la page.

**Choix volontairement écarté :** une carte cliquable pour choisir le
territoire. Un menu déroulant suffit largement pour 6 (voire quelques
dizaines) de territoires nommés, et évite d'avoir à maintenir de vrais
contours géographiques (fichier de frontières administratives) dans le
projet — plus simple à faire évoluer.

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

## Modifier le modèle de champs (thématiques communes aux 3 versions)

**Encodage du CSV (accents dans Excel) :** `modele-formulaires.csv` doit
rester encodé en UTF-8 avec BOM pour qu'Excel affiche les accents
correctement à l'ouverture. Si vous le modifiez et le réenregistrez
depuis Excel, choisissez impérativement **"CSV UTF-8 (délimité par des
virgules)"** dans la liste des formats — pas "CSV (délimité par des
virgules)" tout court, qui retire le BOM et fait réapparaître le problème.
Le script `generate_themes.py` gère les deux cas (avec ou sans BOM) sans
réglage particulier de votre part.


1. Éditer `modele-formulaires.csv` (Excel, Google Sheets, VS Code...).
2. Dans un terminal, se placer dans le dossier du projet, puis :
   ```
   python3 generate_themes.py
   ```
3. Vérifier le message `OK — N thématique(s) écrites dans geosd-themes.js
   (partagé par les 3 versions)`.
4. Recharger les pages ouvertes dans le navigateur — **un seul lancement du
   script met à jour les 3 applications**, plus besoin de le faire 3 fois.

## Tableau de données (geosd-admin.html)

Bouton **"Tableau"** dans l'en-tête : liste tous les points avec leurs
valeurs complètes — thématique, sous-type, les 7 champs communs (commune,
date, heure, auteur signalement, auteur faits, commentaire, fiabilité,
détectés automatiquement), une colonne "Détails spécifiques" pour les
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
   nouveaux points normalement.
2. **Après chaque point** : un panneau propose "Envoyer par mail" (le point
   est collé en texte dans le corps d'un brouillon de mail — fonctionne sur
   n'importe quelle tablette) ou "Partager" (fichier `.geojson` joint via le
   partage natif Android, si une application compatible est installée
   — Gmail, Drive...). Les deux méthodes sont indépendantes, à choisir selon
   la situation (réseau, applications disponibles).
3. **En fin de tournée**, "Exporter tout" télécharge un fichier de secours
   avec tous les points de la session, au cas où certains envois individuels
   auraient échoué.
4. **Au bureau (`geosd-admin.html`)** : ouvrir (ou créer) le fichier
   central, puis "Intégrer un envoi terrain" — sélectionner un ou plusieurs
   fichiers reçus (la sélection multiple est possible, pratique si plusieurs
   mails sont arrivés). Les points déjà présents (même identifiant) sont
   ignorés automatiquement, pas de doublon.

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
- **`mailto` a une limite de longueur** (variable selon le client mail,
  ~2000 caractères en pratique) : convient pour un point avec quelques
  champs, mais peut échouer sur un point avec un commentaire très long.
  Dans ce cas, utiliser "Partager" à la place.
- **Le partage de fichier (`navigator.share` avec pièce jointe)** dépend des
  applications installées sur la tablette — à tester sur le matériel cible
  avant déploiement (comportement variable selon fabricant/version Android).
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
| Un point envoyé par mail n'arrive pas intact | Corps du mail tronqué (limite `mailto`) | Réessayer avec "Partager" |
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
- Sous-type "Eau > RCE" à définir.
- PWA installable pour les 2 versions terrain (manifeste + mise en cache
  hors-ligne) — évoqué, pas encore implémenté. Rendrait l'icône d'écran
  d'accueil réellement fonctionnelle sans réseau, pas juste un raccourci
  vers une page à recharger.
- Emprises exactes des 6 territoires (`TERRITOIRES` dans
  `geosd-themes.js`) à vérifier/ajuster — actuellement des approximations
  de départ, pas des contours officiels.
- Suivi à prévoir sur l'évolution du support Android de la File System
  Access API (statut en cours de développement côté Chromium, sans
  garantie de date — voir JOURNAL_DECISIONS.md pour le détail).
