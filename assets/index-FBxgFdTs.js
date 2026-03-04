const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./page-D88f1wGg.js","./export-sg1uXv5E.js","./export-CxHDvKvu.css","./page-BJGiCpcu.css"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const E="modulepreload",P=function(n,t){return new URL(n,t).href},g={},v=function(t,r,c){let e=Promise.resolve();if(r&&r.length>0){let w=function(i){return Promise.all(i.map(d=>Promise.resolve(d).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),f=o?.nonce||o?.getAttribute("nonce");e=w(r.map(i=>{if(i=P(i,c),i in g)return;g[i]=!0;const d=i.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(c)for(let p=a.length-1;p>=0;p--){const h=a[p];if(h.href===i&&(!d||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${u}`))return;const l=document.createElement("link");if(l.rel=d?"stylesheet":E,d||(l.as="script"),l.crossOrigin="",l.href=i,f&&l.setAttribute("nonce",f),document.head.appendChild(l),d)return new Promise((p,h)=>{l.addEventListener("load",p),l.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${i}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return e.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return t().catch(s)})},S=`<div class="home-container">\r
  <!-- HEADER -->\r
  <header class="home-header">\r
    <div class="header-content">\r
      <h1 class="logo">🎨 SketchShop.P5</h1>\r
      <p class="tagline">A Powerful p5.js Drawing & Photo Editor</p>\r
    </div>\r
  </header>\r
\r
  <!-- MAIN CONTENT -->\r
  <main class="home-main">\r
    <!-- CANVAS SETUP CARD -->\r
    <div class="setup-card">\r
      <h2 class="card-title">🖼️ Canvas Setup</h2>\r
      \r
      <div class="presets-section">\r
        <h3 class="section-title">Quick Presets</h3>\r
        <div class="preset-buttons">\r
          <button class="preset-btn" data-width="800" data-height="600">\r
            <span class="preset-icon">📱</span>\r
            <span class="preset-name">Standard</span>\r
            <span class="preset-size">800×600</span>\r
          </button>\r
          <button class="preset-btn" data-width="1920" data-height="1080">\r
            <span class="preset-icon">🖥️</span>\r
            <span class="preset-name">HD</span>\r
            <span class="preset-size">1920×1080</span>\r
          </button>\r
          <button class="preset-btn" data-width="1024" data-height="768">\r
            <span class="preset-icon">📄</span>\r
            <span class="preset-name">Tablet</span>\r
            <span class="preset-size">1024×768</span>\r
          </button>\r
          <button class="preset-btn" data-width="500" data-height="500">\r
            <span class="preset-icon">⬜</span>\r
            <span class="preset-name">Square</span>\r
            <span class="preset-size">500×500</span>\r
          </button>\r
        </div>\r
      </div>\r
      \r
      <div class="custom-section">\r
        <h3 class="section-title">Custom Size</h3>\r
        <div class="custom-inputs">\r
          <div class="input-group">\r
            <label for="custom-width">Width (px):</label>\r
            <input type="number" id="custom-width" placeholder="800" min="1" class="input-field" />\r
          </div>\r
          <div class="input-group">\r
            <label for="custom-height">Height (px):</label>\r
            <input type="number" id="custom-height" placeholder="600" min="1" class="input-field" />\r
          </div>\r
        </div>\r
        <button id="apply-custom" class="btn-primary btn-large">✨ Create Canvas</button>\r
      </div>\r
    </div>\r
\r
    <!-- FEATURES CARD -->\r
    <div class="features-card">\r
      <h2 class="card-title">✨ Features</h2>\r
      <div class="features-grid">\r
        <div class="feature-item">\r
          <span class="feature-icon">✏️</span>\r
          <h4>Drawing Tools</h4>\r
          <p>Pencil, Eraser & Shapes</p>\r
        </div>\r
        <div class="feature-item">\r
          <span class="feature-icon">📚</span>\r
          <h4>Layers System</h4>\r
          <p>Organize your artwork</p>\r
        </div>\r
        <div class="feature-item">\r
          <span class="feature-icon">🎨</span>\r
          <h4>Filters</h4>\r
          <p>Pixelate, Threshold & ASCII</p>\r
        </div>\r
        <div class="feature-item">\r
          <span class="feature-icon">📤</span>\r
          <h4>Export & Import</h4>\r
          <p>Save your creations</p>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- NAVIGATION CARD -->\r
    <!-- <div class="nav-card">\r
      <h2 class="card-title">🚀 Navigate</h2>\r
      <div class="nav-buttons">\r
        <button class="nav-btn nav-btn-primary" data-link="/canvas">\r
          <span class="nav-icon">🎨</span>\r
          <span class="nav-text">\r
            <span class="nav-title">Go to Canvas</span>\r
            <span class="nav-desc">Start creating your masterpiece</span>\r
          </span>\r
        </button>\r
        <button class="nav-btn nav-btn-secondary" data-link="/export">\r
          <span class="nav-icon">📤</span>\r
          <span class="nav-text">\r
            <span class="nav-title">Export Page</span>\r
            <span class="nav-desc">Export and manage files</span>\r
          </span>\r
        </button>\r
      </div>\r
    </div> -->\r
  </main>\r
