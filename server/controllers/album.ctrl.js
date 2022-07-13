import { albumModel } from '../models/album.model.js'

const albumController = {
    create: async function (req, res) {
        let album = {
            album_title: req.body.album_title,
            album_text: req.body.album_text,
            album_image: req.body.album_image
        }

        let result = await albumModel.insert(album)

        if (result.status == 1) {
            res.status(200).json({status: 1})
        } else {
            res.status(401).json({status: -1})
        }
    },
    read: async function (req, res) {
        let result = await albumModel.select()

        if (result.status == 1) {
            res.status(200).json({status: 1, result: result.result})
        } else {
            res.status(401).json({status: -1})
        }
    }
}

export { albumController }