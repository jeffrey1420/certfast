# CertFast Data Retention Policy

**Version**: 1.0  
**Date**: March 15, 2026  
**Author**: Database Architect  
**Classification**: Compliance Document

---

## Overview

This document defines data retention policies for the CertFast platform, ensuring compliance with GDPR Article 5(1)(e), SOC 2 CC6.1, and ISO 27001 A.8.1.3 requirements.

---

## Retention Framework

### Retention Categories

| Category | Description | Legal Basis |
|----------|-------------|-------------|
| **Compliance** | Audit logs, compliance records | Regulatory requirement |
| **Contractual** | Subscription, billing data | Contract performance |
| **Operational** | User activity, system logs | Legitimate interest |
| **Transient** | Session data, temp files | Minimal retention |

---

## Retention Periods by Data Type

### Compliance Data (7 Years)

| Data Type | Retention | Justification |
|-----------|-----------|---------------|
| Audit logs | 7 years | SOX, SOC 2, ISO 27001 requirements |
| Compliance assessments | 7 years | Audit trail for certifications |
| Evidence files | Per tier / 7 years min | Compliance evidence retention |
| Policy versions | 7 years | Version control for audits |
| Policy acknowledgments | 7 years | Proof of training compliance |
| Audit findings | 7 years | Remediation tracking |

**Storage**: After 1 year, move to S3 Glacier for cost optimization.

### User & Account Data (Duration of Relationship + 2 Years)

| Data Type | Retention | Justification |
|-----------|-----------|---------------|
| User profiles | Account lifetime + 2 years | Business necessity |
| User sessions | 30 days | Security monitoring |
| Login attempts | 90 days | Fraud detection |
| Password reset tokens | Until used + 24h | Security token lifetime |
| API keys | Until revoked + 1 year | Audit trail |

### Subscription & Billing Data (7 Years)

| Data Type | Retention | Justification |
|-----------|-----------|---------------|
| Subscription history | 7 years | Tax and accounting requirements |
| Invoices | 7 years | Legal requirement (EU) |
| Payment methods | Until deleted + 90 days | PCI DSS compliance |
| Usage records | 2 years | Billing disputes |

### Integration Data (1 Year)

| Data Type | Retention | Justification |
|-----------|-----------|---------------|
| Integration sync logs | 1 year | Troubleshooting |
| Webhook delivery logs | 30 days | Debug delivery issues |
| Incoming webhook events | 30 days | Processing verification |

### Communication Data (1 Year)

| Data Type | Retention | Justification |
|-----------|-----------|---------------|
| Notifications | 90 days | User reference |
| Support tickets | 3 years | Customer service |

---

## Tier-Specific Evidence Retention

| Tier | Evidence Retention | Max Evidence Files |
|------|-------------------|-------------------|
| Lite | 365 days | 100 |
| Starter | 1,095 days (3 years) | 1,000 |
| Pro | 2,555 days (7 years) | 10,000 |
| Enterprise | Unlimited | Unlimited |

**Automatic Enforcement**:
- Daily job calculates `retention_until_date` for new evidence
- Soft delete when retention expires (30-day grace period)
- Hard delete from S3 after grace period

---

## GDPR Compliance Procedures

### Right to Erasure (Article 17)

```sql
-- Execute GDPR deletion for a tenant
SELECT gdpr_delete_tenant('tenant-uuid-here');
```

**What Gets Deleted**:
- All user PII (names, emails, phone numbers)
- Evidence file metadata (files deleted from S3 separately)
- Policy content
- Integration credentials

**What Is Retained (Anonymized)**:
- Audit logs (actor_email redacted, metadata cleared)
- Compliance timestamps (for regulatory reporting)

**Timeline**: Complete within 30 days of request.

### Data Portability (Article 20)

```sql
-- Export tenant data
SELECT gdpr_export_tenant('tenant-uuid-here');
```

