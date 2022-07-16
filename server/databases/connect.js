import sqlite3 from 'sqlite3';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db_dir = path.join(__dirname, "data/dmpdb.db");
const conn = sqlite3.verbose()

const db = new conn.Database(db_dir, async (error) => {
    if (error) {
        console.error(error)
    }
}); 

const sql_album = `create table IF NOT EXISTS album (
	idx integer primary key autoincrement, 
    album_title text, 
	album_text text, 
	album_image text
);`;

db.run(sql_album, (error) => {
    if( error ) {
        return console.error(error)
    }
    console.log('info', 'album table');
});


const sql_music = `create table IF NOT EXISTS music (
	idx integer primary key autoincrement, 
    album_idx integer, 
	music_title text, 
	music_filename text
);`;

db.run(sql_music, (error) => {
    if( error ) {
        return console.error(error)
    }
    console.log('info', 'music table');
});

export { db }
