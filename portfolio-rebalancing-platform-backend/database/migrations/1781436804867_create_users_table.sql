-- ================================================
-- Table: users
-- Generated: 2026-06-14T11:33:24.871Z
-- ================================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE -- User email address,
  password VARCHAR(255) -- User password,
  token VARCHAR(255) -- Authentication token,
  user JSONB -- user field,
  name VARCHAR(255) NOT NULL -- name of the entity,
  success BOOLEAN DEFAULT TRUE -- Operation success status,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);


-- Table comment
COMMENT ON TABLE users IS 'Auto-generated from API contracts';
