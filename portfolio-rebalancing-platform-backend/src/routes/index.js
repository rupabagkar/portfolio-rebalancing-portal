import express from 'express';
import auditRoutes from './audit.routes.js';
import proposalsRoutes from './proposals.routes.js';
import clientsRoutes from './clients.routes.js';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import dashboardRoutes from './dashboard.routes.js';

const router = express.Router();

// Health check
router.use('/health', healthRoutes);

  router.use('/auth', authRoutes);
  router.use('/dashboard', dashboardRoutes);

router.use('/clients', clientsRoutes);

router.use('/proposals', proposalsRoutes);

router.use('/audit', auditRoutes);

export default router;
