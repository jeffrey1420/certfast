-- Migration: 005_create_integrations_and_webhooks.sql
-- Description: Third-party integrations and webhook infrastructure
-- Depends On: 004_create_evidence_and_policies.sql
-- Author: Database Architect
-- Date: March 15, 2026

-- ============================================
-- INTEGRATIONS (third-party service connections)
-- ============================================
CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    -- Integration type
    provider VARCHAR(50) NOT NULL 
        CHECK (provider IN ('github', 'gitlab', 'bitbucket', 'aws', 'azure', 'gcp', 
                           'slack', 'teams', 'okta', 'onelogin', 'jira', 'linear',
                           'datadog', 'sentry', 'snyk', 'crowdstrike', 'wiz', 'qualys',
                           'pagerduty', 'opsgenie', 'sumologic', 'splunk')),
    
    -- Display name (user-configurable)
    name VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Connection details (encrypted at application layer)
    connection_config_encrypted JSONB NOT NULL DEFAULT '{}',
    -- Example: {"api_key": "base64_encrypted", "webhook_secret": "base64_encrypted"}
    
    -- OAuth tokens (encrypted)
    oauth_access_token_encrypted TEXT,
    oauth_refresh_token_encrypted TEXT,
    oauth_token_expires_at TIMESTAMPTZ,
    oauth_scopes TEXT[],
    
    -- Status
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'connected', 'error', 'disconnected', 'degraded')),
    last_synced_at TIMESTAMPTZ,
    last_error_at TIMESTAMPTZ,
    last_error_message TEXT,
    error_count INTEGER NOT NULL DEFAULT 0,
    
    -- Health check
    health_status VARCHAR(20) CHECK (health_status IN ('healthy', 'warning', 'critical')),
    last_health_check_at TIMESTAMPTZ,
    
    -- Scopes/permissions granted
    scopes TEXT[],
    
    -- Webhook configuration (for providers that support inbound webhooks)
    webhook_url_path VARCHAR(100), -- Unique path for this integration's webhooks
    webhook_secret_encrypted TEXT,
    webhook_events TEXT[], -- Events subscribed to
    
    -- Automation settings
    auto_collect_evidence BOOLEAN NOT NULL DEFAULT TRUE,
    evidence_types_enabled TEXT[], -- Which evidence types this integration provides
    
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_integrations_tenant ON integrations(tenant_id);
CREATE INDEX idx_integrations_provider ON integrations(provider);
CREATE INDEX idx_integrations_status ON integrations(status);
CREATE INDEX idx_integrations_scopes ON integrations USING GIN(scopes);
CREATE INDEX idx_integrations_webhook ON integrations(webhook_url_path) WHERE webhook_url_path IS NOT NULL;

COMMENT ON TABLE integrations IS 'Third-party service connections for automated evidence collection';
COMMENT ON COLUMN integrations.connection_config_encrypted IS 'Application-encrypted credentials (never store plaintext)';
COMMENT ON COLUMN integrations.webhook_url_path IS 'Unique URL path for receiving webhooks from this provider';

-- ============================================
-- INTEGRATION SYNC LOGS (audit trail)
-- ============================================
CREATE TABLE integration_sync_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    integration_id UUID NOT NULL REFERENCES integrations(id) ON DELETE CASCADE,
    
    sync_type VARCHAR(50) NOT NULL, -- e.g., 'evidence_collection', 'user_sync', 'compliance_check'
    status VARCHAR(20) NOT NULL CHECK (status IN ('success', 'partial', 'failure', 'in_progress')),
    
    -- Record counts
    records_processed INTEGER NOT NULL DEFAULT 0,
    records_created INTEGER NOT NULL DEFAULT 0,
    records_updated INTEGER NOT NULL DEFAULT 0,
    records_failed INTEGER NOT NULL DEFAULT 0,
    records_skipped INTEGER NOT NULL DEFAULT 0,
    
    -- Details
    details JSONB, -- Flexible metadata about the sync
    error_details JSONB, -- Array of error objects
    
    -- Timing
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    duration_ms INTEGER, -- Calculated duration
    
    -- Rate limit tracking
    rate_limit_remaining INTEGER,
    rate_limit_reset_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sync_logs_integration ON integration_sync_logs(integration_id);
CREATE INDEX idx_sync_logs_tenant_time ON integration_sync_logs(tenant_id, created_at DESC);
CREATE INDEX idx_sync_logs_status ON integration_sync_logs(status);
CREATE INDEX idx_sync_logs_type ON integration_sync_logs(sync_type);

