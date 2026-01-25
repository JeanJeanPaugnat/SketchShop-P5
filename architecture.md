# 🎨 SketchShop.P5 - Architecture du Projet

## Vue d'ensemble

SketchShop.P5 est une application web de dessin et d'édition photo construite avec **p5.js** et **Vite**. L'application utilise un routeur personnalisé (SPA - Single Page Application) pour naviguer entre trois pages principales sans recharger la page.

---

## 📁 Structure du Projet

```
mini-photoshop-vue/
├── index.html                    # Point d'entrée HTML principal
├── vite-config.js               # Configuration Vite (base: '/SketchShop-P5/')
├── package.json                 # Dépendances (p5.js, Vite, gh-pages)
├── vercel.json                  # Configuration pour déploiement Vercel
├── ARCHITECTURE.md              # Ce fichier
│
├── src/
│   ├── main.js                  # Initialisation du routeur
│   ├── page.js                  # Page d'accueil (sélection taille canvas)
│   ├── style.css                # Styles globaux
│   ├── template.html            # Template HTML page accueil
│   │
│   ├── canvasPage/
│   │   ├── page.js              # Logique principale du canvas + p5.js
│   │   ├── style.css            # Styles du canvas (layout 3 panneaux)
│   │   └── template.html        # Structure HTML (control-panel, canvas, layers)
│   │
│   ├── exportPage/
│   │   ├── export.js            # Logique d'export (PNG, JPEG)
│   │   ├── style.css            # Styles de la page export
│   │   └── template.html        # Template export
│   │
│   ├── UploadPage/              # (Non utilisé actuellement)
│   │   ├── import.js
│   │   ├── style.css
│   │   └── template.html
│   │
│   └── utils/
│       ├── router.js            # Routeur personnalisé (SPA)
│       ├── canvasState.js       # État global du canvas
│       ├── drawing.js           # Fonctions de dessin (pencil, eraser, shapes)
│       ├── filters.js           # Filtres (threshold, pixelate, ASCII)
│       ├── pictures.js          # Gestion des images (vide)
│       └── utils.js             # Utilitaires
│
└── dist/                         # Build Vite (généré automatiquement)
    ├── index.html
    ├── assets/
    │   ├── index-*.js
    │   └── *.css
```

---

## 🔀 Système de Routage (Router)

### Architecture

Le projet utilise un **routeur personnalisé** (`src/utils/router.js`) au lieu de Vue Router.

```javascript
Routes définies:
├── "/" (Home)          → page.js + template.html
├── "/canvas"          → canvasPage/page.js + template.html
└── "/export"          → exportPage/export.js + template.html
```

### Fonctionnement

1. **Navigation** : Clic sur `data-link` → `navigateTo()` → `pushState()` + `loadRoute()`
2. **Chargement dynamique** :
   - Fetch du template HTML
   - Injection dans `#app`
   - Import dynamique du script JS
   - Chargement du CSS

### Support GitHub Pages

Le routeur utilise `import.meta.env.BASE_URL` pour supporter le déploiement sous un sous-dossier:
```javascript
const BASE_URL = import.meta.env.BASE_URL; // '/SketchShop-P5/'
function withBase(path) { return BASE_URL + path.replace(/^\//, ''); }
```

---

## 🏠 Page Accueil (Home)

**Fichiers** : `page.js`, `template.html`, `style.css`

### Fonctionnalités
- Sélection de **presets de taille** (800×600, 1920×1080, 1024×768, 500×500)
- Entrée **taille personnalisée**
- Stockage dans `window.canvasSize` (objet global)

### Flow
```
User sélectionne taille → sizeSelected() 
  → window.canvasSize = {width, height}
  → navigateTo('/canvas')
```

---

## 🎨 Page Canvas (Éditeur Principal)

**Fichiers** : `canvasPage/page.js`, `template.html`, `style.css`

### Architecture 3-Panneaux

```
┌─────────────────────────────────────┐
│        CANVAS PAGE LAYOUT           │
├──────────────┬──────────┬───────────┤
│  Control     │  Canvas  │  Layers   │
│  Panel       │  Stage   │  Panel    │
│              │          │           │
│ • Tools      │  p5.js   │ • Layer 1 │
│ • Filters    │  Canvas  │ • Layer 2 │
│ • File       │          │ • Layer 3 │
└──────────────┴──────────┴───────────┘
```

### État Global (`canvasState.js`)

```javascript
canvasState = {
  color: 'black',
  tool: 'pencil',
  width: 800,
  height: 600,
  brushSize: 5,
  isDrawing: true,
  rectangleStart: null,
  dynamicBrush: false
}
```

### Outils de Dessin

**Fichier** : `utils/drawing.js`

