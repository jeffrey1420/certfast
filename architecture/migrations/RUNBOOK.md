# CertFast Database Migration Runbook

**Version**: 1.0  
**Date**: March 15, 2026  
**Author**: Database Architect  
**Database**: PostgreSQL 15+

---

## Overview

This runbook provides step-by-step instructions for executing the CertFast database migrations in production and staging environments.

---

## Pre-Migration Checklist

- [ ] Database backup completed and verified
- [ ] Migration scripts reviewed and tested in staging
- [ ] Downtime window scheduled (if applicable)
- [ ] Rollback plan documented
- [ ] Monitoring alerts configured
- [ ] Team notified

---

## Migration Files

| Order | File | Description | Est. Duration | Downtime Required |
|-------|------|-------------|---------------|-------------------|
| 001 | `001_create_tiers_and_tenants.sql` | Pricing tiers and tenant structure | ~5s | No |
| 002 | `002_create_users_and_auth.sql` | Users, auth, sessions | ~10s | No |
| 003 | `003_create_compliance_frameworks.sql` | Frameworks, controls, assessments | ~15s | No |
| 004 | `004_create_evidence_and_policies.sql` | Evidence, policies, versions | ~20s | No |
| 005 | `005_create_integrations_and_webhooks.sql` | Integrations, webhooks | ~10s | No |
| 006 | `006_create_audit_logs_and_rls.sql` | Audit logs, RLS policies | ~30s | Brief* |

*RLS policy application requires brief table lock

---

## Execution Steps

### Step 1: Pre-Migration Backup

```bash
# Create backup before migration
pg_dump -h $DB_HOST -U $DB_ADMIN -d certfast \
  --clean --if-exists --no-owner \
  > /backups/certfast-pre-migration-$(date +%Y%m%d-%H%M%S).sql

# Verify backup size
ls -lh /backups/certfast-pre-migration-*.sql
```

### Step 2: Run Migrations

```bash
# Set connection variables
export PGHOST=$DB_HOST
export PGUSER=$DB_ADMIN
export PGDATABASE=certfast
export PGPASSWORD=$DB_PASSWORD

# Execute migrations in order
for file in migrations/00{1..6}_*.sql; do
    echo "Running: $file"
    psql -v ON_ERROR_STOP=1 -f "$file"
    if [ $? -ne 0 ]; then
        echo "Migration failed: $file"
        exit 1
    fi
done

echo "All migrations completed successfully"
```

### Step 3: Verify Migration

```bash
# Check all tables exist
psql -c "\dt" | grep -E "(tenants|users|frameworks|evidence|policies|audit)"

# Check row counts
psql -c "SELECT 'tiers' as table, count(*) from tiers
         UNION ALL SELECT 'frameworks', count(*) from frameworks WHERE is_system = true;"

# Verify RLS is enabled
psql -c "SELECT schemaname, tablename, rowsecurity FROM pg_tables 
         WHERE tablename IN ('users', 'evidence_files', 'compliance_assessments') 
         AND rowsecurity = true;"
```

### Step 4: Post-Migration Validation

```sql
-- Test RLS policy
SELECT set_tenant_context('00000000-0000-0000-0000-000000000000'::UUID);

-- Should return 0 rows (tenant doesn't exist)
SELECT COUNT(*) FROM users;

-- Check system frameworks are visible
SELECT COUNT(*) FROM frameworks WHERE is_system = true;
-- Expected: 6
```

---

## Rollback Procedure

If migration fails, execute rollback:

```bash
# Restore from backup
psql -h $DB_HOST -U $DB_ADMIN -d certfast \
  < /backups/certfast-pre-migration-[TIMESTAMP].sql
```

**Note**: Rollback will lose any data written between migration and rollback.

---

## Troubleshooting

### Migration Hangs

```sql
-- Check for blocking queries
SELECT * FROM pg_stat_activity WHERE state = 'active';

-- Kill blocking query if safe
SELECT pg_terminate_backend(pid) FROM pg_stat_activity 
WHERE query LIKE '%CREATE INDEX%' AND state = 'active';
```

### RLS Policy Errors

```sql
-- Verify tenant context function exists
SELECT proname FROM pg_proc WHERE proname LIKE '%tenant%';

-- Check policy definitions
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies WHERE schemaname = 'public';
```

### Index Creation Slow

```sql
-- Check index creation progress
SELECT now()::time, query FROM pg_stat_activity 
WHERE query LIKE 'CREATE INDEX%';
```

---

## Post-Migration Tasks

- [ ] Update application connection strings if changed
- [ ] Verify application can connect and query data
- [ ] Run smoke tests
- [ ] Monitor error logs for 24 hours
- [ ] Update documentation
- [ ] Archive migration runbook with timestamp

---

## Contacts

| Role | Contact | Escalation |
|------|---------|------------|
| Database Admin | db-oncall@certfast.io | +1 hour no response |
| Platform Lead | platform@certfast.io | Critical issues |
| Security | security@certfast.io | RLS/policy issues |

---

## Change Log

| Date | Version | Changes |
|------|---------|---------|
| 2026-03-15 | 1.0 | Initial migration runbook |
