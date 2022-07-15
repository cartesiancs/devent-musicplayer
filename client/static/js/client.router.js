

function render(pathname) {
  window.history.pushState({pathname}, pathname, pathname);
  pathname = pathname + "_"
  let isvaild = false

  for (const key in routes) {
    if (Object.hasOwnProperty.call(routes, key)) {
      let regex = new RegExp(key+'_', 'gi');
      if (pathname.match(regex)) {
        isvaild = true
        pathname = key
        break
      }
    }
  }


  if (isvaild) {
    body.app.innerHTML = routes[pathname] || routes['/page/notfound'];
    loadscript(pathname)
  } else {
    body.app.innerHTML = routes['/page/notfound'];
    loadscript('/page/notfound')
  }


}

function loadscript(pathname) {
  console.log(pathname)
  switch (pathname) {
    case '/page/album':
      handle.albumFunc.loadAlbum()
      break;
  
    case '/page/album/[0-9]*':
      load_idx = location.pathname.split("/")[3] || 'all'
      handle.albumFunc.loadAlbum(load_idx)
      handle.musicFunc.getMusicFromAlbum(load_idx)

      break;

    case '/page/upload':
      handle.albumFunc.loadAlbumSelect()
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