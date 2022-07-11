
function render(pathname) {
  window.history.pushState({pathname}, pathname, pathname);
  body.app.innerHTML = routes[pathname] || routes['/notfound'];
}

window.addEventListener("popstate", (event) => {
  let pathname = window.location.pathname;
  render(pathname)
});

render(window.location.pathname);