COMMENT ON TABLE integration_sync_logs IS 'Audit trail for all integration data sync operations';

-- ============================================
-- AUTOMATED EVIDENCE COLLECTIONS
-- ============================================
CREATE TABLE automated_evidence_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    integration_id UUID NOT NULL REFERENCES integrations(id) ON DELETE CASCADE,
    control_implementation_id UUID NOT NULL REFERENCES control_implementations(id) ON DELETE CASCADE,
    
    -- Collection configuration
    collection_type VARCHAR(50) NOT NULL, -- e.g., 'snyk_vulnerabilities', 'datadog_monitors', 'github_access_logs'
    collection_config JSONB NOT NULL DEFAULT '{}', -- Provider-specific config
    
    -- Schedule
    schedule_type VARCHAR(20) NOT NULL DEFAULT 'manual'
        CHECK (schedule_type IN ('manual', 'hourly', 'daily', 'weekly')),
    
    -- Status
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_run_at TIMESTAMPTZ,
    next_run_at TIMESTAMPTZ,
    
    -- Results
    last_run_status VARCHAR(20) CHECK (last_run_status IN ('success', 'failure', 'no_data')),
    last_evidence_file_id UUID REFERENCES evidence_files(id),
    
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_auto_evidence_integration ON automated_evidence_collections(integration_id);
CREATE INDEX idx_auto_evidence_control ON automated_evidence_collections(control_implementation_id);
CREATE INDEX idx_auto_evidence_schedule ON automated_evidence_collections(next_run_at) 
    WHERE is_active = TRUE AND schedule_type != 'manual';

COMMENT ON TABLE automated_evidence_collections IS 'Configuration for automated evidence collection from integrations';

-- ============================================
-- WEBHOOKS (outgoing webhooks)
-- ============================================
CREATE TABLE webhooks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    name VARCHAR(100) NOT NULL,
    url VARCHAR(500) NOT NULL,
    description TEXT,
    
    -- Security
    secret_encrypted TEXT NOT NULL, -- For HMAC signature verification
    signature_algorithm VARCHAR(20) NOT NULL DEFAULT 'sha256' 
        CHECK (signature_algorithm IN ('sha256', 'sha512')),
    
    -- Event subscription
    events TEXT[] NOT NULL, -- e.g., ['compliance.assessment.completed', 'evidence.created']
    
    -- Status
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Delivery stats
    total_deliveries INTEGER NOT NULL DEFAULT 0,
    successful_deliveries INTEGER NOT NULL DEFAULT 0,
    failed_deliveries INTEGER NOT NULL DEFAULT 0,
    
    last_delivered_at TIMESTAMPTZ,
    last_delivery_status INTEGER, -- HTTP status code
    last_delivery_duration_ms INTEGER,
    
    failure_count INTEGER NOT NULL DEFAULT 0,
    disabled_at TIMESTAMPTZ, -- Auto-disabled after too many failures
    
    -- Retry configuration
    max_retries INTEGER NOT NULL DEFAULT 3,
    retry_interval_seconds INTEGER NOT NULL DEFAULT 60,
    
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_webhooks_tenant ON webhooks(tenant_id) WHERE is_active = TRUE;
CREATE INDEX idx_webhooks_events ON webhooks USING GIN(events);
CREATE INDEX idx_webhooks_disabled ON webhooks(disabled_at) WHERE disabled_at IS NOT NULL;

COMMENT ON TABLE webhooks IS 'Outgoing webhook configuration for event notifications';
COMMENT ON COLUMN webhooks.secret_encrypted IS 'Shared secret for HMAC signature verification';

-- ============================================
-- WEBHOOK DELIVERY LOGS
-- ============================================
CREATE TABLE webhook_delivery_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    webhook_id UUID NOT NULL REFERENCES webhooks(id) ON DELETE CASCADE,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    event_type VARCHAR(100) NOT NULL,
    event_id UUID NOT NULL, -- ID of the entity that triggered the event
    payload JSONB NOT NULL,
    payload_size_bytes INTEGER,
    
    -- Delivery attempt
    attempt_number INTEGER NOT NULL DEFAULT 1,
    
    -- Request/Response
    request_headers JSONB,
    response_status INTEGER,
    response_headers JSONB,
    response_body TEXT,
    response_time_ms INTEGER,
    
    -- Result
    success BOOLEAN NOT NULL,
    error_message TEXT,
    will_retry BOOLEAN NOT NULL DEFAULT FALSE,
    
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_webhook_logs_webhook ON webhook_delivery_logs(webhook_id, created_at DESC);
CREATE INDEX idx_webhook_logs_event ON webhook_delivery_logs(event_type, created_at DESC);
CREATE INDEX idx_webhook_logs_success ON webhook_delivery_logs(success) WHERE success = FALSE;

