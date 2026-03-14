# CertFast Database Schema Design

**Document Version**: 1.0  
**Date**: March 15, 2026  
**Architect**: System Architect  
**Status**: Draft  
**Database**: PostgreSQL 16

---

## Executive Summary

This document defines the complete database schema for CertFast's compliance automation platform. The schema supports multi-tenancy, four pricing tiers, three compliance frameworks (SOC 2, ISO 27001, GDPR), and CPA firm partnerships.

### Schema Design Principles

1. **Multi-tenancy**: Schema-per-tenant with row-level security
2. **Audit logging**: All changes tracked with `created_at`, `updated_at`, `created_by`
3. **Soft deletes**: `deleted_at` timestamp for data retention compliance
4. **JSON flexibility**: Custom fields for enterprise customization
5. **Performance**: Indexed foreign keys, partial indexes for active records

---

## 1. Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              TENANT SCHEMA                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌──────────────┐        ┌──────────────┐        ┌──────────────┐              │
│  │  companies   │◀───────│  users       │        │  invitations │              │
│  │──────────────│        │──────────────│        │──────────────│              │
│  │ id (PK)      │        │ id (PK)      │        │ id (PK)      │              │
│  │ name         │        │ company_id   │────┐   │ company_id   │              │
│  │ tier         │        │ email        │    │   │ email        │              │
│  │ employee_count│       │ role         │    │   │ role         │              │
│  │ industry     │        │ auth0_id     │    │   │ token        │              │
│  │ gdpr_enabled │        │ status       │    │   │ expires_at   │              │
│  │ settings     │        └──────────────┘    │   └──────────────┘              │
│  └──────┬───────┘                            │                                 │
│         │                                    │        ┌──────────────┐        │
│         │         ┌──────────────────────────┘        │  sessions    │        │
│         │         │                                   │──────────────│        │
│         │         │                                   │ id (PK)      │        │
│         │    ┌────┴────┐                              │ user_id      │        │
│         └───▶│frameworks│                              │ token        │        │
│              │─────────│                              │ expires_at   │        │
│              │ id (PK) │                              └──────────────┘        │
│              │ company_id│                                                    │
│              │ type      │◀── SOC2 / ISO27001 / GDPR                         │
│              │ status    │                                                    │
│              │ target_date│                                                   │
│              └────┬──────┘                                                    │
│                   │                                                           │
│                   │         ┌──────────────┐                                  │
│                   │         │  controls    │                                  │
│                   │         │──────────────│                                  │
│                   │         │ id (PK)      │                                  │
│                   └────────▶│ framework_id│                                  │
│                             │ code         │                                  │
│                             │ title        │                                  │
│                             │ description  │                                  │
│                             │ status       │                                  │
│                             │ priority     │                                  │
│                             │ due_date     │                                  │
│                             │ assigned_to  │                                  │
│                             │ auto_check   │                                  │
│                             └──────┬───────┘                                  │
│                                    │                                          │
│                   ┌────────────────┼────────────────┐                        │
│                   │                │                │                        │
│                   ▼                ▼                ▼                        │
│            ┌──────────┐    ┌──────────────┐   ┌───────────┐                │
│            │evidence  │    │  tasks       │   │  comments │                │
│            │──────────│    │──────────────│   │───────────│                │
│            │id (PK)   │    │ id (PK)      │   │ id (PK)   │                │
│            │control_id│◀───│ control_id   │   │control_id │                │
│            │type      │    │ title        │   │user_id    │                │
│            │file_url  │    │ description  │   │content    │                │
│            │status    │    │ status       │   │created_at │                │
│            │uploaded_by│   │ due_date     │   └───────────┘                │
│            │metadata  │    │ assignee_id  │                                │
│            └──────────┘    └──────────────┘                                │
│                                                                               │
│  ┌──────────────┐        ┌──────────────┐        ┌──────────────┐          │
│  │  audits      │        │  audit_items │        │  partners    │          │
│  │──────────────│        │──────────────│        │──────────────│          │
│  │ id (PK)      │◀───────│ audit_id     │        │ id (PK)      │          │
│  │ framework_id │        │ control_id   │        │ company_id   │          │
│  │ partner_id   │───────▶│ status       │        │ name         │          │
│  │ status       │        │ notes        │        │ type         │          │
│  │ started_at   │        │ evidence_urls│        │ credentials  │          │
│  │ completed_at │        └──────────────┘        │ status       │          │
│  │ report_url   │                                │ last_sync    │          │
│  └──────────────┘                                └──────────────┘          │
│                                                                               │
│  ┌──────────────┐        ┌──────────────┐        ┌──────────────┐          │
│  │subscriptions │        │  invoices    │        │  webhook_logs│          │
│  │──────────────│        │──────────────│        │──────────────│          │
│  │ id (PK)      │        │ id (PK)      │        │ id (PK)      │          │
│  │ company_id   │        │ company_id   │        │ company_id   │          │
│  │ stripe_sub_id│        │ subscription_id│      │ event_type   │          │
│  │ tier         │        │ amount       │        │ payload      │          │
│  │ status       │        │ currency     │        │ status       │          │
│  │ current_period│       │ status       │        │ response_code│          │
│  │ cancel_at    │        │ paid_at      │        │ created_at   │          │
│  └──────────────┘        └──────────────┘        └──────────────┘          │
│                                                                               │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │                         AUDIT LOGS                                │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │  activity_logs - All entity changes for compliance auditing       │    │
│  │  access_logs   - Authentication and authorization events          │    │
│  └────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Tables

