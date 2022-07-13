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
    select: async function () {
        try {
            await db.serialize();
            const query_select = `SELECT * FROM album`;

    
            const data = await new Promise((resolve, reject) => {
                db.all(query_select, function(err,row){
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
    }
}

export { albumModel }