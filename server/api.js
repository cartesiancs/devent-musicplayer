import { Router } from 'express';
const router = Router();

import album from './routes/album.js';

router.use('/album', album);

export default router;