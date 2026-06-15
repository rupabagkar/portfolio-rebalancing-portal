import pg from 'pg';
const { Pool } = pg;
import { logger } from '../utils/logger.js';

// Create pool lazily to ensure dotenv has loaded first
let pool;

function getPool() {
  if (!pool) {
    pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on('error', (err) => {
      logger.error('Unexpected database error:', err);
      process.exit(-1);
    });
  }
  return pool;
}

export async function connectDatabase() {
  try {
    const dbPool = getPool();
    const client = await dbPool.connect();
    const res = await client.query('SELECT NOW()');
    client.release();
    logger.info('Database connection verified at:', res.rows[0].now);
    return dbPool;
  } catch (error) {
    logger.error('Database connection failed:', error);
    throw error;
  }
}

export const db = getPool();
