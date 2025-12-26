// Définition des routes
const routes = {
  '/': {
    title: 'Accueil - mini-photoshop-vue',
    render: () => {
      const app = document.getElementById('app');
    }
  },
  '/canvas': {
    title: 'Canvas - mini-photoshop-vue',
    render: async () => {
      const app = document.getElementById('app');
      // Charger le template HTML
      const templateResponse = await fetch('/src/canvasPage/template.html');
      const templateHTML = await templateResponse.text();
      app.innerHTML = templateHTML;
      
      // Charger le CSS
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = '/src/canvasPage/style.css';
      document.head.appendChild(linkElement);
      
      // Charger et exécuter le script
      const module = await import('../canvasPage/page.js');
    }
  },
  '/export': {
    title: 'Export - mini-photoshop-vue',
    render: async () => {
      const app = document.getElementById('app');
      // Charger le template HTML
      const templateResponse = await fetch('/src/exportPage/template.html');
      const templateHTML = await templateResponse.text();
      app.innerHTML = templateHTML;
      
      // Charger le CSS
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = '/src/exportPage/style.css';
      document.head.appendChild(linkElement);
      
      // Charger et exécuter le script
      const module = await import('../exportPage/page.js');
    }
  }
};

// Fonction pour naviguer vers une route
export function navigateTo(path) {
  // Mettre à jour l'URL sans recharger la page
  window.history.pushState({}, '', path);
  
  // Charger le contenu de la route
  loadRoute(path);
}

// Fonction pour charger le contenu d'une route
function loadRoute(path) {
  const route = routes[path] || routes['/'];
  
  // Mettre à jour le titre de la page
  document.title = route.title;
  
  // Afficher le contenu de la route
  route.render();
}

// Initialiser le routeur
export function initRouter() {
  // Intercepter les clics sur les liens avec data-link
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-link]');
    
    if (target) {
      e.preventDefault();
      const path = target.getAttribute('data-link');
      navigateTo(path);
    }
  });
  
  // Gérer les boutons retour/avant du navigateur
  window.addEventListener('popstate', () => {
    loadRoute(window.location.pathname);
  });
  
  // Charger la route initiale
  loadRoute(window.location.pathname);
}
