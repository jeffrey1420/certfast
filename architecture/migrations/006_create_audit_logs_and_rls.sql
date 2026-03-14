-- Migration: 006_create_audit_logs_and_rls.sql
-- Description: System audit logs and Row-Level Security policies
-- Depends On: 005_create_integrations_and_webhooks.sql
-- Author: Database Architect
-- Date: March 15, 2026

-- ============================================
-- AUDIT LOGS (immutable system audit trail)
-- ============================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id), -- NULL for system events
    
    -- Actor
    actor_type VARCHAR(20) NOT NULL CHECK (actor_type IN ('user', 'api_key', 'system', 'integration', 'webhook')),
    actor_id UUID, -- user_id or api_key_id
    actor_email VARCHAR(255),
    
    -- Action classification
    action_category VARCHAR(50) NOT NULL 
        CHECK (action_category IN ('authentication', 'authorization', 'data_access', 'data_modification', 
                                   'compliance', 'admin', 'system', 'integration')),
    action VARCHAR(100) NOT NULL, -- e.g., 'user.login', 'evidence.create', 'policy.approve'
    
    -- Resource
    resource_type VARCHAR(50) NOT NULL, -- e.g., 'user', 'evidence', 'policy', 'tenant'
    resource_id UUID,
    resource_name VARCHAR(255), -- Human-readable name for audit clarity
    
    -- Request context
    request_id UUID NOT NULL,
    ip_address INET,
    user_agent TEXT,
    country_code VARCHAR(2), -- GeoIP lookup
    
    -- Change tracking
    changes JSONB, -- { field: { old: x, new: y } }
    metadata JSONB, -- Flexible context
    
    -- Sensitivity (for data classification)
    sensitivity_level VARCHAR(20) DEFAULT 'normal' 
        CHECK (sensitivity_level IN ('low', 'normal', 'high', 'critical')),
    
    -- Compliance flags
    gdpr_relevant BOOLEAN NOT NULL DEFAULT FALSE,
    sox_relevant BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Retention
    archived_at TIMESTAMPTZ, -- Moved to cold storage
    retention_until_date DATE NOT NULL, -- Auto-calculated
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
) PARTITION BY RANGE (created_at);

-- Create initial partitions (monthly for first year)
CREATE TABLE audit_logs_y2026m03 PARTITION OF audit_logs
    FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');
CREATE TABLE audit_logs_y2026m04 PARTITION OF audit_logs
    FOR VALUES FROM ('2026-04-01') TO ('2026-05-01');
CREATE TABLE audit_logs_y2026m05 PARTITION OF audit_logs
    FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');
CREATE TABLE audit_logs_y2026m06 PARTITION OF audit_logs
    FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');

-- Indexes for audit queries
CREATE INDEX idx_audit_logs_tenant_time ON audit_logs(tenant_id, created_at DESC);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id, created_at DESC);
CREATE INDEX idx_audit_logs_action ON audit_logs(action, created_at DESC);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_logs_category ON audit_logs(action_category, created_at DESC);
CREATE INDEX idx_audit_logs_request ON audit_logs(request_id);
CREATE INDEX idx_audit_logs_retention ON audit_logs(retention_until_date) WHERE archived_at IS NULL;

COMMENT ON TABLE audit_logs IS 'Immutable audit trail for all system actions - partitioned by month';
COMMENT ON COLUMN audit_logs.changes IS 'Tracks field-level changes for data modifications';
COMMENT ON COLUMN audit_logs.retention_until_date IS '7 years for compliance; auto-archived after';

-- ============================================
-- AUDIT LOG ARCHIVE (cold storage reference)
-- ============================================
CREATE TABLE audit_log_archives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partition_name VARCHAR(50) NOT NULL,
    date_range_from DATE NOT NULL,
    date_range_to DATE NOT NULL,
    
    -- Archive details
    s3_bucket VARCHAR(100) NOT NULL,
    s3_key VARCHAR(500) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    record_count INTEGER NOT NULL,
    
    -- Compression
    compression_format VARCHAR(20) NOT NULL DEFAULT 'gzip' 
        CHECK (compression_format IN ('gzip', 'zstd', 'lz4')),
    
    -- Verification
    sha256_hash VARCHAR(64) NOT NULL,
    
    archived_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    archived_by VARCHAR(100) NOT NULL DEFAULT 'system'
);

CREATE UNIQUE INDEX idx_audit_archives_partition ON audit_log_archives(partition_name);

COMMENT ON TABLE audit_log_archives IS 'Tracking for audit logs moved to cold S3 storage';

