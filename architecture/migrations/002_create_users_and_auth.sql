-- Migration: 002_create_users_and_auth.sql
-- Description: User management, authentication, and RBAC
-- Depends On: 001_create_tiers_and_tenants.sql
-- Author: Database Architect
-- Date: March 15, 2026

-- ============================================
-- USERS (platform users within tenants)
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'member'
        CHECK (role IN ('owner', 'admin', 'compliance_officer', 'auditor', 'member')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('active', 'pending', 'suspended', 'inactive')),
    
    -- Login tracking
    last_login_at TIMESTAMPTZ,
    failed_login_attempts INTEGER NOT NULL DEFAULT 0,
    locked_until TIMESTAMPTZ,
    
    -- MFA
    mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    mfa_secret_encrypted TEXT,
    mfa_backup_codes_encrypted TEXT[],
    
    -- Password security
    password_changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    password_history TEXT[], -- Store last 5 password hashes
    
    -- Invitation flow
    invitation_token VARCHAR(255),
    invitation_expires_at TIMESTAMPTZ,
    invited_by UUID REFERENCES users(id),
    
    -- Profile
    job_title VARCHAR(100),
    department VARCHAR(100),
    phone VARCHAR(50),
    timezone VARCHAR(50) DEFAULT 'Europe/Paris',
    language VARCHAR(10) DEFAULT 'en',
    
    -- Notifications
    email_notifications_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    weekly_digest_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    UNIQUE(tenant_id, email),
    CONSTRAINT valid_user CHECK (email <> '' AND first_name <> ''),
    CONSTRAINT valid_email CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Indexes for user queries
CREATE INDEX idx_users_tenant ON users(tenant_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_invitation ON users(invitation_token) WHERE invitation_token IS NOT NULL;
CREATE INDEX idx_users_status ON users(tenant_id, status) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_role ON users(tenant_id, role) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_login ON users(last_login_at) WHERE deleted_at IS NULL;

COMMENT ON TABLE users IS 'Platform users with RBAC within tenant context';
COMMENT ON COLUMN users.role IS 'owner=full access, admin=most access, compliance_officer=compliance tasks, auditor=read-only audit, member=standard user';
COMMENT ON COLUMN users.password_history IS 'Store bcrypt hashes of last 5 passwords to prevent reuse';

-- ============================================
-- API KEYS (service-to-service authentication)
-- ============================================
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    name VARCHAR(100) NOT NULL,
    description TEXT,
    key_prefix VARCHAR(8) NOT NULL, -- First 8 chars of key for display (e.g., 'cf_live_')
    key_hash VARCHAR(255) NOT NULL, -- bcrypt hash of full key
    
    -- Scopes (RBAC for API)
    scopes TEXT[] NOT NULL DEFAULT '{}',
    
    -- Rate limiting
    rate_limit_override INTEGER, -- NULL = use tier default
    
    -- Status
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_used_at TIMESTAMPTZ,
    usage_count INTEGER NOT NULL DEFAULT 0,
    expires_at TIMESTAMPTZ,
    
    -- Audit
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    revoked_at TIMESTAMPTZ,
    revoked_by UUID REFERENCES users(id),
    revoked_reason TEXT
);

CREATE INDEX idx_api_keys_tenant ON api_keys(tenant_id) WHERE is_active = TRUE;
CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);
CREATE INDEX idx_api_keys_prefix ON api_keys(key_prefix);
CREATE INDEX idx_api_keys_expires ON api_keys(expires_at) WHERE expires_at IS NOT NULL;

COMMENT ON TABLE api_keys IS 'Service-to-service authentication with scoped permissions';
COMMENT ON COLUMN api_key.scopes IS 'Array of permission scopes like ["evidence:read", "policy:write"]';

-- ============================================
-- USER SESSIONS (for session management)
-- ============================================
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    -- Session metadata
    session_token_hash VARCHAR(255) NOT NULL, -- SHA-256 of session token
    ip_address INET,
    user_agent TEXT,
    
    -- MFA state
    mfa_verified BOOLEAN NOT NULL DEFAULT FALSE,
    mfa_verified_at TIMESTAMPTZ,
    
    -- Session lifecycle
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    ended_at TIMESTAMPTZ,
    ended_reason VARCHAR(50), -- 'logout', 'expired', 'revoked', 'security'
    
    UNIQUE(session_token_hash)
);

