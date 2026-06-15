import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', AuthController.postLogin);
router.post('/register', AuthController.postRegister);
router.post('/logout', AuthController.postLogout);
router.get('/me', AuthController.getMe);

export default router;