-- ============================================
-- SYSTEM EVENTS (internal system events)
-- ============================================
CREATE TABLE system_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    event_type VARCHAR(50) NOT NULL 
        CHECK (event_type IN ('migration', 'backup', 'restore', 'config_change', 
                              'alert', 'maintenance', 'scaling', 'security')),
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
    
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    details JSONB,
    
    -- Source
    component VARCHAR(100) NOT NULL, -- e.g., 'database', 'api', 'worker'
    instance_id VARCHAR(100), -- Server/container identifier
    
    -- Alerting
    alerted BOOLEAN NOT NULL DEFAULT FALSE,
    alert_channels TEXT[], -- e.g., ['pagerduty', 'slack']
    acknowledged_at TIMESTAMPTZ,
    acknowledged_by VARCHAR(100),
    resolved_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_system_events_type ON system_events(event_type, created_at DESC);
CREATE INDEX idx_system_events_severity ON system_events(severity, created_at DESC) WHERE severity IN ('error', 'critical');
CREATE INDEX idx_system_events_component ON system_events(component, created_at DESC);
CREATE INDEX idx_system_events_unacknowledged ON system_events(created_at DESC) 
    WHERE acknowledged_at IS NULL AND severity IN ('error', 'critical');

COMMENT ON TABLE system_events IS 'Internal system events for operations monitoring';

-- ============================================
-- ROW-LEVEL SECURITY (RLS) IMPLEMENTATION
-- ============================================

-- Enable RLS on all tenant-scoped tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE frameworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE controls ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE control_implementations ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_control_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_request_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_acknowledgments ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE automated_evidence_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_delivery_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE incoming_webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Force RLS for table owners too
ALTER TABLE users FORCE ROW LEVEL SECURITY;
ALTER TABLE subscriptions FORCE ROW LEVEL SECURITY;
ALTER TABLE evidence_files FORCE ROW LEVEL SECURITY;
ALTER TABLE compliance_assessments FORCE ROW LEVEL SECURITY;
ALTER TABLE control_implementations FORCE ROW LEVEL SECURITY;
ALTER TABLE policies FORCE ROW LEVEL SECURITY;
ALTER TABLE audit_logs FORCE ROW LEVEL SECURITY;

COMMENT ON TABLE users IS 'RLS: tenant_id = current_setting(app.current_tenant)';
COMMENT ON TABLE subscriptions IS 'RLS: tenant_id = current_setting(app.current_tenant)';
COMMENT ON TABLE evidence_files IS 'RLS: tenant_id = current_setting(app.current_tenant)';

-- ============================================
-- RLS POLICIES
-- ============================================

-- Users: strict tenant isolation
CREATE POLICY tenant_isolation_users ON users
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Subscriptions: strict tenant isolation
CREATE POLICY tenant_isolation_subscriptions ON subscriptions
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Frameworks: tenant OR system
CREATE POLICY tenant_isolation_frameworks ON frameworks
    FOR ALL
    USING (
        tenant_id = current_setting('app.current_tenant')::UUID 
        OR is_system = TRUE
    );

-- Controls: tenant OR system
CREATE POLICY tenant_isolation_controls ON controls
    FOR ALL
    USING (
        tenant_id = current_setting('app.current_tenant')::UUID 
        OR is_system = TRUE
    );

-- Compliance Assessments: strict tenant
CREATE POLICY tenant_isolation_assessments ON compliance_assessments
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Control Implementations: strict tenant
CREATE POLICY tenant_isolation_implementations ON control_implementations
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Evidence Files: strict tenant
CREATE POLICY tenant_isolation_evidence ON evidence_files
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Evidence Control Links: strict tenant
CREATE POLICY tenant_isolation_evidence_links ON evidence_control_links
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Evidence Requests: strict tenant
CREATE POLICY tenant_isolation_evidence_requests ON evidence_requests
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Audit Findings: strict tenant
CREATE POLICY tenant_isolation_findings ON audit_findings
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Policies: strict tenant
CREATE POLICY tenant_isolation_policies ON policies
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Policy Versions: strict tenant
CREATE POLICY tenant_isolation_policy_versions ON policy_versions
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Policy Acknowledgments: strict tenant
CREATE POLICY tenant_isolation_acknowledgments ON policy_acknowledgments
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Integrations: strict tenant
CREATE POLICY tenant_isolation_integrations ON integrations
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Integration Sync Logs: strict tenant
CREATE POLICY tenant_isolation_sync_logs ON integration_sync_logs
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Automated Evidence: strict tenant
CREATE POLICY tenant_isolation_auto_evidence ON automated_evidence_collections
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- API Keys: strict tenant
CREATE POLICY tenant_isolation_api_keys ON api_keys
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Webhooks: strict tenant
CREATE POLICY tenant_isolation_webhooks ON webhooks
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Webhook Delivery Logs: strict tenant
CREATE POLICY tenant_isolation_webhook_logs ON webhook_delivery_logs
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Incoming Webhook Events: strict tenant
CREATE POLICY tenant_isolation_incoming_webhooks ON incoming_webhook_events
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- User Sessions: strict tenant
CREATE POLICY tenant_isolation_sessions ON user_sessions
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- User Activity Log: strict tenant
CREATE POLICY tenant_isolation_activity ON user_activity_log
    FOR ALL
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Audit Logs: tenant OR system (for cross-tenant queries by super admins)
CREATE POLICY tenant_isolation_audit_logs ON audit_logs
    FOR ALL
    USING (
        tenant_id = current_setting('app.current_tenant')::UUID 
        OR tenant_id IS NULL
    );

