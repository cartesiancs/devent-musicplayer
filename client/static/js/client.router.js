

function render(pathname) {
  window.history.pushState({pathname}, pathname, pathname);
  body.app.innerHTML = routes[pathname] || routes['/notfound'];
  loadscript(pathname)
}

function loadscript(pathname) {
  switch (pathname) {
    case '/page/player':
      loadAlbum()
      break;
  
    default:
      break;
  }
  
}

window.addEventListener("popstate", (event) => {
  let pathname = window.location.pathname;
  render(pathname)
});

render(window.location.pathname);