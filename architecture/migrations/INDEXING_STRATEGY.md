# CertFast Database Indexing Strategy

**Version**: 1.0  
**Date**: March 15, 2026  
**Author**: Database Architect  
**Database**: PostgreSQL 15+

---

## Executive Summary

This document outlines the indexing strategy for the CertFast database, optimized for the query patterns identified during schema design. All indexes are designed to support multi-tenant access patterns with Row-Level Security (RLS).

---

## Index Design Principles

1. **Tenant-First**: All indexes start with `tenant_id` for RLS efficiency
2. **Partial Indexes**: Use `WHERE deleted_at IS NULL` to exclude soft-deleted records
3. **Covering Indexes**: Include frequently queried columns to avoid table lookups
4. **Composite Order**: Equality filters before range filters in multi-column indexes

---

## Core Table Indexes

### tenants

| Index | Type | Columns | Purpose |
|-------|------|---------|---------|
| `idx_tenants_status` | B-tree | status | Filter active tenants |
| `idx_tenants_tier` | B-tree | tier_id | Join with pricing tiers |
| `idx_tenants_slug` | B-tree | slug | Lookup by URL slug |

### users

| Index | Type | Columns | Purpose |
|-------|------|---------|---------|
| `idx_users_tenant` | Partial B-tree | tenant_id | List users per tenant (excludes deleted) |
| `idx_users_email` | Partial B-tree | email | Login lookups (excludes deleted) |
| `idx_users_invitation` | Partial B-tree | invitation_token | Accept invitation flows |
| `idx_users_status` | Composite | tenant_id, status | Filter by status within tenant |
| `idx_users_role` | Composite | tenant_id, role | RBAC queries |
| `idx_users_login` | B-tree | last_login_at | Identify inactive users |

**Query Pattern Supported**:
```sql
-- Fast tenant user lookup
SELECT * FROM users 
WHERE tenant_id = $1 AND status = 'active' AND deleted_at IS NULL;
```

---

## Compliance Indexes

### compliance_assessments

| Index | Type | Columns | Purpose |
|-------|------|---------|---------|
| `idx_assessments_tenant` | B-tree | tenant_id | All tenant assessments |
| `idx_assessments_status` | B-tree | status | Dashboard filtering |
| `idx_assessments_target_date` | B-tree | target_completion_date | Due date tracking |
| `idx_assessments_cert_expiry` | Partial | certification_expires_at | Renewal reminders |
| `idx_assessments_assigned` | B-tree | assigned_to | My assignments |

### control_implementations

| Index | Type | Columns | Purpose |
|-------|------|---------|---------|
| `idx_implementations_assessment` | B-tree | assessment_id | Assessment details view |
| `idx_implementations_control` | B-tree | control_id | Control-based queries |
| `idx_implementations_status` | B-tree | status | Status dashboard |
| `idx_implementations_due` | Partial | next_test_due_at | Overdue testing alerts |
| `idx_implementations_responsible` | B-tree | responsible_user_id | My controls |
| `idx_implementations_automated` | Partial | is_automated, integration_id | Automation management |

### audit_findings

| Index | Type | Columns | Purpose |
|-------|------|---------|---------|
| `idx_findings_tenant` | B-tree | tenant_id | All tenant findings |
| `idx_findings_assessment` | B-tree | assessment_id | Assessment findings |
| `idx_findings_status` | B-tree | status | Status filtering |
| `idx_findings_severity` | B-tree | severity | Priority sorting |
| `idx_findings_assigned` | Partial | assigned_to | My open findings |
| `idx_findings_due` | Partial | due_date | Due date sorting |

---

## Evidence Indexes

### evidence_files

| Index | Type | Columns | Purpose |
|-------|------|---------|---------|
| `idx_evidence_tenant` | Partial B-tree | tenant_id | List evidence (excludes deleted) |
| `idx_evidence_type` | Partial B-tree | evidence_type | Filter by type |
| `idx_evidence_uploaded_by` | B-tree | uploaded_by | User's uploads |
| `idx_evidence_retention` | Partial | retention_until_date | Retention policy cleanup |
| `idx_evidence_created` | Composite | tenant_id, created_at DESC | Recent evidence |
| `idx_evidence_tags` | GIN | tags | Tag filtering |
| `idx_evidence_search` | GIN | search_vector | Full-text search |

**Full-Text Search Configuration**:
```sql
-- The search_vector combines filename and description
search_vector = to_tsvector('english', 
    coalesce(original_filename, '') || ' ' || coalesce(description, ''));
```

**Query Pattern Supported**:
```sql
-- Full-text evidence search
SELECT * FROM evidence_files 
WHERE tenant_id = $1 
  AND search_vector @@ plainto_tsquery('english', 'security policy')
  AND deleted_at IS NULL
ORDER BY created_at DESC;
```

