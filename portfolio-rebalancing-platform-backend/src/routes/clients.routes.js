import express from 'express';
import { ClientsController } from '../controllers/clients.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/rebalancing-status', ClientsController.getRebalancingStatus);

export default router;
