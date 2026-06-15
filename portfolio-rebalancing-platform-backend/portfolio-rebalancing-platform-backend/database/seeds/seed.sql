-- Seed data for development
-- Generated: 2026-06-14T11:33:25.011Z

-- Insert sample data for users
INSERT INTO users (id, email, password, token, user, name, success, created_at) VALUES
  ('3b8f5c1f-5eb8-4b97-aeee-96a8e50d7617', 'user1@example.com', '$2b$10$HashedPassword1', 'sample_token_1_1781436805012', '{}', 'Sample name 1', TRUE, CURRENT_TIMESTAMP),
  ('54547ef4-49c2-467f-a139-c4228f1327a6', 'user2@example.com', '$2b$10$HashedPassword2', 'sample_token_2_1781436805012', '{}', 'Sample name 2', TRUE, CURRENT_TIMESTAMP);

-- Insert sample data for dashboards
INSERT INTO dashboards (id, stats, created_at) VALUES
  ('82193f9f-ac17-49ef-90e3-a8e3d464721a', '{}', CURRENT_TIMESTAMP),
  ('f3d9084d-5862-4838-b915-f8034a33c1e7', '{}', CURRENT_TIMESTAMP);

