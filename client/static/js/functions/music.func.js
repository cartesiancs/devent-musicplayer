const musicFunc = {
    object: {
        audio: new Audio(),
        currentAudioUrl: '',
        existAudio: false
    },
    modal: {
        player: new bootstrap.Modal(document.getElementById('player_music'), {
            keyboard: false
        })
    },
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
        if (this.object.currentAudioUrl != url) {
            console.log('change')
            this.object.audio.pause();
            this.object.audio = ''
        }

        if (this.object.existAudio == true && this.object.currentAudioUrl == url) {
            this.object.audio.play();
            this.modal.player.show()

        } else {
            this.object.currentAudioUrl = url
            this.object.audio = new Audio(url);
            this.object.audio.play();
            this.object.existAudio = true
            this.modal.player.show()
            document.querySelector("#player_btn_play").setAttribute("onclick", `handle.musicFunc.playMusic('${url}')`)
        }

        
        setInterval(() => {
            document.querySelector("#player_range").value = this.object.audio.currentTime / this.object.audio.duration * 100
        }, 600);
        this.showMusicControllerButton('player_btn_pause')

    },

    pauseMusic: async function () {
        if (this.object.existAudio) {
            this.object.audio.pause();
        }
        this.showMusicControllerButton('player_btn_play')
    },

    setCurrentTime: async function () {
        let range_body = document.querySelector("#player_range")
        let range_value = range_body.value

        this.object.audio.currentTime = range_value * this.object.audio.duration / 100
    },


    showMusicControllerButton: async function (id) {
        let button_list = ['player_btn_play', 'player_btn_pause']
        for (let index = 0; index < button_list.length; index++) {
            document.querySelector(`#${button_list[index]}`).classList.add("div-hide")
        }
        document.querySelector(`#${id}`).classList.remove("div-hide")
    }
    
}



export default musicFunc