import express from 'express';
import { AuditController } from '../controllers/audit.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/logs', AuditController.getLogs);

export default router;
