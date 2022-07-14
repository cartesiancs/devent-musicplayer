import { db } from '../databases/connect.js'

const musicModel = {
    insert: async function (music) {
        try {
            await db.serialize();
    
            const query = `REPLACE INTO music(album_idx, music_title, music_filename) VALUES(?, ?, ?)`;
            const row = await db.run(query, [ music.album_idx, music.music_title, music.music_filename ]);
            let status = typeof row !== 'undefined'
            
            return { status: status }
        } catch (error) {
            console.error(error)
            return { status: -1 }
        }
    },
    select: async function (music) {
        try {
            const query_select_idx = `SELECT * FROM music WHERE album_idx = ?`;

    
            const data = await new Promise((resolve, reject) => {
                db.all(query_select_idx, [ music.album_idx ], function(err,row){
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

export { musicModel }