- **Pencil** (`drawPencil`) : Trait avec épaisseur dynamique basée sur la vitesse
- **Eraser** (`erasePencil`) : Gomme utilisant `erase()`
- **Shapes** : Carré, rectangle
- **Dynamic Brush** : Variation d'épaisseur selon la vélocité de la souris

### Système de Calques

```javascript
calques[] = [
  { graphics: p5.Graphics, name: "Calque 1", visible: true },
  { graphics: p5.Graphics, name: "Calque 2", visible: true },
  ...
]
```

- UI en temps réel qui affiche l'ordre des calques
- Drag & drop pour réorganiser
- Visibilité togglable
- Sélection du calque actif

### Filtres

**Fichier** : `utils/filters.js`

1. **Threshold** : Convertit en noir/blanc selon seuil
2. **Pixelate** : Pixélisation avec taille configurable
3. **ASCII** : Conversion en art ASCII avec caractères

---

## 📤 Page Export

**Fichiers** : `exportPage/export.js`, `template.html`, `style.css`

### Fonctionnalités
- Export en **PNG** (avec transparence)
- Export en **JPEG** (fond blanc)
- Téléchargement automatique du fichier

### Logique
```javascript
canvas.toBlob(blob => {
  const url = URL.createObjectURL(blob);
  <a href=url download=filename>.click();
})
```

---

## ⚙️ Configuration Vite

**Fichier** : `vite-config.js`

```javascript
export default defineConfig({
    base: '/SketchShop-P5/',  // Base URL pour GitHub Pages
    plugins: [vue()]           // Plugin Vue (non utilisé)
});
```

### Build & Deploy

```bash
npm run build              # Build → dist/
npm run deploy             # Push dist/ vers gh-pages branch
```

Exécution:
1. `predeploy` : Lance `npm run build`
2. `deploy` : `gh-pages -d dist` pousse vers GitHub Pages

---

## 🔄 Flux de Données

```
Home Page
  ↓ (sélection taille)
  → window.canvasSize = {width, height}
  → navigateTo('/canvas')
  
Canvas Page
  ↓ (dessin)
  → canvasState.tool/color/brushSize
  → Dessin sur calque actif (p5.Graphics)
  → Rendu à l'écran
  
  ↓ (appliquer filtre)
  → filters.js (threshold, pixelate, ASCII)
  → Modification du calque
  
  ↓ (exporter)
  → navigateTo('/export')
  
Export Page
  ↓ (fusion des calques visibles)
  → canvas.toBlob()
  → Téléchargement
```

---

## 📦 Dépendances

```json
{
  "p5": "^2.1.1",           // Dessin et graphismes
  "vite": "^7.2.4",         // Build tool
  "@vitejs/plugin-vue": "",  // Plugin Vue (inutilisé)
  "gh-pages": "^6.3.0"      // Déploiement GitHub Pages
}
```

---

## 🚀 Déploiement

### GitHub Pages

```bash
git add .
git commit -m "Update"
npm run deploy
```

✅ Déploie sur `https://username.github.io/SketchShop-P5/`

### Vercel (Alternative)

`vercel.json` configure les rewrites pour que le SPA fonctionne:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🔧 Points Clés Techniques

### 1. **p5.js Sketch en Module**
- Instance p5 créée dans `canvasPage/page.js`
- Intégration avec DOM existant via `parent` parameter
- Multiple graphics layers avec `createGraphics()`

### 2. **State Management**
- État global dans `window.canvasSize` (taille du canvas)
- État local `canvasState` importé des utils
- Pas de store centralisé (Pinia/Vuex)

### 3. **SPA Router Personnalisé**
- Évite les rechargements de page
- Gère les chemins relatifs/absolus avec `withBase()`
- Support des boutons retour/avant du navigateur

### 4. **Dynamic Brush**
- Historique de vitesse pour lissage
- Courbe d'easing (cubic ease-in-out)
- Variation entre 30-100% de la brush size

---

## 📝 Notes de Développement

- **CSP** : `default-src *` dans `index.html` pour flexibilité de dev
- **Import dynamique** : Utilise `import()` pour charger les modules de chaque page
- **Performance** : Chaque page charge son CSS séparément pour isolation
- **Responsive** : Media queries dans les fichiers CSS pour mobile

---

## 🎯 Améliorations Futures

- [ ] Migrer vers Vue Router pour meilleure gestion des routes
- [ ] Ajouter Pinia pour state management centralisé
- [ ] Implémenter UploadPage pour charger des images
- [ ] Undo/Redo avec historique des actions
- [ ] Sauvegarde locale (localStorage/IndexedDB)
- [ ] Brush presets et customization avancée
- [ ] Mode sombre/clair
- [ ] Partage des créations
