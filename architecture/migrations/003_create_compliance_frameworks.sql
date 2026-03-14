-- Migration: 003_create_compliance_frameworks.sql
-- Description: Compliance frameworks, controls, and assessments
-- Depends On: 002_create_users_and_auth.sql
-- Author: Database Architect
-- Date: March 15, 2026

-- ============================================
-- FRAMEWORKS (SOC 2, ISO 27001, GDPR, etc.)
-- ============================================
CREATE TABLE frameworks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, -- NULL = system frameworks
    
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL,
    version VARCHAR(20) NOT NULL,
    description TEXT,
    
    -- Framework metadata
    authority VARCHAR(100), -- e.g., "AICPA", "ISO", "EU"
    category VARCHAR(50), -- e.g., "security", "privacy", "availability", "resilience"
    jurisdiction VARCHAR(100), -- e.g., "Global", "EU", "US", "UK"
    
    -- Certification details
    certification_validity_months INTEGER, -- NULL for non-certification frameworks like GDPR
    requires_external_audit BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Status
    is_system BOOLEAN NOT NULL DEFAULT FALSE,
    is_custom BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    UNIQUE(tenant_id, code)
);

-- Seed system frameworks
INSERT INTO frameworks (name, code, version, description, authority, category, jurisdiction, 
    certification_validity_months, requires_external_audit, is_system, is_active)
VALUES 
    ('SOC 2 Type II', 'soc2', '2017', 
     'Trust Services Criteria for Security, Availability, Processing Integrity, Confidentiality, and Privacy',
     'AICPA', 'security', 'US', 12, TRUE, TRUE, TRUE),
    ('ISO 27001:2022', 'iso27001', '2022', 
     'Information Security Management System standard',
     'ISO', 'security', 'Global', 36, TRUE, TRUE, TRUE),
    ('GDPR', 'gdpr', '2016', 
     'General Data Protection Regulation',
     'EU', 'privacy', 'EU', NULL, FALSE, TRUE, TRUE),
    ('NIS2', 'nis2', '2023', 
     'Network and Information Security Directive 2',
     'EU', 'resilience', 'EU', NULL, TRUE, TRUE, TRUE),
    ('HIPAA Security Rule', 'hipaa', '2013', 
     'Health Insurance Portability and Accountability Act Security Standards',
     'HHS', 'privacy', 'US', NULL, TRUE, TRUE, TRUE),
    ('PCI DSS', 'pci-dss', '4.0', 
     'Payment Card Industry Data Security Standard',
     'PCI SSC', 'security', 'Global', 12, TRUE, TRUE, TRUE);

