import homeTemplate from '../template.html?raw';
import canvasTemplate from '../canvasPage/canvas.html?raw';
import exportTemplate from '../exportPage/export.html?raw';

function getCurrentPath() {
  const pathFromHash = window.location.hash.replace(/^#/, '');
  return pathFromHash || '/';
}

const routes = {
  '/': {
    title: 'Accueil - mini-photoshop-vue',
    render: async () => {
      const app = document.getElementById('app');
      if (!app) return;

      app.innerHTML = homeTemplate;
      const { initHomePage } = await import('../page.js');
      initHomePage();
    }
  },
  '/canvas': {
    title: 'Canvas - mini-photoshop-vue',
    render: async () => {
      const app = document.getElementById('app');
      if (!app) return;

      app.innerHTML = canvasTemplate;
      const { createCanvas } = await import('../canvasPage/page.js');

      const width = window.canvasSize?.width || 800;
      const height = window.canvasSize?.height || 600;
      createCanvas(width, height);
    }
  },
  '/export': {
    title: 'Export - mini-photoshop-vue',
    render: async () => {
      const app = document.getElementById('app');
      if (!app) return;

      app.innerHTML = exportTemplate;
      await import('../exportPage/export.js');
    }
  }
};

export function navigateTo(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (getCurrentPath() === normalizedPath) {
    loadRoute(normalizedPath);
    return;
  }

  window.location.hash = normalizedPath;
}

function loadRoute(path) {
  const route = routes[path] || routes['/'];
  document.title = route.title;
  route.render().catch((error) => {
    console.error('Erreur lors du chargement de la route :', error);
  });
}

export function initRouter() {
  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-link]');

    if (!target) return;

    event.preventDefault();
    const path = target.getAttribute('data-link');
    if (path) navigateTo(path);
  });

  window.addEventListener('hashchange', () => {
    loadRoute(getCurrentPath());
  });

  if (!window.location.hash) {
    window.location.hash = '/';
    return;
  }

  loadRoute(getCurrentPath());
}
