import { musicModel } from '../models/music.model.js'

const musicController = {
    upload: async function (req, res) {
        let body = JSON.parse(req.body.body)

        let music = {
            album_idx: body.album_idx,
            music_title: body.music_title,
            music_filename: req.file.filename

        }

        let result = await musicModel.insert(music)

        if (result.status == 1) {
            res.status(200).json({status: 1})
        } else {
            res.status(401).json({status: -1})
        }
    },
    read: async function (req, res) {

        let music = {
            album_idx: req.params.album_idx
        }

        let result = await musicModel.select(music)

        if (result.status == 1) {
            res.status(200).json({status: 1, result: result.result })
        } else {
            res.status(401).json({status: -1})
        }
    }
}

export { musicController }