### 2.1 Companies

Central entity representing a customer organization.

```sql
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    
    -- Tier and billing
    tier VARCHAR(20) NOT NULL CHECK (tier IN ('lite', 'starter', 'pro', 'enterprise')),
    billing_cycle VARCHAR(10) NOT NULL DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'annual')),
    stripe_customer_id VARCHAR(100),
    
    -- Company profile
    industry VARCHAR(100),
    employee_count INTEGER CHECK (employee_count > 0),
    website VARCHAR(255),
    description TEXT,
    
    -- Compliance settings
    gdpr_enabled BOOLEAN DEFAULT false,
    soc2_enabled BOOLEAN DEFAULT false,
    iso27001_enabled BOOLEAN DEFAULT false,
    
    -- Feature limits (enforced at application layer)
    max_frameworks INTEGER NOT NULL DEFAULT 1,
    max_users INTEGER NOT NULL DEFAULT 3,
    max_storage_gb INTEGER NOT NULL DEFAULT 10,
    
    -- Settings (JSON for flexibility)
    settings JSONB DEFAULT '{}',
    
    -- Status
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'cancelled')),
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    -- Metadata
    created_by UUID,
    updated_by UUID
);

-- Indexes
CREATE INDEX idx_companies_tier ON companies(tier);
CREATE INDEX idx_companies_status ON companies(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_companies_stripe ON companies(stripe_customer_id);
CREATE INDEX idx_companies_created ON companies(created_at);

-- Partial index for active companies
CREATE INDEX idx_companies_active ON companies(id) WHERE deleted_at IS NULL AND status = 'active';
```

### 2.2 Users

Users within a company with role-based access.

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    
    -- Authentication (Auth0)
    auth0_id VARCHAR(100) UNIQUE,
    email VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT false,
    
    -- Profile
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(50),
    avatar_url TEXT,
    
    -- Role and permissions
    role VARCHAR(30) NOT NULL DEFAULT 'viewer' CHECK (role IN ('owner', 'admin', 'compliance_manager', 'auditor', 'viewer')),
    
    -- Status
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
    last_login_at TIMESTAMPTZ,
    
    -- MFA
    mfa_enabled BOOLEAN DEFAULT false,
    mfa_method VARCHAR(20) CHECK (mfa_method IN ('totp', 'sms', 'email', null)),
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    
    -- Metadata
    created_by UUID,
    updated_by UUID,
    
    -- Constraints
    CONSTRAINT unique_email_per_company UNIQUE (company_id, email)
);

