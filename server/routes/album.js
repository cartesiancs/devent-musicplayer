import { Router } from 'express';
const router = Router();

import { albumController } from '../controllers/album.ctrl.js';


router.post('/', albumController.create);
router.get('/', albumController.read);
router.get('/:idx', albumController.read);
router.delete('/:idx', albumController.delete);


export default router;