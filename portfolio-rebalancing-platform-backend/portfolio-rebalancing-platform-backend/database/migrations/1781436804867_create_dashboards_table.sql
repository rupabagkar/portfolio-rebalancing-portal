-- ================================================
-- Table: dashboards
-- Generated: 2026-06-14T11:33:24.876Z
-- ================================================

CREATE TABLE IF NOT EXISTS dashboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stats JSONB -- stats field,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- Table comment
COMMENT ON TABLE dashboards IS 'Auto-generated from API contracts';
