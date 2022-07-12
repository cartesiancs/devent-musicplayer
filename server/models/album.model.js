import { db } from '../databases/connect.js'

const albumModel = {
    insert: async function (album) {
        try {
            await db.serialize();
    
            const query = `REPLACE INTO album(album_title, album_text, album_image) VALUES(?, ?, ?)`;
            const row = await db.run(query, [ album.album_title, album.album_text, album.album_image ]);
            let status = typeof row !== 'undefined'
            
            return { status: status }
        } catch (error) {
            console.error(error)
            return { status: -1 }
        }
    }
}

export { albumModel }