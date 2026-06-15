import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import apiRoutes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';
import { generateOpenAPISpec } from './utils/openapi.js';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// HTTP logging
app.use(morgan('combined', {
  stream: { write: message => logger.info(message.trim()) }
}));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'portfolio-rebalancing-platform-frontend API Server',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      docs: '/api-docs'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api', apiRoutes);

// Swagger documentation
const openAPISpec = generateOpenAPISpec();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openAPISpec, {
  customSiteTitle: 'portfolio-rebalancing-platform-frontend API Documentation',
  customCss: '.swagger-ui .topbar { display: none }'
}));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `${req.method} ${req.path} is not a valid endpoint`,
    availableEndpoints: '/api-docs'
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
