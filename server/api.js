import { Router } from 'express';
const router = Router();

import album from './routes/album.js';
import music from './routes/music.js';

router.use('/album', album);
router.use('/music', music);

export default router;