-- Indexes
CREATE INDEX idx_users_company ON users(company_id);
CREATE INDEX idx_users_auth0 ON users(auth0_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_active ON users(id, company_id) WHERE deleted_at IS NULL AND status = 'active';
```

### 2.3 Sessions

Active user sessions for security and audit.

```sql
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Session details
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    refresh_token_hash VARCHAR(255),
    
    -- Device info
    ip_address INET,
    user_agent TEXT,
    device_fingerprint VARCHAR(255),
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_activity_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    
    -- Status
    revoked BOOLEAN DEFAULT false,
    revoked_at TIMESTAMPTZ,
    revoked_reason VARCHAR(100)
);

-- Indexes
CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(token_hash);
CREATE INDEX idx_sessions_expires ON sessions(expires_at) WHERE revoked = false;
CREATE INDEX idx_sessions_active ON sessions(user_id) WHERE revoked = false AND expires_at > NOW();
```

### 2.4 Invitations

Pending user invitations.

```sql
CREATE TABLE invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    
    -- Invitation details
    email VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'viewer',
    
    -- Token (hashed)
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    
    -- Expiration
    expires_at TIMESTAMPTZ NOT NULL,
    
    -- Usage
    used_at TIMESTAMPTZ,
    used_by UUID REFERENCES users(id),
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID NOT NULL REFERENCES users(id),
    
    -- Constraints
    CONSTRAINT unique_pending_email_per_company UNIQUE (company_id, email)
);

-- Indexes
CREATE INDEX idx_invitations_company ON invitations(company_id);
CREATE INDEX idx_invitations_token ON invitations(token_hash);
CREATE INDEX idx_invitations_email ON invitations(email);
CREATE INDEX idx_invitations_expires ON invitations(expires_at) WHERE used_at IS NULL;
```

---

## 3. Compliance Tables

### 3.1 Frameworks

Compliance frameworks being pursued by a company.

```sql
CREATE TYPE framework_type AS ENUM ('soc2_type1', 'soc2_type2', 'iso27001', 'gdpr');
CREATE TYPE framework_status AS ENUM ('not_started', 'in_progress', 'ready_for_audit', 'audit_scheduled', 'certified', 'expired');

CREATE TABLE frameworks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    
    -- Framework details
    type framework_type NOT NULL,
    status framework_status NOT NULL DEFAULT 'not_started',
    
    -- Timeline
    target_date DATE,
    start_date DATE,
    certification_date DATE,
    expiration_date DATE,
    
    -- Progress tracking
    total_controls INTEGER NOT NULL DEFAULT 0,
    implemented_controls INTEGER NOT NULL DEFAULT 0,
    percentage_complete INTEGER GENERATED ALWAYS AS (
        CASE WHEN total_controls > 0 
            THEN ROUND((implemented_controls::numeric / total_controls) * 100)
            ELSE 0
        END
    ) STORED,
    
    -- Settings
    settings JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_frameworks_company ON frameworks(company_id);
CREATE INDEX idx_frameworks_type ON frameworks(type);
CREATE INDEX idx_frameworks_status ON frameworks(status);
CREATE INDEX idx_frameworks_target ON frameworks(target_date);
CREATE INDEX idx_frameworks_cert_date ON frameworks(certification_date);
```

### 3.2 Controls

Individual compliance controls within a framework.

```sql
CREATE TYPE control_status AS ENUM ('not_started', 'in_progress', 'implemented', 'tested', 'exempt', 'not_applicable');
CREATE TYPE control_priority AS ENUM ('critical', 'high', 'medium', 'low');

