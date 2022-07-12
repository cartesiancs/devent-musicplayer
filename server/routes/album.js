import { Router } from 'express';
const router = Router();

import { albumController } from '../controllers/album.ctrl.js';


router.post('/', albumController.create);


export default router;