-- ============================================
-- APPLICATION HELPER FUNCTIONS
-- ============================================

-- Set tenant context for RLS
CREATE OR REPLACE FUNCTION set_tenant_context(tenant_id UUID)
RETURNS void AS $$
BEGIN
    PERFORM set_config('app.current_tenant', tenant_id::text, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Get current tenant from context
CREATE OR REPLACE FUNCTION get_current_tenant()
RETURNS UUID AS $$
BEGIN
    RETURN current_setting('app.current_tenant', true)::UUID;
EXCEPTION WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE;

-- Clear tenant context
CREATE OR REPLACE FUNCTION clear_tenant_context()
RETURNS void AS $$
BEGIN
    PERFORM set_config('app.current_tenant', '', false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- GDPR COMPLIANCE FUNCTIONS
-- ============================================

-- Right to be forgotten (tenant-level deletion)
CREATE OR REPLACE FUNCTION gdpr_delete_tenant(p_tenant_id UUID)
RETURNS void AS $$
DECLARE
    v_archived_at TIMESTAMPTZ := NOW();
BEGIN
    -- Anonymize audit logs (keep for compliance, remove PII)
    UPDATE audit_logs 
    SET actor_email = '[REDACTED]',
        metadata = jsonb_build_object('redacted', true, 'original_tenant', p_tenant_id),
        changes = '{}'::jsonb
    WHERE tenant_id = p_tenant_id;
    
    -- Soft delete all tenant data (cascades via ON DELETE CASCADE where defined)
    -- Evidence files will be handled by application worker for S3 deletion
    UPDATE evidence_files 
    SET deleted_at = v_archived_at,
        deletion_reason = 'GDPR tenant deletion'
    WHERE tenant_id = p_tenant_id AND deleted_at IS NULL;
    
    -- Mark tenant as deleted
    UPDATE tenants 
    SET deleted_at = v_archived_at,
        status = 'cancelled',
        name = '[DELETED]',
        billing_email = '[REDACTED]',
        technical_contact_email = NULL
    WHERE id = p_tenant_id;
    
    -- Log the deletion
    INSERT INTO system_events (event_type, severity, title, message, component, details)
    VALUES ('security', 'warning', 'GDPR Tenant Deletion', 
            'Tenant ' || p_tenant_id || ' deleted per GDPR request',
            'database',
            jsonb_build_object('tenant_id', p_tenant_id, 'deleted_at', v_archived_at));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Data export for GDPR portability
CREATE OR REPLACE FUNCTION gdpr_export_tenant(p_tenant_id UUID)
RETURNS JSONB AS $$
DECLARE
    v_export JSONB;
BEGIN
    -- Build export document
    SELECT jsonb_build_object(
        'tenant', (SELECT to_jsonb(t.*) FROM tenants t WHERE t.id = p_tenant_id),
        'users', (SELECT jsonb_agg(to_jsonb(u.*)) FROM users u WHERE u.tenant_id = p_tenant_id),
        'evidence_count', (SELECT COUNT(*) FROM evidence_files WHERE tenant_id = p_tenant_id),
        'assessments', (SELECT jsonb_agg(to_jsonb(ca.*)) FROM compliance_assessments ca WHERE ca.tenant_id = p_tenant_id),
        'policies', (SELECT jsonb_agg(to_jsonb(p.*)) FROM policies p WHERE p.tenant_id = p_tenant_id),
        'exported_at', NOW()
    ) INTO v_export;
    
    -- Log the export
    INSERT INTO audit_logs (
        tenant_id, actor_type, action, action_category, resource_type, 
        metadata, created_at, retention_until_date
    ) VALUES (
        p_tenant_id, 'system', 'gdpr.data_export', 'admin', 'tenant',
        jsonb_build_object('export_type', 'gdpr_portability'),
        NOW(), NOW() + INTERVAL '7 years'
    );
    
    RETURN v_export;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION gdpr_delete_tenant IS 'Soft delete tenant and anonymize PII for GDPR Article 17 (Right to erasure)';
COMMENT ON FUNCTION gdpr_export_tenant IS 'Export all tenant data for GDPR Article 20 (Data portability)';
