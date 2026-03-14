-- Migration: 004_create_evidence_and_policies.sql
-- Description: Evidence management and policy documentation
-- Depends On: 003_create_compliance_frameworks.sql
-- Author: Database Architect
-- Date: March 15, 2026

-- ============================================
-- EVIDENCE FILES (uploaded evidence documents)
-- ============================================
CREATE TABLE evidence_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    -- File metadata
    filename VARCHAR(255) NOT NULL, -- Internal filename (UUID)
    original_filename VARCHAR(255) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_extension VARCHAR(20),
    
    -- Storage (S3)
    s3_bucket VARCHAR(100) NOT NULL,
    s3_key VARCHAR(500) NOT NULL,
    s3_version_id VARCHAR(100),
    s3_etag VARCHAR(255),
    
    -- Integrity (tamper detection)
    sha256_hash VARCHAR(64) NOT NULL,
    
    -- Categorization
    evidence_type VARCHAR(50) NOT NULL 
        CHECK (evidence_type IN ('policy', 'procedure', 'screenshot', 'log', 'configuration', 
                                 'certificate', 'audit_report', 'training_record', 
                                 'vendor_assessment', 'incident_report', 'other')),
    description TEXT,
    tags TEXT[],
    
    -- Full-text search
    search_vector tsvector 
        GENERATED ALWAYS AS (to_tsvector('english', 
            coalesce(original_filename, '') || ' ' || coalesce(description, ''))) STORED,
    
    -- Retention
    retention_until_date DATE, -- Calculated from tier retention policy
    retention_override_until DATE, -- Manual override
    
    -- Uploader
    uploaded_by UUID NOT NULL REFERENCES users(id),
    
    -- Soft delete for retention policy
    deleted_at TIMESTAMPTZ,
    deleted_by UUID REFERENCES users(id),
    deletion_reason TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for evidence queries
CREATE INDEX idx_evidence_tenant ON evidence_files(tenant_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_evidence_type ON evidence_files(evidence_type) WHERE deleted_at IS NULL;
CREATE INDEX idx_evidence_uploaded_by ON evidence_files(uploaded_by);
CREATE INDEX idx_evidence_retention ON evidence_files(retention_until_date) 
    WHERE retention_until_date IS NOT NULL AND deleted_at IS NULL;
CREATE INDEX idx_evidence_created ON evidence_files(tenant_id, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_evidence_tags ON evidence_files USING GIN(tags) WHERE deleted_at IS NULL;
CREATE INDEX idx_evidence_search ON evidence_files USING GIN(search_vector);

COMMENT ON TABLE evidence_files IS 'Uploaded evidence documents with S3 storage and integrity verification';
COMMENT ON COLUMN evidence_files.sha256_hash IS 'SHA-256 hash for tamper detection and integrity verification';
COMMENT ON COLUMN evidence_files.retention_until_date IS 'Auto-calculated based on tier policy; null = keep indefinitely';

-- ============================================
-- EVIDENCE CONTROL LINKS (many-to-many)
-- ============================================
CREATE TABLE evidence_control_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    evidence_file_id UUID NOT NULL REFERENCES evidence_files(id) ON DELETE CASCADE,
    control_implementation_id UUID NOT NULL REFERENCES control_implementations(id) ON DELETE CASCADE,
    
    -- Relationship metadata
    link_type VARCHAR(30) NOT NULL DEFAULT 'supporting'
        CHECK (link_type IN ('supporting', 'primary', 'test_result', 'reference')),
    notes TEXT,
    
    -- Audit trail
    linked_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(tenant_id, evidence_file_id, control_implementation_id)
);

CREATE INDEX idx_evidence_links_control ON evidence_control_links(control_implementation_id);
CREATE INDEX idx_evidence_links_file ON evidence_control_links(evidence_file_id);
CREATE INDEX idx_evidence_links_type ON evidence_control_links(link_type);

COMMENT ON TABLE evidence_control_links IS 'Links evidence files to control implementations (many-to-many)';
COMMENT ON COLUMN evidence_control_links.link_type IS 'primary = main evidence, supporting = additional context, test_result = automated test output';

-- ============================================
-- EVIDENCE REQUESTS (for auditor/external requests)
-- ============================================
CREATE TABLE evidence_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    assessment_id UUID NOT NULL REFERENCES compliance_assessments(id) ON DELETE CASCADE,
    
    -- Request details
    request_number VARCHAR(50), -- e.g., "ER-2024-001"
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    
    -- Status
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'in_progress', 'submitted', 'approved', 'rejected')),
    
    -- Requester (could be external auditor)
    requested_by UUID REFERENCES users(id), -- NULL if external
    requester_name VARCHAR(255), -- For external auditors
    requester_email VARCHAR(255),
    
    -- Due date
    due_date DATE NOT NULL,
    
    -- Response
    submitted_at TIMESTAMPTZ,
    submitted_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES users(id),
    review_notes TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_evidence_requests_tenant ON evidence_requests(tenant_id);