CREATE TABLE controls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    framework_id UUID NOT NULL REFERENCES frameworks(id) ON DELETE CASCADE,
    
    -- Control identification
    code VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Framework-specific mapping
    framework_reference VARCHAR(100), -- e.g., "SOC2 CC6.1", "ISO 27001 A.12.3"
    category VARCHAR(100), -- e.g., "Access Control", "Encryption"
    
    -- Status and priority
    status control_status NOT NULL DEFAULT 'not_started',
    priority control_priority NOT NULL DEFAULT 'medium',
    
    -- Assignment
    assigned_to UUID REFERENCES users(id),
    
    -- Timeline
    due_date DATE,
    implemented_at TIMESTAMPTZ,
    tested_at TIMESTAMPTZ,
    
    -- Automation
    auto_check BOOLEAN DEFAULT false,
    auto_check_config JSONB, -- Configuration for automated checks
    last_auto_check_at TIMESTAMPTZ,
    last_auto_check_result BOOLEAN,
    
    -- Evidence requirements
    evidence_required BOOLEAN DEFAULT true,
    evidence_types JSONB, -- ['policy', 'screenshot', 'configuration']
    
    -- Notes
    implementation_notes TEXT,
    testing_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id),
    
    -- Constraints
    CONSTRAINT unique_control_code_per_framework UNIQUE (framework_id, code)
);

-- Indexes
CREATE INDEX idx_controls_framework ON controls(framework_id);
CREATE INDEX idx_controls_status ON controls(status);
CREATE INDEX idx_controls_priority ON controls(priority);
CREATE INDEX idx_controls_assigned ON controls(assigned_to);
CREATE INDEX idx_controls_due ON controls(due_date);
CREATE INDEX idx_controls_category ON controls(category);
CREATE INDEX idx_controls_auto ON controls(auto_check) WHERE auto_check = true;
```

### 3.3 Evidence

Evidence uploaded to support control implementation.

```sql
CREATE TYPE evidence_type AS ENUM ('policy', 'procedure', 'screenshot', 'configuration', 'audit_log', 'training_record', 'vendor_doc', 'other');
CREATE TYPE evidence_status AS ENUM ('pending', 'approved', 'rejected', 'expired');

CREATE TABLE evidence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    control_id UUID NOT NULL REFERENCES controls(id) ON DELETE CASCADE,
    
    -- Evidence details
    type evidence_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- File storage
    file_key VARCHAR(500) NOT NULL, -- S3 object key
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    file_mime_type VARCHAR(100),
    file_hash VARCHAR(64), -- SHA-256 for integrity
    
    -- Storage
    storage_path VARCHAR(500) NOT NULL,
    thumbnail_key VARCHAR(500), -- For images/documents
    
    -- Status and review
    status evidence_status NOT NULL DEFAULT 'pending',
    reviewed_by UUID REFERENCES users(id),
    reviewed_at TIMESTAMPTZ,
    review_notes TEXT,
    
    -- Validity period
    valid_from DATE,
    valid_until DATE,
    
    -- Metadata
    metadata JSONB DEFAULT '{}', -- Additional parsed metadata
    source VARCHAR(100), -- e.g., "manual_upload", "integration", "auto_check"
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    uploaded_by UUID NOT NULL REFERENCES users(id),
    
    -- Constraints
    CONSTRAINT valid_file_size CHECK (file_size > 0 AND file_size <= 104857600) -- Max 100MB
);

