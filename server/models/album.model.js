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
    },
    select: async function (album) {
        try {
            await db.serialize();
            const query_select_all = `SELECT * FROM album`;
            const query_select_idx = `SELECT * FROM album WHERE idx = ?`;
            const query_select = album.album_idx == 'all' ? query_select_all : query_select_idx
            const query_params = album.album_idx == 'all' ? [] : [album.album_idx]

    
            const data = await new Promise((resolve, reject) => {
                db.all(query_select, query_params, function(err,row){
                    let status = typeof row !== 'undefined'
                    
                    if (status == true) {
                        resolve({
                            status: status, 
                            result: row
                        })
                    } else {
                        resolve({ 
                            status: -1
                        })
                    }        
                });
            })
            return data
        } catch (error) {
            console.error(error)
            return { status: -1 }
        }
    },
    delete: async function (album) {
        try {
            await db.serialize();
    
            const query = `DELETE FROM album WHERE idx = ?`;
            const row = await db.run(query, [ album.album_idx ]);
            let status = typeof row !== 'undefined'
            
            return { status: status }
        } catch (error) {
            console.error(error)
            return { status: -1 }
        }
    },
}

export { albumModel }