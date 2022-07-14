export default class Music {
    constructor() {
    }


    async upload(formData) {

        let response = await fetch(`/api/music`, {
            method: "POST",
            body: formData
        });
    
        let data = response.json();
        return data;
    }

    async get(album_idx) {

        let response = await fetch(`/api/music/${album_idx}`, {
            method: "GET"
        });
    
        let data = response.json();
        return data;
    }
}