-- Indexes
CREATE INDEX idx_evidence_control ON evidence(control_id);
CREATE INDEX idx_evidence_status ON evidence(status);
CREATE INDEX idx_evidence_type ON evidence(type);
CREATE INDEX idx_evidence_uploaded ON evidence(uploaded_by);
CREATE INDEX idx_evidence_created ON evidence(created_at);
CREATE INDEX idx_evidence_valid ON evidence(valid_until) WHERE valid_until IS NOT NULL;
CREATE INDEX idx_evidence_pending ON evidence(id) WHERE status = 'pending';
```

### 3.4 Tasks

Tasks related to control implementation.

```sql
CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'in_review', 'completed', 'blocked', 'cancelled');

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    control_id UUID REFERENCES controls(id) ON DELETE SET NULL,
    
    -- Task details
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status task_status NOT NULL DEFAULT 'todo',
    
    -- Assignment
    assignee_id UUID REFERENCES users(id),
    creator_id UUID NOT NULL REFERENCES users(id),
    
    -- Timeline
    due_date DATE,
    completed_at TIMESTAMPTZ,
    
    -- Priority
    priority control_priority NOT NULL DEFAULT 'medium',
    
    -- Relationships
    parent_task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_tasks_control ON tasks(control_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_assignee ON tasks(assignee_id);
CREATE INDEX idx_tasks_creator ON tasks(creator_id);
CREATE INDEX idx_tasks_due ON tasks(due_date);
CREATE INDEX idx_tasks_parent ON tasks(parent_task_id);
CREATE INDEX idx_tasks_active ON tasks(id) WHERE status NOT IN ('completed', 'cancelled');
```

### 3.5 Comments

Comments on controls and evidence.

```sql
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Polymorphic reference (control or evidence)
    entity_type VARCHAR(20) NOT NULL CHECK (entity_type IN ('control', 'evidence')),
    entity_id UUID NOT NULL,
    
    -- Comment details
    content TEXT NOT NULL,
    
    -- Author
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Threading
    parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_comments_entity ON comments(entity_type, entity_id);
CREATE INDEX idx_comments_user ON comments(user_id);
CREATE INDEX idx_comments_parent ON comments(parent_comment_id);
CREATE INDEX idx_comments_created ON comments(created_at);
```

---

## 4. Audit Tables

### 4.1 Audits

External audit engagements.

```sql
CREATE TYPE audit_status AS ENUM ('scheduled', 'in_progress', 'pending_evidence', 'under_review', 'completed', 'passed', 'failed', 'cancelled');
CREATE TYPE audit_type AS ENUM ('internal', 'external', 'partner');

CREATE TABLE audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    framework_id UUID NOT NULL REFERENCES frameworks(id) ON DELETE CASCADE,
    
    -- Audit details
    type audit_type NOT NULL DEFAULT 'external',
    status audit_status NOT NULL DEFAULT 'scheduled',
    
    -- Partner/auditor
    partner_id UUID REFERENCES partners(id),
    auditor_name VARCHAR(255),
    auditor_email VARCHAR(255),
    
    -- Timeline
    scheduled_date DATE,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    
    -- Results
    result VARCHAR(50), -- 'pass', 'pass_with_exceptions', 'fail'
    findings TEXT,
    recommendations TEXT,
    
    -- Documents
    report_url TEXT,
    certificate_url TEXT,
    
    -- Cost tracking
    cost_currency VARCHAR(3) DEFAULT 'EUR',
    cost_amount DECIMAL(10, 2),
    
    -- Notes
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_audits_company ON audits(company_id);
CREATE INDEX idx_audits_framework ON audits(framework_id);
CREATE INDEX idx_audits_partner ON audits(partner_id);
CREATE INDEX idx_audits_status ON audits(status);
CREATE INDEX idx_audits_scheduled ON audits(scheduled_date);
```

### 4.2 Audit Items

Individual control findings during an audit.

```sql
CREATE TYPE audit_item_status AS ENUM ('pending', 'pass', 'fail', 'exception', 'not_tested');

CREATE TABLE audit_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    audit_id UUID NOT NULL REFERENCES audits(id) ON DELETE CASCADE,
    control_id UUID NOT NULL REFERENCES controls(id) ON DELETE CASCADE,
    
    -- Finding details
    status audit_item_status NOT NULL DEFAULT 'pending',
    notes TEXT,
    
    -- Evidence references
    evidence_urls JSONB, -- Array of evidence file URLs
    
    -- Remediation
    remediation_required BOOLEAN DEFAULT false,
    remediation_notes TEXT,
    remediation_due_date DATE,
    remediated_at TIMESTAMPTZ,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_audit_items_audit ON audit_items(audit_id);
CREATE INDEX idx_audit_items_control ON audit_items(control_id);
CREATE INDEX idx_audit_items_status ON audit_items(status);
```

---

## 5. Partner Tables

### 5.1 Partners

CPA firm and partner integrations.

```sql
CREATE TYPE partner_type AS ENUM ('cpa_firm', 'consultant', 'technology');
CREATE TYPE partner_status AS ENUM ('pending', 'active', 'suspended', 'terminated');

CREATE TABLE partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE, -- Null for system-wide partners
    
    -- Partner details
    name VARCHAR(255) NOT NULL,
    type partner_type NOT NULL,
    status partner_status NOT NULL DEFAULT 'pending',
    
    -- Contact
    contact_name VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    
    -- Integration
    api_endpoint VARCHAR(500),
    webhook_url VARCHAR(500),
    credentials JSONB, -- Encrypted API keys
    
    -- Revenue share
    revenue_share_percent DECIMAL(5, 2), -- e.g., 15.00 for 15%
    
    -- Settings
    settings JSONB DEFAULT '{}',
    
    -- Integration status
    last_sync_at TIMESTAMPTZ,
    sync_status VARCHAR(50),
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_partners_company ON partners(company_id);
CREATE INDEX idx_partners_type ON partners(type);
CREATE INDEX idx_partners_status ON partners(status);
CREATE INDEX idx_partners_active ON partners(id) WHERE status = 'active';
```

### 5.2 Webhook Logs

Incoming webhook logs from partners.

```sql
CREATE TABLE webhook_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    partner_id UUID REFERENCES partners(id),
    
    -- Request details
    event_type VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    signature VARCHAR(500), -- For verification
    
    -- Response
    status VARCHAR(20) NOT NULL, -- 'success', 'error', 'retry'
    response_code INTEGER,
    response_body TEXT,
    
    -- Processing
    processed_at TIMESTAMPTZ,
    retry_count INTEGER DEFAULT 0,
    error_message TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_webhook_logs_company ON webhook_logs(company_id);
CREATE INDEX idx_webhook_logs_partner ON webhook_logs(partner_id);
CREATE INDEX idx_webhook_logs_event ON webhook_logs(event_type);
CREATE INDEX idx_webhook_logs_status ON webhook_logs(status);
CREATE INDEX idx_webhook_logs_created ON webhook_logs(created_at);
```

---

## 6. Billing Tables

### 6.1 Subscriptions

Stripe subscription tracking.

```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    
    -- Stripe references
    stripe_subscription_id VARCHAR(100) UNIQUE,
    stripe_price_id VARCHAR(100),
    
    -- Plan details
    tier VARCHAR(20) NOT NULL,
    billing_cycle VARCHAR(10) NOT NULL,
    
    -- Pricing
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    
    -- Status
    status VARCHAR(20) NOT NULL CHECK (status IN ('trialing', 'active', 'past_due', 'canceled', 'paused')),
    
    -- Period
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    
    -- Cancellation
    cancel_at_period_end BOOLEAN DEFAULT false,
    canceled_at TIMESTAMPTZ,
    cancellation_reason VARCHAR(255),
    
    -- Trial
    trial_start TIMESTAMPTZ,
    trial_end TIMESTAMPTZ,
    
    -- Metadata
    stripe_metadata JSONB,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_subscriptions_company ON subscriptions(company_id);
CREATE INDEX idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
```

### 6.2 Invoices

Invoice records.

```sql
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    subscription_id UUID REFERENCES subscriptions(id),
    
    -- Stripe reference
    stripe_invoice_id VARCHAR(100) UNIQUE,
    stripe_charge_id VARCHAR(100),
    
    -- Invoice details
    invoice_number VARCHAR(100) UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    
    -- Status
    status VARCHAR(20) NOT NULL CHECK (status IN ('draft', 'open', 'paid', 'uncollectible', 'void')),
    paid_at TIMESTAMPTZ,
    
    -- Period
    period_start TIMESTAMPTZ,
    period_end TIMESTAMPTZ,
    
    -- URLs
    invoice_pdf_url TEXT,
    receipt_url TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_invoices_company ON invoices(company_id);
CREATE INDEX idx_invoices_subscription ON invoices(subscription_id);
CREATE INDEX idx_invoices_status ON invoices(status);
```

---

## 7. Audit Logging Tables

### 7.1 Activity Logs

Comprehensive audit trail of all entity changes.

```sql
CREATE TYPE activity_action AS ENUM ('create', 'update', 'delete', 'view', 'export', 'login', 'logout', 'invite', 'approve', 'reject');

CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Actor
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    user_email VARCHAR(255),
    impersonated_by UUID, -- For admin actions
    
    -- Target
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    entity_type VARCHAR(50) NOT NULL, -- 'user', 'control', 'evidence', etc.
    entity_id UUID,
    
    -- Action
    action activity_action NOT NULL,
    description TEXT,
    
    -- Change details
    previous_values JSONB,
    new_values JSONB,
    
    -- Context
    ip_address INET,
    user_agent TEXT,
    session_id UUID,
    request_id VARCHAR(100),
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_activity_logs_company ON activity_logs(company_id);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);

