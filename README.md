# Site web ASEPESH-Mali

Site vitrine de l'**Association Soutien et Espoir aux Parents d'Enfants en Situation de Handicap
au Mali** — « Aucun parent seul, aucun enfant oublié. »

Site statique : HTML, CSS et JavaScript, sans dépendance ni serveur applicatif.
Il se publie tel quel sur GitHub Pages, Netlify, Vercel ou un hébergement mutualisé classique.

---

## 1. Contenu du dossier

```
Asepesh/
├── index.html            Accueil
├── association.html      L'association (histoire, objectif, organes, organigramme, ressources)
├── actions.html          Nos actions (3 axes, axes d'intervention, plaidoyer, missions)
├── galerie.html          Galerie photo avec visionneuse
├── adherer.html          Adhésion, don, bénévolat, partenariat (3 formulaires)
├── contact.html          Coordonnées et formulaire de contact
├── css/style.css         Charte graphique complète
├── js/config.js          ⚙️ COORDONNÉES ET PARAMÈTRES — c'est ici qu'on modifie
├── js/ui.js              En-tête, pied de page, menu, galerie, formulaires
├── assets/logo/          Logo détouré + favicons générés
├── assets/img/           Photos de l'association
└── docs/                 Manuel de procédures (PDF, lié depuis le site)
```

## 2. Coordonnées et paramètres

Tout se trouve dans **`js/config.js`** — un seul fichier, répercuté sur les six pages :

| Champ | Valeur actuelle |
|---|---|
| `tel` / `telLien` | `+223 75 87 55 11` — numéro principal, utilisé aussi pour WhatsApp et les formulaires |
| `tel2` / `telLien2` | `+223 64 90 11 84` — second numéro (laisser vide pour le masquer) |
| `email` | `asepeshmali@gmail.com` |
| `adresse` | `Bamako, Mali` — à préciser |
| `horaires` | horaires du manuel — à confirmer |
| `facebook` | vide (laisser vide masque l'icône) |
| `cotisation` | `à fixer en Assemblée Générale` |

À vérifier également :

- **Photo `assets/img/president.jpg`** — utilisée dans la galerie sous la légende neutre
  « Membre du bureau ». Le manuel emploie le féminin (« la Présidente ») alors que le fichier
  s'appelle *President* : à trancher avant d'afficher un nom ou un titre.
- **Nom des responsables** — aucun nom de personne n'apparaît sur le site, faute d'information
  vérifiée. Une section « Le bureau national » peut être ajoutée quand la liste sera disponible.

## 3. Les formulaires

Le site étant statique, **aucune donnée n'est enregistrée**. Les trois formulaires (adhésion,
bénévolat, contact) composent un message pré-rempli et l'ouvrent dans WhatsApp.

Pour recevoir les demandes par e-mail à la place, ajouter `data-envoi="email"` sur la balise
`<form>` concernée. Pour un envoi automatique vers une boîte ou un tableur, brancher un service
(Formspree, Google Forms, API) dans la fonction `forms()` de `js/ui.js`.

## 4. Lancer le site en local

```bash
# depuis le dossier Asepesh/
python -m http.server 5530 --bind 127.0.0.1
# puis ouvrir http://127.0.0.1:5530
```

Ouvrir directement `index.html` dans le navigateur fonctionne aussi, mais un petit serveur évite
les avertissements liés aux fichiers locaux.

## 5. Publier sur GitHub Pages

```bash
git init
git add .
git commit -m "Site ASEPESH-Mali"
git branch -M main
git remote add origin https://github.com/<compte>/<depot>.git
git push -u origin main
```

Puis, dans le dépôt : **Settings → Pages → Source : `main` / `root`**.

> ⚠️ Ce dossier se trouve sous `C:\Users\cisse\Downloads\`, où un dépôt Git parasite existe à la
> racine du profil utilisateur. Lancer `git init` **dans le dossier `Asepesh`** avant tout
> `git add`, et vérifier avec `git rev-parse --show-toplevel` que l'on travaille bien dans ce
> dossier et non dans `C:\Users\cisse`.

## 6. Charte graphique

Mise en page éditoriale inspirée de [higherlifefoundation.org](https://higherlifefoundation.org/) :
fond blanc, filets gris clairs, grands titres serrés, bandeau supérieur, méga-menus à vignette,
héro photo plein écran, bloc « Ce que nous faisons » collant avec barre de progression,
carrousel « À la une », bandeau de chiffres et pied de page bleu nuit.

Les couleurs restent celles du médaillon du logo. Elles sont définies en variables CSS
au début de `css/style.css` (`:root`).

| Rôle | Valeur | Origine |
|---|---|---|
| Bleu nuit (bandeau, chiffres, pied de page) | `#061A33` | fond du médaillon |
| Bleu des liens et des puces | `#2B63A8` | anneau, assombri pour le texte sur blanc (5,9:1) |
| Remplissage des boutons | `#B3D4FF` | anneau, éclairci |
| Fond teinté | `#E7F0FC` / `#F5F7FA` | dérivés |
| Argent | `#BCC3CA` | étoiles et lettrage |
| Texte | `#141A24` / `#6B7280` | quasi noir / gris secondaire (4,8:1) |

Typographie : **Figtree** (Google Fonts), une seule famille, proche de la Cera Pro du site
de référence.

## 7. Accessibilité et performance

- Contrastes vérifiés sur fond sombre (texte courant ≥ 8:1, texte secondaire ≥ 5:1).
- Lien d'évitement, navigation au clavier, `aria-label` sur les contrôles, visionneuse pilotable
  au clavier (`Échap`, flèches).
- Animations désactivées si `prefers-reduced-motion` est actif.
- Images en `loading="lazy"`, aucune bibliothèque JavaScript externe.