**Export Includes**:
- All user data
- All compliance records
- All evidence metadata (not files - separate process)
- All policies and versions
- All audit logs

**Format**: JSON export with schema documentation.

### Data Retention Limits (Article 5(1)(e))

Automated enforcement of retention limits:

```sql
-- Daily cleanup job
DELETE FROM user_sessions WHERE created_at < NOW() - INTERVAL '30 days';
DELETE FROM webhook_delivery_logs WHERE created_at < NOW() - INTERVAL '30 days';
DELETE FROM integration_sync_logs WHERE created_at < NOW() - INTERVAL '1 year';

-- Soft delete expired evidence
UPDATE evidence_files 
SET deleted_at = NOW(), deletion_reason = 'retention_policy'
WHERE retention_until_date < NOW() AND deleted_at IS NULL;
```

---

## Data Archival Strategy

### Hot Storage (PostgreSQL)

- Active data: < 1 year old
- Query latency: < 10ms
- Cost: Standard

### Warm Storage (S3 Standard)

- Audit logs: 1-3 years old
- Access pattern: Monthly queries
- Query latency: < 1s (via Athena)

### Cold Storage (S3 Glacier)

- Audit logs: 3-7 years old
- Access pattern: Annual audits only
- Retrieval time: 3-5 hours
- Cost: 80% savings vs hot storage

### Deep Archive (S3 Glacier Deep Archive)

- Data > 7 years
- Access pattern: Legal hold only
- Retrieval time: 12 hours
- Cost: 95% savings vs hot storage

---

## Retention Policy Enforcement

### Database-Level

```sql
-- Partition expiry for audit_logs
-- Create new monthly partition automatically
-- Archive old partitions to S3 after 1 year

-- Evidence retention calculation trigger
CREATE OR REPLACE FUNCTION calculate_evidence_retention()
RETURNS TRIGGER AS $$
DECLARE
    v_retention_days INTEGER;
BEGIN
    SELECT evidence_retention_days INTO v_retention_days
    FROM tiers t
    JOIN subscriptions s ON s.tier_id = t.id
    WHERE s.tenant_id = NEW.tenant_id;
    
    NEW.retention_until_date := NEW.created_at::date + v_retention_days;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Application-Level

```python
# Pseudo-code for retention enforcement
class RetentionEnforcement:
    def daily_cleanup(self):
        # Soft delete expired evidence
        self.soft_delete_expired_evidence()
        
        # Purge old session data
        self.delete_old_sessions(days=30)
        
        # Archive old audit logs
        self.archive_audit_logs_older_than(years=1)
        
        # Notify of upcoming deletions (GDPR requirement)
        self.notify_upcoming_deletions(days_before=30)
```

---

## Monitoring & Compliance

### Retention Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Data older than retention | 0% | > 1% |
| Archive lag | < 24h | > 48h |
| GDPR deletion SLA | < 30 days | > 25 days |
| Storage cost per tenant | - | > 200% baseline |

### Audit Checklist

**Quarterly**:
- [ ] Verify retention periods still compliant with regulations
- [ ] Review archive integrity (sample restore)
- [ ] Check deletion logs for anomalies
- [ ] Update retention policy if regulations change

**Annually**:
- [ ] Full data mapping review
- [ ] Legal team sign-off on retention periods
- [ ] Privacy impact assessment
- [ ] Update data processing agreements

---

## Exceptions & Overrides

### Legal Hold

When litigation or investigation is anticipated:

1. Suspend automatic deletion for affected tenant
2. Document legal hold reason and duration
3. Notify legal team of scope
4. Review quarterly

### Extended Retention

Enterprise customers may request extended retention:

- Maximum: 10 years (requires CTO approval)
- Additional cost: €0.10/GB/month
- Must be documented in DPA

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-15 | Database Architect | Initial policy |

**Review Schedule**: Annually or upon regulatory change  
**Next Review**: March 15, 2027  
**Approved By**: [To be signed by DPO]
