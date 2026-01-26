-- ============================================================================
-- Client Authentication Schema - Magic Link System
-- Light Brand Consulting
-- ============================================================================

-- Magic Link Tokens Table
CREATE TABLE IF NOT EXISTS client_magic_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  token UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_magic_links_token ON client_magic_links(token);
CREATE INDEX IF NOT EXISTS idx_client_magic_links_email ON client_magic_links(email);
CREATE INDEX IF NOT EXISTS idx_client_magic_links_expires_at ON client_magic_links(expires_at);

COMMENT ON TABLE client_magic_links IS
'Magic link tokens for client portal authentication. Tokens expire after 15 minutes.';

-- Client Sessions Table
CREATE TABLE IF NOT EXISTS client_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  session_token UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_sessions_token ON client_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_client_sessions_email ON client_sessions(email);
CREATE INDEX IF NOT EXISTS idx_client_sessions_expires_at ON client_sessions(expires_at);

COMMENT ON TABLE client_sessions IS
'Active client sessions. Sessions expire after 30 days of inactivity.';

-- Row Level Security
ALTER TABLE client_magic_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_sessions ENABLE ROW LEVEL SECURITY;

-- Public can insert magic links (for requesting access)
DROP POLICY IF EXISTS "Public can request magic links" ON client_magic_links;
CREATE POLICY "Public can request magic links"
  ON client_magic_links FOR INSERT
  WITH CHECK (true);

-- Public can verify magic links
DROP POLICY IF EXISTS "Public can verify magic links" ON client_magic_links;
CREATE POLICY "Public can verify magic links"
  ON client_magic_links FOR SELECT
  USING (true);

-- Public can update magic links (mark as used)
DROP POLICY IF EXISTS "Public can use magic links" ON client_magic_links;
CREATE POLICY "Public can use magic links"
  ON client_magic_links FOR UPDATE
  USING (true);

-- Session policies
DROP POLICY IF EXISTS "Public can create sessions" ON client_sessions;
CREATE POLICY "Public can create sessions"
  ON client_sessions FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can read sessions" ON client_sessions;
CREATE POLICY "Public can read sessions"
  ON client_sessions FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public can update sessions" ON client_sessions;
CREATE POLICY "Public can update sessions"
  ON client_sessions FOR UPDATE
  USING (true);

-- Cleanup function for expired tokens and sessions
CREATE OR REPLACE FUNCTION cleanup_expired_client_auth()
RETURNS void AS $$
BEGIN
  -- Delete expired magic links
  DELETE FROM client_magic_links
  WHERE expires_at < NOW() OR used_at IS NOT NULL;

  -- Delete expired sessions
  DELETE FROM client_sessions
  WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION cleanup_expired_client_auth IS
'Cleanup function to remove expired magic links and sessions. Should be run periodically.';