</div>\r
\r
`,A=`<div class="canvas-container">\r
    <!-- PANNEAU DE CONTRÔLE (gauche) -->\r
    <aside class="control-panel">\r
        <!-- Section Canvas Size -->\r
        <div class="panel-section">\r
            <h3 class="section-title">Canvas Size</h3>\r
            <div class="input-group">\r
                <label for="custom-width">Width:</label>\r
                <input type="number" id="custom-width" min="1" class="input-field" />\r
            </div>\r
            <div class="input-group">\r
                <label for="custom-height">Height:</label>\r
                <input type="number" id="custom-height" min="1" class="input-field" />\r
            </div>\r
        </div>\r
\r
        <!-- Section Outils de Dessin -->\r
        <div class="panel-section">\r
            <h3 class="section-title">Drawing Tools</h3>\r
            <div class="button-group">\r
                <button id="pencil" class="tool-btn" title="Crayon">✏️ Pencil</button>\r
                <button id="eraser" class="tool-btn" title="Gomme">🧹 Eraser</button>\r
                <button id="shape-square" class="tool-btn" title="Carré">⬜ Square</button>\r
            </div>\r
            <div class="input-group">\r
                <label for="brush-size">Brush Size:</label>\r
                <div class="slider-wrapper">\r
                    <input type="range" id="brush-size" min="1" max="50" value="5" class="slider" />\r
                    <span id="brush-size-value">5</span>\r
                </div>\r
            </div>\r
            <div class="input-group">\r
                <label for="colorPicker">Color:</label>\r
                <input type="color" id="colorPicker" class="color-picker" />\r
            </div>\r
            <button id="dynamic-brush" class="tool-btn" title="Brush dynamique basé sur la vitesse">🌊 Dynamic Brush</button>\r
            <button id="clear" class="btn-danger">🗑️ Clear</button>\r
        </div>\r
\r
        <!-- Section Filtres -->\r
        <div class="panel-section">\r
            <h3 class="section-title">Filters</h3>\r
            <div class="button-group">\r
                <button class="filter-threshold btn-filter">🎨 Threshold</button>\r
                <button class="filter-pixelate btn-filter">📦 Pixelate</button>\r
                <button class="filter-ascii btn-filter">📝 ASCII</button>\r
            </div>\r
        </div>\r
\r
        <!-- Section Fichiers -->\r
        <div class="panel-section">\r
            <h3 class="section-title">File</h3>\r
            <div class="button-group">\r
                <button id="upload" class="btn-file">📤 Upload</button>\r
                <button id="export" class="btn-file">📥 Export</button>\r
            </div>\r
        </div>\r
    </aside>\r
\r
    <!-- ZONE CANVAS CENTRALE -->\r
    <section class="canvas-stage">\r
        <div class="canvas-bar">\r
            <span class="canvas-label">Canvas</span>\r
            <span class="canvas-size" id="canvas-size-display"></span>\r
        </div>\r
        <div id="p5-holder" class="canvas-wrapper"></div>\r
        <div id="appToModify" class="dynamic-content"></div>\r
    </section>\r
\r
    <!-- PANNEAU DES CALQUES (droite) -->\r
    <aside class="layers-panel">\r
        <h3 class="section-title">Layers</h3>\r
        <div class="calques">\r
            <div class="layer-input-group">\r
                <input type="text" id="layer-name" placeholder="Layer name" class="input-field" />\r
                <button id="new-layer" class="btn-primary" title="Ajouter un calque">+</button>\r
            </div>\r
            <ul class="layers">\r
                <!-- Layers will be added here -->\r
            </ul>\r
        </div>\r
    </aside>\r
</div>`,C=`<section id="export-section" class="export-container">\r
\r
    <h2>Export Page</h2>\r
    <div class="container">\r
        <label for="filename">Filename:</label>\r
        <input type="text" id="filename" name="filename" value="my_drawing" />\r
        <button data-format="png" id="download-png">Download as PNG</button>\r
        <button data-format="jpeg" id="download-jpeg">Download as JPEG</button>\r
    </div>\r
\r
</section>`;function m(){return window.location.hash.replace(/^#/,"")||"/"}const y={"/":{title:"Accueil - mini-photoshop-vue",render:async()=>{const n=document.getElementById("app");if(!n)return;n.innerHTML=S;const{initHomePage:t}=await v(async()=>{const{initHomePage:r}=await import("./page-DMyiQjNg.js");return{initHomePage:r}},[],import.meta.url);t()}},"/canvas":{title:"Canvas - mini-photoshop-vue",render:async()=>{const n=document.getElementById("app");if(!n)return;n.innerHTML=A;const{createCanvas:t}=await v(async()=>{const{createCanvas:e}=await import("./page-D88f1wGg.js");return{createCanvas:e}},__vite__mapDeps([0,1,2,3]),import.meta.url),r=window.canvasSize?.width||800,c=window.canvasSize?.height||600;t(r,c)}},"/export":{title:"Export - mini-photoshop-vue",render:async()=>{const n=document.getElementById("app");n&&(n.innerHTML=C,await v(()=>import("./export-sg1uXv5E.js"),__vite__mapDeps([1,2]),import.meta.url))}}};function L(n){const t=n.startsWith("/")?n:`/${n}`;if(m()===t){b(t);return}window.location.hash=t}function b(n){const t=y[n]||y["/"];document.title=t.title,t.render().catch(r=>{console.error("Erreur lors du chargement de la route :",r)})}function T(){if(document.addEventListener("click",n=>{const t=n.target.closest("[data-link]");if(!t)return;n.preventDefault();const r=t.getAttribute("data-link");r&&L(r)}),window.addEventListener("hashchange",()=>{b(m())}),!window.location.hash){window.location.hash="/";return}b(m())}T();export{L as n,C as t};