CREATE INDEX idx_sessions_user ON user_sessions(user_id, started_at DESC);
CREATE INDEX idx_sessions_active ON user_sessions(user_id) WHERE ended_at IS NULL;
CREATE INDEX idx_sessions_expires ON user_sessions(expires_at) WHERE ended_at IS NULL;

COMMENT ON TABLE user_sessions IS 'Active user sessions for authentication tracking';
COMMENT ON COLUMN user_sessions.session_token_hash IS 'SHA-256 hash of the actual session token (token stored in Redis)';

-- ============================================
-- PASSWORD RESET TOKENS
-- ============================================
CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL, -- bcrypt hash
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT,
    
    UNIQUE(token_hash)
);

CREATE INDEX idx_reset_tokens_user ON password_reset_tokens(user_id, created_at DESC);
CREATE INDEX idx_reset_tokens_expires ON password_reset_tokens(expires_at) WHERE used_at IS NULL;

COMMENT ON TABLE password_reset_tokens IS 'Secure password reset flow with one-time tokens';

-- ============================================
-- USER ACTIVITY LOG (for security monitoring)
-- ============================================
CREATE TABLE user_activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    activity_type VARCHAR(50) NOT NULL 
        CHECK (activity_type IN ('login', 'logout', 'password_change', 'mfa_enabled', 'mfa_disabled', 
                                 'api_key_created', 'api_key_revoked', 'invitation_accepted',
                                 'account_locked', 'account_unlocked', 'suspicious_activity')),
    
    details JSONB, -- Flexible metadata
    ip_address INET,
    user_agent TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_activity_user ON user_activity_log(user_id, created_at DESC);
CREATE INDEX idx_activity_tenant ON user_activity_log(tenant_id, created_at DESC);
CREATE INDEX idx_activity_type ON user_activity_log(activity_type, created_at DESC);

COMMENT ON TABLE user_activity_log IS 'Security-sensitive user activities for compliance auditing';

-- ============================================
-- TRIGGERS AND FUNCTIONS
-- ============================================

-- Update timestamps
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update subscription user count when users change
CREATE OR REPLACE FUNCTION update_subscription_user_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.status = 'active' AND NEW.deleted_at IS NULL THEN
        UPDATE subscriptions 
        SET current_user_count = current_user_count + 1,
            updated_at = NOW()
        WHERE tenant_id = NEW.tenant_id;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Handle status changes
        IF OLD.status != 'active' AND NEW.status = 'active' AND NEW.deleted_at IS NULL THEN
            UPDATE subscriptions 
            SET current_user_count = current_user_count + 1,
                updated_at = NOW()
            WHERE tenant_id = NEW.tenant_id;
        ELSIF OLD.status = 'active' AND (NEW.status != 'active' OR NEW.deleted_at IS NOT NULL) THEN
            UPDATE subscriptions 
            SET current_user_count = GREATEST(current_user_count - 1, 0),
                updated_at = NOW()
            WHERE tenant_id = NEW.tenant_id;
        END IF;
    ELSIF TG_OP = 'DELETE' OR (TG_OP = 'UPDATE' AND NEW.deleted_at IS NOT NULL AND OLD.deleted_at IS NULL) THEN
        UPDATE subscriptions 
        SET current_user_count = GREATEST(current_user_count - 1, 0),
            updated_at = NOW()
        WHERE tenant_id = OLD.tenant_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_subscription_user_count_trigger
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION update_subscription_user_count();

-- Lock account after failed login attempts
CREATE OR REPLACE FUNCTION check_account_lock()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.failed_login_attempts >= 5 THEN
        NEW.locked_until := NOW() + INTERVAL '30 minutes';
        
        -- Log the lock event
        INSERT INTO user_activity_log (user_id, tenant_id, activity_type, details, created_at)
        VALUES (NEW.id, NEW.tenant_id, 'account_locked', 
                jsonb_build_object('failed_attempts', NEW.failed_login_attempts),
                NOW());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_account_lock_trigger
    BEFORE UPDATE ON users
    FOR EACH ROW 
    WHEN (NEW.failed_login_attempts > OLD.failed_login_attempts)
    EXECUTE FUNCTION check_account_lock();