COMMENT ON TABLE webhook_delivery_logs IS 'Detailed log of all webhook delivery attempts';

-- ============================================
-- INCOMING WEBHOOK EVENTS (from third parties)
-- ============================================
CREATE TABLE incoming_webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    integration_id UUID NOT NULL REFERENCES integrations(id) ON DELETE CASCADE,
    
    -- Event details
    provider VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    external_event_id VARCHAR(255), -- Provider's event ID
    
    -- Payload (raw)
    payload JSONB NOT NULL,
    headers JSONB,
    
    -- Signature verification
    signature_valid BOOLEAN,
    signature_algorithm VARCHAR(20),
    
    -- Processing
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'processing', 'processed', 'failed', 'ignored')),
    processed_at TIMESTAMPTZ,
    processed_by_worker VARCHAR(100),
    processing_duration_ms INTEGER,
    error_message TEXT,
    
    -- Results (what we did with it)
    evidence_created_id UUID REFERENCES evidence_files(id),
    
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_incoming_webhooks_integration ON incoming_webhook_events(integration_id);
CREATE INDEX idx_incoming_webhooks_status ON incoming_webhook_events(status) WHERE status IN ('pending', 'failed');
CREATE INDEX idx_incoming_webhooks_received ON incoming_webhook_events(received_at DESC);

COMMENT ON TABLE incoming_webhook_events IS 'Raw incoming webhook events from third-party integrations';

-- ============================================
-- TRIGGERS
-- ============================================
CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_webhooks_updated_at BEFORE UPDATE ON webhooks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_auto_evidence_updated_at BEFORE UPDATE ON automated_evidence_collections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update integration error count on failure
CREATE OR REPLACE FUNCTION track_integration_errors()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'error' AND OLD.status != 'error' THEN
        NEW.error_count = COALESCE(OLD.error_count, 0) + 1;
        NEW.last_error_at = NOW();
        
        -- Set degraded status after 3 consecutive errors
        IF NEW.error_count >= 3 THEN
            NEW.status = 'degraded';
        END IF;
    ELSIF NEW.status = 'connected' THEN
        -- Reset error count on successful connection
        NEW.error_count = 0;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER track_integration_errors_trigger
    BEFORE UPDATE ON integrations
    FOR EACH ROW EXECUTE FUNCTION track_integration_errors();

-- Update webhook failure count
CREATE OR REPLACE FUNCTION track_webhook_failures()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.success = FALSE THEN
        UPDATE webhooks 
        SET failed_deliveries = failed_deliveries + 1,
            failure_count = failure_count + 1,
            updated_at = NOW()
        WHERE id = NEW.webhook_id;
        
        -- Auto-disable after 10 consecutive failures
        UPDATE webhooks 
        SET is_active = FALSE,
            disabled_at = NOW()
        WHERE id = NEW.webhook_id AND failure_count >= 10;
    ELSE
        UPDATE webhooks 
        SET successful_deliveries = successful_deliveries + 1,
            failure_count = 0,
            last_delivered_at = NEW.delivered_at,
            last_delivery_status = NEW.response_status,
            last_delivery_duration_ms = NEW.response_time_ms,
            updated_at = NOW()
        WHERE id = NEW.webhook_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER track_webhook_failures_trigger
    AFTER INSERT ON webhook_delivery_logs
    FOR EACH ROW EXECUTE FUNCTION track_webhook_failures();

-- Update subscription integration count
CREATE OR REPLACE FUNCTION update_integration_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE subscriptions 
        SET current_integration_count = current_integration_count + 1,
            updated_at = NOW()
        WHERE tenant_id = NEW.tenant_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE subscriptions 
        SET current_integration_count = GREATEST(current_integration_count - 1, 0),
            updated_at = NOW()
        WHERE tenant_id = OLD.tenant_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_integration_count_trigger
    AFTER INSERT OR DELETE ON integrations
    FOR EACH ROW EXECUTE FUNCTION update_integration_count();
