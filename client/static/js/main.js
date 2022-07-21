import { CardAlbum } from './components/card.js';

import Album from './classes/album.class.js';
import Music from './classes/music.class.js';

import albumFunc from './functions/album.func.js';
import musicFunc from './functions/music.func.js';

import db from './databases/control.db.js';


customElements.define('card-album', CardAlbum);

export { Album, Music }
export { albumFunc, musicFunc, db }