-- Partitioning by month recommended for high volume
-- CREATE TABLE activity_logs_2024_01 PARTITION OF activity_logs ...
```

### 7.2 Access Logs

Authentication and access events.

```sql
CREATE TYPE access_event_type AS ENUM ('login_success', 'login_failure', 'logout', 'mfa_challenge', 'mfa_success', 'mfa_failure', 'password_reset', 'session_expired', 'permission_denied');

CREATE TABLE access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- User (may be null for failed logins)
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    email_attempted VARCHAR(255),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    
    -- Event
    event_type access_event_type NOT NULL,
    description TEXT,
    
    -- Context
    ip_address INET,
    user_agent TEXT,
    device_fingerprint VARCHAR(255),
    
    -- Failure details
    failure_reason VARCHAR(255),
    
    -- MFA
    mfa_method VARCHAR(20),
    mfa_success BOOLEAN,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_access_logs_company ON access_logs(company_id);
CREATE INDEX idx_access_logs_user ON access_logs(user_id);
CREATE INDEX idx_access_logs_event ON access_logs(event_type);
CREATE INDEX idx_access_logs_ip ON access_logs(ip_address);
CREATE INDEX idx_access_logs_created ON access_logs(created_at);
```

---

## 8. Multi-Tenancy Implementation

### 8.1 Schema Management

```sql
-- Function to create tenant schema
CREATE OR REPLACE FUNCTION create_tenant_schema(tenant_id UUID)
RETURNS void AS $$
DECLARE
    schema_name TEXT := 'tenant_' || replace(tenant_id::text, '-', '_');
