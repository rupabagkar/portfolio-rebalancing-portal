import express from 'express';
import { DashboardController } from '../controllers/dashboard.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', DashboardController.getStats);

export default router;
