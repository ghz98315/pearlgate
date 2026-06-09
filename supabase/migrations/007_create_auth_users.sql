-- =============================================
-- PearlGate Auth Users
-- 取代 data/users.json,bcrypt 哈希存储
-- =============================================

CREATE TABLE IF NOT EXISTS auth_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- 邮箱(强制小写、唯一,作为登录键)
  email TEXT UNIQUE NOT NULL,

  -- bcrypt 哈希(2y/2b 格式),不存储明文
  password_hash TEXT NOT NULL,

  -- 显示名
  name TEXT NOT NULL,

  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,

  -- 约束:email 形如 a@b.c
  CONSTRAINT valid_email CHECK (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$')
);

CREATE INDEX IF NOT EXISTS idx_auth_users_email ON auth_users(email);

-- 触发器:维护 updated_at
DROP TRIGGER IF EXISTS trg_auth_users_updated_at ON auth_users;
CREATE TRIGGER trg_auth_users_updated_at
BEFORE UPDATE ON auth_users
FOR EACH ROW
EXECUTE FUNCTION update_leads_updated_at();

COMMENT ON TABLE auth_users IS 'Site registration users (email/password). Replaces data/users.json. Passwords are bcrypt-hashed.';
COMMENT ON COLUMN auth_users.password_hash IS 'bcrypt hash, never plaintext';
