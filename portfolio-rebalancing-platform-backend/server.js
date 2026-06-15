import dotenv from 'dotenv';
import net from 'net';
import app from './src/app.js';
import { logger } from './src/utils/logger.js';
import { connectDatabase } from './src/config/database.js';

// Load environment variables
dotenv.config();

const DEFAULT_PORT = process.env.PORT || 3000;
const MAX_PORT_ATTEMPTS = 10;

// Check if a port is available
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false); // Port is busy
      } else {
        resolve(false); // Other error, consider port unavailable
      }
    });
    
    server.once('listening', () => {
      server.close();
      resolve(true); // Port is available
    });
    
    // Listen on all interfaces (same as Express) to properly detect conflicts
    server.listen(port);
  });
}

// Try to find an available port starting from DEFAULT_PORT
async function findAvailablePort(startPort) {
  for (let port = startPort; port < startPort + MAX_PORT_ATTEMPTS; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available ports found between ${startPort} and ${startPort + MAX_PORT_ATTEMPTS - 1}`);
}

// Initialize server
async function startServer() {
  try {
    
    // Try to connect to database (optional - server starts even if DB fails)
    try {
      await connectDatabase();
      logger.info('✓ Database connected successfully');
    } catch (dbError) {
      logger.warn('⚠ Database connection failed - server starting without DB:', dbError.message);
      logger.warn('⚠ Database-dependent routes will not work until DB is configured');
    }
    

    // Find available port
    const PORT = await findAvailablePort(DEFAULT_PORT);
    
    if (PORT !== DEFAULT_PORT) {
      logger.warn(`⚠ Port ${DEFAULT_PORT} is busy, using port ${PORT} instead`);
    }

    // Write port to file for frontend to discover
    const fs = await import('fs');
    const path = await import('path');
    const portFilePath = path.join(process.cwd(), '.port');
    fs.writeFileSync(portFilePath, PORT.toString(), 'utf8');

    // Start Express server
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`);
      logger.info(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
      logger.info(`🏥 Health Check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle uncaught errors
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Start the server
startServer();
