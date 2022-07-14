const albumFunc = {
    addAlbum: async function () {
        let albumHandle = new handle.Album()
    
        let album = {
            album_title: document.querySelector("#form_album_title").value,
            album_text: document.querySelector("#form_album_text").value,
            album_image: document.querySelector("#form_album_image").value
        }
    
        let result = await albumHandle.create(album)
    },
    
    deleteAlbum: async function () {
        let albumHandle = new handle.Album()
    
        let album = {
            album_idx: location.pathname.split("/")[3]
        }
    
        let result = await albumHandle.delete(album)
        console.log(result)
    },
    
    loadAlbum: async function (idx = 'all') {
        let albumHandle = new handle.Album()
        let albumList = document.querySelector("#list_album")
    
        let album = {
            album_idx: idx
        }
    
        let result = await albumHandle.read(album)
        result.result.forEach((element) => {
            let body = document.createElement('card-album')
            let title = document.createElement('card-album-title')
            let text = document.createElement('card-album-text')
    
            body.setAttribute("image-src", element.album_image)
            body.setAttribute("album-idx", element.idx)
    
            title.innerText = element.album_title
            text.innerText = element.album_text
    
            body.appendChild(title)
            body.appendChild(text)
    
            albumList.insertAdjacentElement("beforeend", body)
    
        })
    },

    loadAlbumSelect: async function () {
        let albumHandle = new handle.Album()
        let albumSelect = document.querySelector("#form_music_albums")
    
        let album = {
            album_idx: 'all'
        }
    
        let result = await albumHandle.read(album)
        result.result.forEach((element) => {
            let option = document.createElement('option')
    
            option.setAttribute("value", element.idx)
            option.innerText = element.album_title
    
            albumSelect.insertAdjacentElement("beforeend", option)
    
        })
    }
}



export default albumFunc