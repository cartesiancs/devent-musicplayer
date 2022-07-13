export default class Album {
    constructor() {
    }


    async create(album) {
        let response = await fetch("/api/album", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `album_title=${album.album_title}&album_text=${album.album_text}&album_image=${album.album_image}`
        });

    
        let data = response.json();
        return data;
    }

    async read(album) {

        let idx = album.album_idx == 'all' ? '' : album.album_idx
        let response = await fetch(`/api/album/${idx}`, {
            method: "GET"
        });
    
        let data = response.json();
        return data;
    }

    async delete(album) {

        let response = await fetch(`/api/album/${album.album_idx}`, {
            method: "DELETE"
        });
    
        let data = response.json();
        return data;
    }
}