CREATE INDEX idx_evidence_requests_status ON evidence_requests(status);
CREATE INDEX idx_evidence_requests_due ON evidence_requests(due_date) WHERE status IN ('pending', 'in_progress');

COMMENT ON TABLE evidence_requests IS 'Formal requests for evidence (typically from auditors)';

-- ============================================
-- EVIDENCE REQUEST ITEMS
-- ============================================
CREATE TABLE evidence_request_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evidence_request_id UUID NOT NULL REFERENCES evidence_requests(id) ON DELETE CASCADE,
    control_implementation_id UUID REFERENCES control_implementations(id),
    
    -- Specific evidence requirements
    requirement_description TEXT NOT NULL,
    
    -- Linked evidence (when submitted)
    evidence_file_id UUID REFERENCES evidence_files(id),
    
    -- Status per item
    status VARCHAR(20) NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'provided', 'insufficient', 'rejected')),
    
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_request_items_request ON evidence_request_items(evidence_request_id);

-- ============================================
-- POLICIES (policy documents)
-- ============================================
CREATE TABLE policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    -- Policy metadata
    title VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL, -- e.g., "INFOSEC", "HR-001", "PRIVACY"
    category VARCHAR(50) NOT NULL 
        CHECK (category IN ('information_security', 'privacy', 'hr', 'operational', 
                           'vendor_management', 'business_continuity', 'acceptable_use', 'other')),
    
    -- Status workflow
    status VARCHAR(20) NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'under_review', 'approved', 'superseded', 'archived')),
    
    -- Ownership
    owner_id UUID NOT NULL REFERENCES users(id),
    reviewer_id UUID REFERENCES users(id),
    approver_id UUID REFERENCES users(id),
    
    -- Review cycle
    review_frequency_months INTEGER NOT NULL DEFAULT 12,
    last_reviewed_at TIMESTAMPTZ,
    next_review_due_at TIMESTAMPTZ,
    approved_at TIMESTAMPTZ,
    
    -- Current version reference
    current_version_id UUID,
    
    -- Acknowledgment requirement
    requires_acknowledgment BOOLEAN NOT NULL DEFAULT FALSE,
    acknowledgment_frequency_months INTEGER, -- NULL = one-time only
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    UNIQUE(tenant_id, code)
);

