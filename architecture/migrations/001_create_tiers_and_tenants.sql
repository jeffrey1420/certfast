-- Migration: 001_create_tiers_and_tenants.sql
-- Description: Core tenant structure and pricing tiers
-- Author: Database Architect
-- Date: March 15, 2026

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PRICING TIERS (seed data - no dependencies)
-- ============================================
CREATE TABLE tiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    description TEXT,
    monthly_price_cents INTEGER NOT NULL,
    annual_price_cents INTEGER NOT NULL,
    
    -- Feature limits
    max_users INTEGER NOT NULL,
    max_integrations INTEGER NOT NULL,
    max_frameworks INTEGER,
    max_evidence_files INTEGER,
    evidence_retention_days INTEGER NOT NULL,
    
    -- Feature flags
    has_api_access BOOLEAN NOT NULL DEFAULT FALSE,
    has_custom_frameworks BOOLEAN NOT NULL DEFAULT FALSE,
    has_advanced_reporting BOOLEAN NOT NULL DEFAULT FALSE,
    has_dedicated_support BOOLEAN NOT NULL DEFAULT FALSE,
    has_audit_collaboration BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Rate limits
    api_requests_per_hour INTEGER NOT NULL DEFAULT 100,
    
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed data for tiers matching business model
INSERT INTO tiers (name, code, monthly_price_cents, annual_price_cents, max_users, 
    max_integrations, max_frameworks, evidence_retention_days, api_requests_per_hour,
    has_api_access, has_custom_frameworks, has_advanced_reporting, has_dedicated_support, 
    has_audit_collaboration, display_order)
VALUES 
    ('Lite', 'lite', 19900, 199000, 5, 10, 1, 365, 100, FALSE, FALSE, FALSE, FALSE, FALSE, 1),
    ('Starter', 'starter', 49900, 499000, 15, 25, 2, 1095, 500, TRUE, FALSE, FALSE, FALSE, FALSE, 2),
    ('Pro', 'pro', 99900, 999000, 50, 100, NULL, 2555, 2000, TRUE, TRUE, TRUE, FALSE, TRUE, 3),
    ('Enterprise', 'enterprise', 0, 0, NULL, NULL, NULL, NULL, 10000, TRUE, TRUE, TRUE, TRUE, TRUE, 4);

COMMENT ON TABLE tiers IS 'Pricing tiers with feature limits and flags';
COMMENT ON COLUMN tiers.max_users IS 'NULL means unlimited (Enterprise)';
COMMENT ON COLUMN tiers.max_frameworks IS 'NULL means unlimited';

-- ============================================
-- TENANTS (multi-tenant root entity)
-- ============================================
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active' 
        CHECK (status IN ('active', 'suspended', 'cancelled')),
    tier_id UUID NOT NULL REFERENCES tiers(id),
    billing_email VARCHAR(255) NOT NULL,
    technical_contact_email VARCHAR(255),
    company_size VARCHAR(20) CHECK (company_size IN ('1-15', '15-50', '50-100', '100+')),
    industry VARCHAR(100),
    timezone VARCHAR(50) DEFAULT 'Europe/Paris',
    data_region VARCHAR(20) NOT NULL DEFAULT 'eu-west-1' 
        CHECK (data_region IN ('eu-west-1', 'eu-central-1')),
    gdpr_compliant BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    CONSTRAINT valid_tenant CHECK (name <> '' AND slug <> ''),
    CONSTRAINT valid_billing_email CHECK (billing_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Indexes for tenant queries
CREATE INDEX idx_tenants_status ON tenants(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_tenants_tier ON tenants(tier_id);
CREATE INDEX idx_tenants_slug ON tenants(slug) WHERE deleted_at IS NULL;

COMMENT ON TABLE tenants IS 'Multi-tenant root entity - each customer organization';
COMMENT ON COLUMN tenants.deleted_at IS 'Soft delete for GDPR right to deletion';
COMMENT ON COLUMN tenants.data_region IS 'EU data residency for GDPR compliance';

-- ============================================
-- SUBSCRIPTIONS (tenant billing state)
-- ============================================
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL UNIQUE REFERENCES tenants(id) ON DELETE CASCADE,
    tier_id UUID NOT NULL REFERENCES tiers(id),
    
    -- Billing
    billing_cycle VARCHAR(20) NOT NULL CHECK (billing_cycle IN ('monthly', 'annual')),
    status VARCHAR(20) NOT NULL DEFAULT 'trialing'
        CHECK (status IN ('trialing', 'active', 'past_due', 'cancelled', 'expired')),
    
    -- Stripe integration
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    
    -- Timing
    trial_ends_at TIMESTAMPTZ,
    current_period_started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    current_period_ends_at TIMESTAMPTZ NOT NULL,
    cancelled_at TIMESTAMPTZ,
    
    -- Usage tracking (enforced by triggers)
    current_user_count INTEGER NOT NULL DEFAULT 0,
    current_integration_count INTEGER NOT NULL DEFAULT 0,
    current_evidence_count INTEGER NOT NULL DEFAULT 0,
    storage_bytes_used BIGINT NOT NULL DEFAULT 0,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_period_end ON subscriptions(current_period_ends_at);
CREATE INDEX idx_subscriptions_trial ON subscriptions(trial_ends_at) WHERE status = 'trialing';

COMMENT ON TABLE subscriptions IS 'Tenant subscription tracking and billing state';
COMMENT ON COLUMN subscriptions.current_user_count IS 'Cached count for tier limit enforcement';

-- Update function for timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_tiers_updated_at BEFORE UPDATE ON tiers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