CREATE INDEX idx_frameworks_tenant ON frameworks(tenant_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_frameworks_system ON frameworks(is_system) WHERE is_system = TRUE;
CREATE INDEX idx_frameworks_active ON frameworks(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_frameworks_category ON frameworks(category);

COMMENT ON TABLE frameworks IS 'Compliance frameworks - system frameworks available to all, custom per tenant';

-- ============================================
-- CONTROLS (individual controls within frameworks)
-- ============================================
CREATE TABLE controls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE, -- NULL = system controls
    framework_id UUID NOT NULL REFERENCES frameworks(id) ON DELETE CASCADE,
    
    -- Control identification
    control_number VARCHAR(20) NOT NULL, -- e.g., "CC6.1", "A.5.1", "Art.32"
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    
    -- Implementation guidance
    implementation_guidance TEXT,
    testing_procedure TEXT,
    evidence_requirements TEXT[], -- List of required evidence types
    
    -- Categorization
    category VARCHAR(50), -- e.g., "access_control", "encryption", "monitoring"
    subcategory VARCHAR(50),
    risk_level VARCHAR(20) CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
    
    -- Automation support
    can_be_automated BOOLEAN NOT NULL DEFAULT FALSE,
    automation_integration_type VARCHAR(50), -- e.g., 'snyk', 'datadog', 'github'
    
    -- Status
    is_system BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    UNIQUE(tenant_id, framework_id, control_number)
);

CREATE INDEX idx_controls_framework ON controls(framework_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_controls_tenant ON controls(tenant_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_controls_category ON controls(category) WHERE deleted_at IS NULL;
CREATE INDEX idx_controls_risk ON controls(risk_level) WHERE deleted_at IS NULL;
CREATE INDEX idx_controls_automation ON controls(can_be_automated, automation_integration_type) 
    WHERE can_be_automated = TRUE;

COMMENT ON TABLE controls IS 'Individual security/privacy controls mapped to frameworks';
COMMENT ON COLUMN controls.can_be_automated IS 'Whether evidence for this control can be collected automatically';

-- Seed SOC 2 controls
INSERT INTO controls (framework_id, control_number, title, description, implementation_guidance, 
    testing_procedure, category, risk_level, can_be_automated, is_system)
SELECT 
    f.id, 'CC6.1', 'Logical Access Security', 
    'The entity implements logical access security measures to protect against threats',
    'Implement role-based access control, MFA, least privilege principles',
    'Review access control lists, verify MFA enforcement, test role assignments',
    'access_control', 'high', TRUE, TRUE
FROM frameworks f WHERE f.code = 'soc2' AND f.is_system = TRUE;

-- ============================================
-- COMPLIANCE ASSESSMENTS
-- ============================================
CREATE TABLE compliance_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    framework_id UUID NOT NULL REFERENCES frameworks(id),
    
    -- Assessment state
    status VARCHAR(30) NOT NULL DEFAULT 'in_progress'
        CHECK (status IN ('in_progress', 'ready_for_review', 'audit_scheduled', 
                         'audit_in_progress', 'compliant', 'non_compliant', 'remediaton_required')),
    
    -- Timeline
    target_completion_date DATE,
    audit_date DATE,
    certification_issued_at DATE,
    certification_expires_at DATE,
    recertification_reminder_sent_at TIMESTAMPTZ,
    
    -- Progress tracking (cached for performance)
    total_controls INTEGER NOT NULL DEFAULT 0,
    implemented_controls INTEGER NOT NULL DEFAULT 0,
    tested_controls INTEGER NOT NULL DEFAULT 0,
    compliant_controls INTEGER NOT NULL DEFAULT 0,
    non_compliant_controls INTEGER NOT NULL DEFAULT 0,
    not_applicable_controls INTEGER NOT NULL DEFAULT 0,
    
    -- Progress percentage (computed)
    compliance_percentage DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN total_controls = 0 THEN 0
            ELSE (compliant_controls::DECIMAL / (total_controls - not_applicable_controls)::DECIMAL) * 100
        END
    ) STORED,
    
    -- Assignment
    assigned_to UUID REFERENCES users(id),
    auditor_id UUID, -- External auditor reference (may not be a system user)
    auditor_name VARCHAR(255),
    auditor_email VARCHAR(255),
    auditor_company VARCHAR(255),
    
    -- Notes
    notes TEXT,
    auditor_notes TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(tenant_id, framework_id)
);

CREATE INDEX idx_assessments_tenant ON compliance_assessments(tenant_id);
CREATE INDEX idx_assessments_status ON compliance_assessments(status);
CREATE INDEX idx_assessments_target_date ON compliance_assessments(target_completion_date);
CREATE INDEX idx_assessments_cert_expiry ON compliance_assessments(certification_expires_at) 
    WHERE certification_expires_at IS NOT NULL;
CREATE INDEX idx_assessments_assigned ON compliance_assessments(assigned_to);

COMMENT ON TABLE compliance_assessments IS 'Tracks a tenant''s compliance journey for a specific framework';
COMMENT ON COLUMN compliance_assessments.compliance_percentage IS 'Auto-computed: compliant / (total - N/A) * 100';

-- ============================================
-- CONTROL IMPLEMENTATIONS
-- ============================================
CREATE TABLE control_implementations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    control_id UUID NOT NULL REFERENCES controls(id) ON DELETE CASCADE,
    assessment_id UUID NOT NULL REFERENCES compliance_assessments(id) ON DELETE CASCADE,
    
    -- Implementation details
    status VARCHAR(30) NOT NULL DEFAULT 'not_started'
        CHECK (status IN ('not_started', 'in_progress', 'implemented', 'tested', 
                         'compliant', 'non_compliant', 'remediated', 'not_applicable')),
    
    implementation_description TEXT,
    implementation_notes TEXT,
    responsible_user_id UUID REFERENCES users(id),
    
    -- Testing
    test_frequency VARCHAR(20) CHECK (test_frequency IN ('daily', 'weekly', 'monthly', 'quarterly', 'annually')),
    test_method VARCHAR(50) CHECK (test_method IN ('automated', 'manual', 'hybrid')),
    last_tested_at TIMESTAMPTZ,
    next_test_due_at TIMESTAMPTZ,
    tested_by UUID REFERENCES users(id),
    test_notes TEXT,
    
    -- Automation
    is_automated BOOLEAN NOT NULL DEFAULT FALSE,
    integration_id UUID, -- Links to automatic evidence collection
    automation_config JSONB, -- Integration-specific configuration
    
    -- Non-applicable justification
    not_applicable_reason TEXT,
    not_applicable_approved_by UUID REFERENCES users(id),
    not_applicable_approved_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_implementations_assessment ON control_implementations(assessment_id);
CREATE INDEX idx_implementations_control ON control_implementations(control_id);
CREATE INDEX idx_implementations_status ON control_implementations(status);
CREATE INDEX idx_implementations_due ON control_implementations(next_test_due_at) 
    WHERE next_test_due_at IS NOT NULL AND status NOT IN ('not_applicable', 'compliant');
CREATE INDEX idx_implementations_responsible ON control_implementations(responsible_user_id);
CREATE INDEX idx_implementations_automated ON control_implementations(is_automated, integration_id) 
    WHERE is_automated = TRUE;

COMMENT ON TABLE control_implementations IS 'Maps controls to actual implementations within a tenant''s assessment';
COMMENT ON COLUMN control_implementations.status IS 'Tracks through implementation lifecycle to compliance';

-- ============================================
-- AUDIT FINDINGS
-- ============================================
CREATE TABLE audit_findings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    assessment_id UUID NOT NULL REFERENCES compliance_assessments(id) ON DELETE CASCADE,
    control_implementation_id UUID REFERENCES control_implementations(id),
    
    -- Finding details
    finding_number VARCHAR(50), -- e.g., "F-2024-001"
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    root_cause_analysis TEXT,
    
    -- Status workflow
    status VARCHAR(30) NOT NULL DEFAULT 'open'
        CHECK (status IN ('open', 'in_progress', 'resolved', 'accepted_risk', 'false_positive')),
    
    -- Classification
    finding_type VARCHAR(30) CHECK (finding_type IN ('deficiency', 'weakness', 'gap', 'observation', 'recommendation')),
    
    -- Assignment
    assigned_to UUID REFERENCES users(id),
    due_date DATE,
    
    -- Remediation
    remediation_plan TEXT,
    remediation_steps TEXT[],
    remediated_at TIMESTAMPTZ,
    remediated_by UUID REFERENCES users(id),
    remediation_verified_at TIMESTAMPTZ,
    remediation_verified_by UUID REFERENCES users(id),
    
    -- Risk acceptance (for accepted_risk status)
    risk_acceptance_reason TEXT,
    risk_acceptance_approved_by UUID REFERENCES users(id),
    risk_acceptance_approved_at TIMESTAMPTZ,
    risk_acceptance_expires_at DATE,
    
    -- Auditor info (external audits)
    auditor_name VARCHAR(255),
    auditor_notes TEXT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_findings_tenant ON audit_findings(tenant_id);
CREATE INDEX idx_findings_assessment ON audit_findings(assessment_id);
CREATE INDEX idx_findings_status ON audit_findings(status);
CREATE INDEX idx_findings_severity ON audit_findings(severity);
CREATE INDEX idx_findings_assigned ON audit_findings(assigned_to) WHERE status IN ('open', 'in_progress');
CREATE INDEX idx_findings_due ON audit_findings(due_date) WHERE status IN ('open', 'in_progress');

COMMENT ON TABLE audit_findings IS 'Findings from internal or external audits';
COMMENT ON COLUMN audit_findings.severity IS 'Critical = immediate action required, High = urgent, Medium = planned, Low = best practice';

-- ============================================
-- TRIGGERS
-- ============================================
CREATE TRIGGER update_frameworks_updated_at BEFORE UPDATE ON frameworks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    
CREATE TRIGGER update_controls_updated_at BEFORE UPDATE ON controls
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON compliance_assessments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    
CREATE TRIGGER update_implementations_updated_at BEFORE UPDATE ON control_implementations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    
CREATE TRIGGER update_findings_updated_at BEFORE UPDATE ON audit_findings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