CREATE INDEX idx_policies_tenant ON policies(tenant_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_policies_status ON policies(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_policies_category ON policies(category) WHERE deleted_at IS NULL;
CREATE INDEX idx_policies_owner ON policies(owner_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_policies_review_due ON policies(next_review_due_at) 
    WHERE status = 'approved' AND next_review_due_at IS NOT NULL;

COMMENT ON TABLE policies IS 'Policy documents with version control and review workflows';
COMMENT ON COLUMN policies.requires_acknowledgment IS 'Whether employees must acknowledge reading this policy';

-- ============================================
-- POLICY VERSIONS (immutable versions for audit)
-- ============================================
CREATE TABLE policy_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    policy_id UUID NOT NULL REFERENCES policies(id) ON DELETE CASCADE,
    
    -- Version info
    version_number INTEGER NOT NULL,
    change_summary TEXT,
    
    -- Content
    content_markdown TEXT NOT NULL,
    content_html TEXT NOT NULL,
    
    -- AI generation tracking
    ai_generated BOOLEAN NOT NULL DEFAULT FALSE,
    ai_model_version VARCHAR(50),
    ai_prompt_hash VARCHAR(64), -- Hash of prompt for reproducibility
    
    -- Approval chain
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMPTZ,
    
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMPTZ,
    
    -- Effective dates
    effective_from DATE,
    effective_until DATE, -- Set when superseded
    
    UNIQUE(policy_id, version_number)
);

CREATE INDEX idx_policy_versions_policy ON policy_versions(policy_id);
CREATE INDEX idx_policy_versions_effective ON policy_versions(effective_from, effective_until);
CREATE INDEX idx_policy_versions_ai ON policy_versions(ai_generated) WHERE ai_generated = TRUE;

COMMENT ON TABLE policy_versions IS 'Immutable policy versions for audit trail';
COMMENT ON COLUMN policy_versions.ai_generated IS 'Track AI-generated content for compliance transparency';

-- Update policy current_version_id after version approval
CREATE OR REPLACE FUNCTION update_policy_current_version()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.approved_at IS NOT NULL AND OLD.approved_at IS NULL THEN
        UPDATE policies 
        SET current_version_id = NEW.id,
            status = 'approved',
            approved_at = NEW.approved_at,
            approver_id = NEW.approved_by,
            updated_at = NOW()
        WHERE id = NEW.policy_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_policy_current_version_trigger
    AFTER UPDATE ON policy_versions
    FOR EACH ROW EXECUTE FUNCTION update_policy_current_version();

-- ============================================
-- POLICY ACKNOWLEDGMENTS
-- ============================================
CREATE TABLE policy_acknowledgments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    policy_version_id UUID NOT NULL REFERENCES policy_versions(id),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Acknowledgment details
    acknowledged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT,
    
    -- Periodic re-acknowledgment
    acknowledgment_expires_at DATE, -- For periodic acknowledgments
    
    UNIQUE(tenant_id, policy_version_id, user_id)
);

CREATE INDEX idx_acknowledgments_policy ON policy_acknowledgments(policy_version_id);
CREATE INDEX idx_acknowledgments_user ON policy_acknowledgments(user_id);
CREATE INDEX idx_acknowledgments_expires ON policy_acknowledgments(acknowledgment_expires_at) 
    WHERE acknowledgment_expires_at IS NOT NULL;

COMMENT ON TABLE policy_acknowledgments IS 'Employee acknowledgment tracking for compliance requirements';

-- ============================================
-- TRIGGERS
-- ============================================
CREATE TRIGGER update_evidence_files_updated_at BEFORE UPDATE ON evidence_files
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evidence_requests_updated_at BEFORE UPDATE ON evidence_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_request_items_updated_at BEFORE UPDATE ON evidence_request_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_policies_updated_at BEFORE UPDATE ON policies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_policy_versions_updated_at BEFORE UPDATE ON policy_versions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- EVIDENCE STORAGE QUOTA TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_evidence_quota()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.deleted_at IS NULL THEN
        UPDATE subscriptions 
        SET current_evidence_count = current_evidence_count + 1,
            storage_bytes_used = storage_bytes_used + NEW.file_size_bytes,
            updated_at = NOW()
        WHERE tenant_id = NEW.tenant_id;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Handle soft delete
        IF NEW.deleted_at IS NOT NULL AND OLD.deleted_at IS NULL THEN
            UPDATE subscriptions 
            SET current_evidence_count = GREATEST(current_evidence_count - 1, 0),
                storage_bytes_used = GREATEST(storage_bytes_used - OLD.file_size_bytes, 0),
                updated_at = NOW()
            WHERE tenant_id = NEW.tenant_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_evidence_quota_trigger
    AFTER INSERT OR UPDATE ON evidence_files
    FOR EACH ROW EXECUTE FUNCTION update_evidence_quota();
