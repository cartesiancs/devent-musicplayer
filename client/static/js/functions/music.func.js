const musicFunc = {
    uploadMusic: async function () {
        let musicHandle = new handle.Music()

        let file = document.querySelector('#form_music_file').files[0] || ''
        let album_selected = document.querySelector("#form_music_albums").selectedIndex
        let album_value = document.querySelector("#form_music_albums").options[album_selected].value;
        
        let body = {
            album_idx: album_value,
            music_title: document.querySelector('#form_music_title').value
        }

        if(file != '') {
            const formData = new FormData();
            formData.append('body', JSON.stringify(body))
            formData.append('file', file)

            let result = await musicHandle.upload(formData)

            if (result.status == 1) {
                dds.toast({content:'성공적으로 업로드 했어요'})

            } else {
                dds.toast({content:'문제 발새애애앵'})

            }
        }
    },

    getMusicFromAlbum: async function (album_idx) {
        let musicHandle = new handle.Music()

        let table_body = document.querySelector("#list_music")

        let result = await musicHandle.get(album_idx)

        let count_music = 0

        result.result.forEach((element) => {
            let body = document.createElement('tr')
            let body_index = document.createElement('th')
            let body_music_title = document.createElement('td')
            count_music = count_music + 1

            body.setAttribute('onclick', `handle.musicFunc.playMusic('/uploads/${element.music_filename}')`)

            body_index.innerText = count_music
            body_music_title.innerText = element.music_title

            body.appendChild(body_index)
            body.appendChild(body_music_title)

            table_body.insertAdjacentElement("beforeend", body)

        })
    },


    playMusic: async function (url) {
        let audio = new Audio(url);
        console.log(audio)
        audio.play();
    }
    
}



export default musicFunc