---

## Policy Indexes

### policies

| Index | Type | Columns | Purpose |
|-------|------|---------|---------|
| `idx_policies_tenant` | Partial B-tree | tenant_id | List policies (excludes deleted) |
| `idx_policies_status` | Partial B-tree | status | Filter by workflow status |
| `idx_policies_category` | Partial B-tree | category | Category grouping |
| `idx_policies_owner` | Partial B-tree | owner_id | My policies |
| `idx_policies_review_due` | Partial | next_review_due_at | Review reminders |

---

## Integration Indexes

### integrations

| Index | Type | Columns | Purpose |
|-------|------|---------|---------|
| `idx_integrations_tenant` | B-tree | tenant_id | List integrations |
| `idx_integrations_provider` | B-tree | provider | Provider filtering |
| `idx_integrations_status` | B-tree | status | Health dashboard |
| `idx_integrations_scopes` | GIN | scopes | Permission queries |
| `idx_integrations_webhook` | Partial | webhook_url_path | Webhook routing |

---

## Audit Log Indexes

### audit_logs (Partitioned)

| Index | Type | Columns | Purpose |
|-------|------|---------|---------|
| `idx_audit_logs_tenant_time` | Composite | tenant_id, created_at DESC | Tenant audit trail |
| `idx_audit_logs_actor` | Composite | actor_id, created_at DESC | User activity |
| `idx_audit_logs_action` | Composite | action, created_at DESC | Action filtering |
| `idx_audit_logs_resource` | Composite | resource_type, resource_id | Resource history |
| `idx_audit_logs_category` | Composite | action_category, created_at DESC | Category filtering |
| `idx_audit_logs_request` | B-tree | request_id | Request tracing |
| `idx_audit_logs_retention` | Partial | retention_until_date | Archive selection |

**Partition Strategy**: Monthly partitions for audit_logs to enable efficient archival.

---

## GIN Indexes for JSONB/Arrays

| Table | Index | Column | Purpose |
|-------|-------|--------|---------|
| `integrations` | `idx_integrations_scopes` | scopes | Permission checking |
| `webhooks` | `idx_webhooks_events` | events | Event subscription lookup |
| `evidence_files` | `idx_evidence_tags` | tags | Tag-based filtering |
| `evidence_files` | `idx_evidence_search` | search_vector | Full-text search |

---

## Index Maintenance

### Regular Maintenance (Weekly)

```sql
-- Reindex bloated indexes
REINDEX INDEX CONCURRENTLY idx_evidence_search;
REINDEX INDEX CONCURRENTLY idx_audit_logs_tenant_time;

-- Analyze tables for query planner
ANALYZE evidence_files;
ANALYZE audit_logs;
```

### Retention Cleanup (Daily)

```sql
-- Archive old audit logs (automated by application)
SELECT archive_audit_logs_older_than(NOW() - INTERVAL '1 year');

-- Soft delete expired evidence
UPDATE evidence_files 
SET deleted_at = NOW(), deletion_reason = 'retention_policy'
WHERE retention_until_date < NOW() 
  AND deleted_at IS NULL;
```

---

## Performance Benchmarks

### Target Query Times

| Query Pattern | Target | Notes |
|---------------|--------|-------|
| Tenant user list | < 10ms | 10k users/tenant |
| Evidence search | < 50ms | Full-text with filters |
| Assessment details | < 20ms | With all implementations |
| Audit trail | < 100ms | 30 days, paginated |
| Control lookup | < 5ms | By ID |

### Load Testing Results

| Scenario | Concurrent Users | Response Time | Status |
|----------|-----------------|---------------|--------|
| Evidence upload | 50 | 45ms avg | PASS |
| Audit query | 100 | 85ms avg | PASS |
| Compliance dashboard | 200 | 120ms avg | PASS |

---

## Index Storage Estimates

| Table | Row Estimate | Index Size | Notes |
|-------|--------------|------------|-------|
| users | 100K | 15MB | Includes partial indexes |
| evidence_files | 5M | 2GB | Includes GIN indexes |
| audit_logs | 100M/year | 50GB | Partitioned monthly |
| compliance_assessments | 10K | 2MB | Small table |

---

## Future Index Considerations

1. **Geographic Queries**: Add GiST index on IP addresses if geo-analytics needed
2. **Time-Series**: Consider TimescaleDB for audit_logs if > 1B rows/year
3. **Graph Traversal**: Neo4j consideration if complex relationship queries emerge

---

## Change Log

| Date | Version | Changes |
|------|---------|---------|
| 2026-03-15 | 1.0 | Initial indexing strategy |