BEGIN
    -- Create schema
    EXECUTE format('CREATE SCHEMA IF NOT EXISTS %I', schema_name);
    
    -- Grant usage
    EXECUTE format('GRANT USAGE ON SCHEMA %I TO app_role', schema_name);
    
    -- Create tables in tenant schema
    EXECUTE format('
        CREATE TABLE IF NOT EXISTS %I.companies (LIKE public.companies INCLUDING ALL);
        CREATE TABLE IF NOT EXISTS %I.users (LIKE public.users INCLUDING ALL);
        -- ... etc for all tables
    ', schema_name);
END;
$$ LANGUAGE plpgsql;
```

### 8.2 Row Level Security

For shared schema approach (alternative to schema-per-tenant):

```sql
-- Enable RLS on all tenant tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE frameworks ENABLE ROW LEVEL SECURITY;
-- ... etc

-- Create policy function
CREATE OR REPLACE FUNCTION get_current_tenant_id()
RETURNS UUID AS $$
BEGIN
    -- Set by application via SET LOCAL
    RETURN current_setting('app.current_tenant', true)::UUID;
END;
$$ LANGUAGE plpgsql;

-- Create RLS policies
CREATE POLICY tenant_isolation ON companies
    USING (id = get_current_tenant_id());

CREATE POLICY tenant_isolation ON users
    USING (company_id = get_current_tenant_id());

CREATE POLICY tenant_isolation ON frameworks
    USING (company_id = get_current_tenant_id());
```

---

## 9. Indexes Summary

### Performance-Critical Indexes

```sql
-- Composite indexes for common query patterns
CREATE INDEX idx_frameworks_company_status ON frameworks(company_id, status);
CREATE INDEX idx_controls_framework_status ON controls(framework_id, status);
CREATE INDEX idx_evidence_control_status ON evidence(control_id, status);
CREATE INDEX idx_tasks_assignee_status ON tasks(assignee_id, status);

-- Full-text search indexes
CREATE INDEX idx_controls_search ON controls USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));
CREATE INDEX idx_evidence_search ON evidence USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- JSONB indexes
CREATE INDEX idx_companies_settings ON companies USING gin(settings);
CREATE INDEX idx_controls_auto_config ON controls USING gin(auto_check_config);
CREATE INDEX idx_evidence_metadata ON evidence USING gin(metadata);
```

---

## 10. Data Retention Policies

### GDPR Compliance

```sql
-- Soft delete function
CREATE OR REPLACE FUNCTION soft_delete_company(company_id UUID)
RETURNS void AS $$
BEGIN
    -- Soft delete all related records
    UPDATE companies SET deleted_at = NOW(), status = 'cancelled' WHERE id = company_id;
    UPDATE users SET deleted_at = NOW(), status = 'inactive' WHERE company_id = company_id;
    -- Evidence files will be purged after retention period
    
    -- Log the deletion
    INSERT INTO activity_logs (company_id, entity_type, entity_id, action, description)
    VALUES (company_id, 'company', company_id, 'delete', 'Company account deleted (GDPR request)');
