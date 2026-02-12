import { Router } from 'express';

import * as ApiController from '../controllers/apiController';
import { Auth } from '../middlewares/authMiddle';

const router = Router();

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);

router.get('/list', Auth.private ,ApiController.list);

export default router;