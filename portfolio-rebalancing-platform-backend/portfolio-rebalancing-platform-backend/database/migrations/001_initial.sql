-- Auto-generated postgresql schema with rich metadata
-- Generated from 6 API contracts
-- Project: portfolio-rebalancing-platform-frontend
-- Date: 2026-06-14T11:33:25.382Z
-- Features: Foreign keys, indexes, constraints, comments

-- ════════════════════════════════════════════════════════════════════════
-- Database Schema
-- ════════════════════════════════════════════════════════════════════════

-- ═══ Table: users ═══
-- Purpose: User authentication and account management
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY COMMENT 'Primary key',
  created_at TIMESTAMP DEFAULT NOW() COMMENT 'Record creation timestamp',
  updated_at TIMESTAMP DEFAULT NOW()  COMMENT 'Record update timestamp'
);

COMMENT ON TABLE users IS 'User authentication and account management';


-- ═══ Table: dashboard ═══
-- Purpose: Dashboard data
CREATE TABLE IF NOT EXISTS dashboard (
  id SERIAL PRIMARY KEY COMMENT 'Primary key',
  created_at TIMESTAMP DEFAULT NOW() COMMENT 'Record creation timestamp',
  updated_at TIMESTAMP DEFAULT NOW()  COMMENT 'Record update timestamp'
);

COMMENT ON TABLE dashboard IS 'Dashboard data';


-- ═══ Table: health ═══
-- Purpose: Health data
CREATE TABLE IF NOT EXISTS health (
  id SERIAL PRIMARY KEY COMMENT 'Primary key',
  created_at TIMESTAMP DEFAULT NOW() COMMENT 'Record creation timestamp',
  updated_at TIMESTAMP DEFAULT NOW()  COMMENT 'Record update timestamp'
);

COMMENT ON TABLE health IS 'Health data';


-- ════════════════════════════════════════════════════════════════════════
-- Schema Summary: 3 tables created
-- Total columns: 0
-- Total indexes: 0
-- Total foreign keys: 0
-- ════════════════════════════════════════════════════════════════════════