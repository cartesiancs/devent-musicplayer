import { Router } from 'express';
const router = Router();

import { musicController } from '../controllers/music.ctrl.js';
import { upload } from '../middlewares/upload.js';


router.post('/', upload, musicController.upload);
router.get('/:album_idx', musicController.read);


export default router;