END;
$$ LANGUAGE plpgsql;

-- Data purge function (run by scheduled job after retention period)
CREATE OR REPLACE FUNCTION purge_deleted_data()
RETURNS void AS $$
BEGIN
    -- Permanently delete records soft-deleted > 30 days ago
    -- (or longer per legal requirements)
    DELETE FROM companies WHERE deleted_at < NOW() - INTERVAL '30 days';
    -- Cascading deletes will handle related records
END;
$$ LANGUAGE plpgsql;
```

### Evidence Retention

| Evidence Type | Retention Period | Rationale |
|---------------|------------------|-----------|
| SOC 2 Evidence | 7 years | Audit requirements |
| ISO 27001 Evidence | 7 years | Certification requirements |
| GDPR Evidence | Duration of processing + 3 years | Legal requirements |
| Access Logs | 1 year | Security monitoring |
| Activity Logs | 7 years | Compliance audit trail |

---

## 11. Database Migration Strategy

### Migration Framework

Use Prisma Migrate for schema versioning:

```bash
# Generate migration
npx prisma migrate dev --name add_framework_type

# Apply to production
npx prisma migrate deploy
```

### Zero-Downtime Migrations

1. **Add new columns** as nullable with defaults
2. **Backfill data** in background job
3. **Add constraints** after backfill completes
4. **Remove old columns** in subsequent release

---

## 12. Connection Pooling

### PgBouncer Configuration

```ini
[databases]
certfast = host=prod-cluster.cluster-xxx.eu-west-1.rds.amazonaws.com port=5432 dbname=certfast

[pgbouncer]
listen_port = 6432
listen_addr = 0.0.0.0
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt

# Pool settings
pool_mode = transaction
max_client_conn = 10000
default_pool_size = 25
min_pool_size = 5
reserve_pool_size = 5
```

---

**Document Complete**  
**Next**: API Specification
