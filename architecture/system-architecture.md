# CertFast System Architecture

## Executive Summary

CertFast is a comprehensive compliance automation platform designed for SMBs and mid-market companies. This document outlines the bare metal deployment architecture optimized for single-node deployment using Docker Compose, delivering enterprise-grade compliance automation at significantly reduced infrastructure costs.

**Architecture Decision**: Bare Metal Single-Node Deployment  
**Target Environment**: Production on dedicated server or Hetzner/AWS EC2 bare instance  
**Container Orchestration**: Docker Compose (not Kubernetes)  
**Object Storage**: Cloudflare R2 (S3-compatible, cost-effective)  
**Database**: Self-hosted PostgreSQL 15  
**Cache**: Self-hosted Redis 7  
**Reverse Proxy**: Nginx with SSL/TLS via Let's Encrypt

---

## 1. High-Level Architecture

### 1.1 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CERTFAST PLATFORM                                 │
│                    Bare Metal Single-Node Deployment                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    NGINX REVERSE PROXY (SSL)                        │   │
│  │           (Rate Limiting, Static Assets, Load Balancing)            │   │
│  └─────────────────────────────┬───────────────────────────────────────┘   │
│                                │                                            │
│  ┌─────────────────────────────▼───────────────────────────────────────┐   │
│  │                 ADONISJS API APPLICATION                            │   │
│  │         (Node.js 20, TypeScript, Lucid ORM)                         │   │
│  └──────┬────────────┬────────────────┬────────────────┬──────────────┘   │
│         │            │                │                │                   │
│  ┌──────▼─────┐ ┌────▼─────┐ ┌────────▼──────┐ ┌───────▼───────┐         │
│  │ PostgreSQL │ │  Redis   │ │  ClickHouse   │ │  Cloudflare   │         │
│  │    15      │ │    7     │ │     23        │ │      R2       │         │
│  │(Main DB)   │ │ (Cache)  │ │ (Analytics)   │ │ (File Storage)│         │
│  └────────────┘ └──────────┘ └───────────────┘ └───────────────┘         │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    MONITORING STACK                                 │   │
│  │        Prometheus (Metrics) + Grafana (Visualization)               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    BACKUP SYSTEM                                    │   │
│  │        Local Backups + Cloudflare R2 Offsite Replication            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Infrastructure Stack Overview

| Component | Technology | Purpose | AWS Equivalent |
|-----------|------------|---------|----------------|
| **Compute** | Docker Compose | Container orchestration | EKS / ECS |
| **Application** | AdonisJS v6 | REST API backend | ECS Fargate |
| **Database** | PostgreSQL 15 | Primary data store | RDS Aurora |
| **Cache** | Redis 7 | Session & query caching | ElastiCache |
| **Analytics** | ClickHouse 23 | Audit logs & analytics | Redshift |
| **Object Storage** | Cloudflare R2 | File storage (evidence) | S3 |
| **CDN** | Nginx + Cloudflare | Static assets & caching | CloudFront |
| **Load Balancer** | Nginx | Reverse proxy & SSL | ALB |
| **Security** | Nginx + fail2ban | Rate limiting, DDoS protection | AWS WAF |
| **SSL/TLS** | Let's Encrypt + certbot | Free SSL certificates | ACM |
| **Monitoring** | Prometheus + Grafana | Metrics & dashboards | CloudWatch |
| **Logging** | Loki + Grafana | Log aggregation | CloudWatch Logs |

### 1.3 Key Design Decisions

**Why Bare Metal Over Cloud-Native?**

1. **Cost Optimization**: Eliminate managed service markups (~70% cost reduction)
2. **Predictable Pricing**: Fixed monthly costs vs variable cloud usage
3. **Performance**: Direct hardware access, no virtualization overhead
4. **Simplicity**: Single-node Docker Compose is operationally simpler than Kubernetes
5. **Sovereignty**: Complete data control for compliance-sensitive organizations

**Why Cloudflare R2 Over MinIO?**

1. **Cost**: $0.015/GB vs AWS S3 at $0.023/GB, zero egress fees
2. **Durability**: 99.9999999% durability (same as S3)
3. **S3 API**: Drop-in replacement, no code changes needed
4. **Bandwidth Alliance**: Free egress to many cloud providers

---

## 2. Application Layer

### 2.1 AdonisJS API Application

**Runtime**: Node.js 20 LTS  
**Framework**: AdonisJS v6 (TypeScript-first)  
**Process Model**: PM2 cluster mode (4 workers recommended)  
**Port**: 3333 (internal)  
**Protocol**: HTTP/2 via Nginx reverse proxy

**Container Configuration**:
```yaml
services:
  app:
    build:
      context: ./docker/app
      dockerfile: Dockerfile
    container_name: certfast-app
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=3333
      - DB_CONNECTION=pg
      - DB_HOST=postgres
      - REDIS_HOST=redis
      - R2_ENDPOINT=${R2_ENDPOINT}
    ports:
      - "127.0.0.1:3333:3333"
    depends_on:
      - postgres
      - redis
    volumes:
      - ./uploads:/app/uploads:delegated
```

**Key Dependencies**:
- `@adonisjs/core` - Framework core
- `@adonisjs/lucid` - Database ORM (PostgreSQL)
- `@adonisjs/auth` - Authentication system
- `@adonisjs/redis` - Redis integration
- `aws-sdk` - R2 compatibility (S3 API)
- `bullmq` - Background job processing

### 2.2 Worker Processes

Background jobs are handled by BullMQ with Redis:

| Queue | Purpose | Concurrency |
|-------|---------|-------------|
| `assessment` | Assessment execution | 2 workers |
| `notification` | Email/SMS delivery | 4 workers |
| `export` | Report generation | 2 workers |
| `import` | Bulk data imports | 1 worker |

---

## 3. Data Layer

### 3.1 PostgreSQL 15 - Primary Database

**Role**: Main transactional database  
**Container**: `postgres:15-alpine`  
**Port**: 5432 (internal)  
**Storage**: Persistent volume (SSD recommended)

**Database Schema**:
- `users` - User accounts and authentication
- `organizations` - Tenant data (multi-tenant)
- `frameworks` - Compliance frameworks (ISO27001, SOC2, etc.)
- `controls` - Individual compliance controls
- `assessments` - Assessment records and results
- `evidence` - Evidence file metadata (files in R2)
- `audit_logs` - Immutable audit trail (synced to ClickHouse)

**Configuration**:
```yaml
services:
  postgres:
    image: postgres:15-alpine
    container_name: certfast-postgres
    restart: unless-stopped
    environment:
      - POSTGRES_DB=certfast
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups/postgres:/backups
    ports:
      - "127.0.0.1:5432:5432"
```

**Performance Tuning**:
- `shared_buffers = 256MB`
- `effective_cache_size = 1GB`
- `work_mem = 16MB`
- `maintenance_work_mem = 128MB`

### 3.2 Redis 7 - Cache & Sessions

**Role**: Session storage, query cache, job queue  
**Container**: `redis:7-alpine`  
**Port**: 6379 (internal)  
**Persistence**: AOF + RDB

**Use Cases**:
1. **Session Store**: User authentication sessions
2. **Query Cache**: Frequently accessed framework data
3. **Rate Limiting**: API request throttling
4. **Job Queue**: BullMQ background tasks

**Configuration**:
```yaml
services:
  redis:
    image: redis:7-alpine
    container_name: certfast-redis
    restart: unless-stopped
    command: redis-server --appendonly yes --maxmemory 512mb --maxmemory-policy allkeys-lru
    volumes:
      - redis_data:/data
    ports:
      - "127.0.0.1:6379:6379"
```

### 3.3 ClickHouse 23 - Analytics

**Role**: Audit log storage and compliance analytics  
**Container**: `clickhouse/clickhouse-server:23`  
**Port**: 8123 (HTTP), 9000 (native)  
**Storage**: Separate volume for analytics data

**Use Cases**:
1. **Audit Trail**: Immutable compliance audit logs
2. **Analytics**: Assessment completion metrics
3. **Reporting**: Historical trend analysis

**Key Tables**:
- `audit_logs` - All user actions with timestamp
- `assessment_events` - Assessment state changes
- `login_events` - Authentication attempts

---

## 4. Storage Layer

### 4.1 Cloudflare R2 - Object Storage

**Role**: File storage for evidence documents  
**API**: S3-compatible  
**Buckets**:
- `certfast-evidence-{env}` - Evidence files
- `certfast-exports-{env}` - Generated reports
- `certfast-backups-{env}` - Database backups

**Integration**:
```typescript
// AdonisJS R2 configuration
export default {
  driver: 's3',
  config: {
    endpoint: Env.get('R2_ENDPOINT'),        // https://xxx.r2.cloudflarestorage.com
    region: 'auto',
    credentials: {
      accessKeyId: Env.get('R2_ACCESS_KEY_ID'),
      secretAccessKey: Env.get('R2_SECRET_ACCESS_KEY'),
    },
    bucket: Env.get('R2_BUCKET'),
    forcePathStyle: true,
  },
}
```

**Cost Projection**:
- Storage: $0.015/GB/month
- Class A operations: $4.50/million
- Class B operations: $0.36/million
- Egress: $0 (free)

**Estimated Monthly Cost**: $15-30 for 100GB storage

### 4.2 Local Storage

**Purpose**: Temporary uploads, processing files  
**Location**: `./uploads` directory (bind mount)  
**Cleanup**: Daily cleanup job removes files > 7 days

---

## 5. Security Architecture

### 5.1 Network Security

**Nginx Reverse Proxy**:
- SSL/TLS termination with Let's Encrypt
- HTTP/2 support
- WebSocket support for real-time features
- Static file serving

**Nginx Configuration**:
```nginx
server {
    listen 443 ssl http2;
    server_name api.certfast.io;

    ssl_certificate /etc/letsencrypt/live/certfast.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/certfast.io/privkey.pem;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        proxy_pass http://127.0.0.1:3333;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5.2 Application Security

**fail2ban Integration**:
```ini
# /etc/fail2ban/jail.local
[nginx-auth]
enabled = true
filter = nginx-auth
logpath = /var/log/nginx/access.log
maxretry = 5
bantime = 3600

[nginx-badbots]
enabled = true
filter = nginx-badbots
logpath = /var/log/nginx/access.log
maxretry = 2
bantime = 86400
```

**Rate Limiting**:
- API: 100 requests/minute per IP
- Auth endpoints: 10 requests/minute per IP
- File uploads: 10 MB/minute per user

### 5.3 SSL/TLS Configuration

**Let's Encrypt + certbot**:
- Automatic certificate renewal
- HTTP-01 challenge
- Wildcard certificate support

**Certificate Renewal**:
```bash
# Daily cron job
0 3 * * * certbot renew --quiet --deploy-hook "docker compose restart nginx"
```

### 5.4 Data Security

**Encryption at Rest**:
- PostgreSQL: Native encryption via LUKS (optional)
- R2: Server-side encryption (AES-256)
- Backups: GPG-encrypted before upload

**Encryption in Transit**:
- TLS 1.3 for all external traffic
- Internal container communication: HTTP (trusted network)

---

## 6. Deployment Architecture

### 6.1 Docker Compose Deployment

**Production File Structure**:
```
certfast/
├── docker-compose.yml          # Base services
├── docker-compose.prod.yml     # Production overrides
├── docker-compose.override.yml # Local development
├── .env                        # Environment variables
├── .env.example                # Template
├── docker/
│   ├── app/
│   │   └── Dockerfile
│   └── nginx/
│       ├── nginx.conf
│       └── ssl/
├── scripts/
│   ├── setup.sh               # Initial server setup
│   ├── backup.sh              # Backup to R2
│   └── deploy.sh              # Deployment script
└── backups/                   # Local backup storage
```

### 6.2 Server Requirements

**Minimum (10 users)**:
- CPU: 2 cores
- RAM: 4 GB
- Storage: 50 GB SSD
- Network: 100 Mbps

**Recommended (100 users)**:
- CPU: 4 cores
- RAM: 8 GB
- Storage: 100 GB SSD
- Network: 1 Gbps

**High Load (500+ users)**:
- CPU: 8 cores
- RAM: 16 GB
- Storage: 200 GB SSD
- Network: 1 Gbps

### 6.3 Deployment Workflow

```bash
# 1. Clone repository
git clone https://github.com/jeffrey1420/certfast.git
cd certfast

# 2. Configure environment
cp .env.example .env
# Edit .env with production values

# 3. Run setup
./scripts/setup.sh

# 4. Start services
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# 5. Run migrations
docker compose exec app node ace migration:run

# 6. Setup SSL
certbot --nginx -d api.certfast.io
```

---

## 7. Backup & Disaster Recovery

### 7.1 Backup Strategy

**PostgreSQL Backups**:
- **Frequency**: Daily at 2 AM UTC
- **Retention**: 7 days local, 30 days R2
- **Method**: `pg_dump` compressed with gzip

**Redis Backups**:
- **Frequency**: Daily RDB snapshot
- **Retention**: 7 days
- **Method**: Redis BGSAVE

**File Backups (R2)**:
- **Frequency**: Real-time (R2 is the source of truth)
- **Replication**: Bucket replication to secondary region

### 7.2 Backup Script

```bash
#!/bin/bash
# scripts/backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/certfast/backups"
R2_BUCKET="certfast-backups-prod"

# PostgreSQL backup
docker exec certfast-postgres pg_dump -U certfast certfast | gzip > "$BACKUP_DIR/db_$DATE.sql.gz"

# Upload to R2
aws s3 cp "$BACKUP_DIR/db_$DATE.sql.gz" s3://$R2_BUCKET/postgres/ --endpoint-url=$R2_ENDPOINT

# Cleanup old local backups (keep 7 days)
find "$BACKUP_DIR" -name "db_*.sql.gz" -mtime +7 -delete

echo "Backup completed: db_$DATE.sql.gz"
```

### 7.3 Recovery Procedures

**Database Recovery**:
```bash
# Restore from backup
gunzip < backups/db_20240315_020000.sql.gz | docker exec -i certfast-postgres psql -U certfast certfast
```

**Full System Recovery**:
1. Provision new server
2. Run `setup.sh`
3. Restore database from R2
4. Restart services

**RTO**: 4 hours  
**RPO**: 24 hours

---

## 8. Monitoring & Observability

### 8.1 Metrics Collection

**Prometheus Stack**:
- **Prometheus**: Metrics collection and storage
- **Grafana**: Visualization dashboards
- **Node Exporter**: Server-level metrics
- **cAdvisor**: Container metrics
- **PostgreSQL Exporter**: Database metrics

### 8.2 Key Metrics

**Application Metrics**:
- Request rate and latency (p50, p95, p99)
- Error rate (4xx, 5xx)
- Active user sessions
- Queue depths (BullMQ)

**Infrastructure Metrics**:
- CPU, memory, disk usage
- Network I/O
- Container resource usage
- Database connections

### 8.3 Alerting Rules

| Condition | Severity | Action |
|-----------|----------|--------|
| CPU > 80% for 5min | Warning | Slack notification |
| Disk > 85% | Critical | PagerDuty + cleanup |
| 5xx errors > 1% | Critical | Immediate investigation |
| DB connections > 80% | Warning | Connection pool review |
| Backup failure | Critical | Manual intervention |

### 8.4 Log Management

**Loki + Grafana**:
- Centralized log aggregation
- Structured logging (JSON)
- Log retention: 30 days

**Log Locations**:
- Application: `docker logs certfast-app`
- Nginx: `/var/log/nginx/`
- Database: `/var/lib/postgresql/data/log/`

---

## 9. Scalability Considerations

### 9.1 Vertical Scaling

Single-node deployment supports vertical scaling:
- CPU: Up to 64 cores
- RAM: Up to 512 GB
- Storage: Scale SSD capacity

### 9.2 Horizontal Scaling Path

If single-node limits are reached:

1. **Separate Database**: Move PostgreSQL to dedicated server
2. **Read Replicas**: PostgreSQL streaming replication
3. **Load Balancer**: HAProxy for multi-app nodes
4. **Full Kubernetes**: Migrate to EKS/GKE when justified

### 9.3 Performance Targets

| Metric | Target | Current Capacity |
|--------|--------|------------------|
| API Response Time (p95) | < 200ms | < 150ms |
| Concurrent Users | 500 | 200 |
| File Upload | 50MB | 100MB |
| Assessment Execution | 100/hour | 50/hour |

---

## 10. Cost Analysis

### 10.1 Bare Metal vs AWS Cost Comparison

| Component | Bare Metal | AWS Equivalent | Monthly Savings |
|-----------|------------|----------------|-----------------|
| Compute (4vCPU/8GB) | $20 (Hetzner CX31) | $140 (t3.xlarge) | $120 |
| Database | Self-hosted (included) | $200 (RDS db.t3.medium) | $200 |
| Cache | Self-hosted (included) | $45 (ElastiCache t3.micro) | $45 |
| Storage (100GB) | $5 (SSD) | $23 (EBS gp3) | $18 |
| Object Storage | $1.50 (R2) | $2.30 (S3) | $0.80 |
| Data Transfer | $0 | ~$50 | $50 |
| **Total** | **~$27** | **~$460** | **~$433 (94% savings)** |

### 10.2 Maintenance Overhead

**Estimated Time**:
- Updates/Patches: 2 hours/month
- Monitoring: 1 hour/month
- Backups: Automated (0 hours)
- **Total**: ~3 hours/month

---

## 11. Appendix

### 11.1 Port Mapping

| Service | Internal Port | External Access | Notes |
|---------|---------------|-----------------|-------|
| Nginx | 80, 443 | Public | SSL termination |
| AdonisJS | 3333 | localhost only | Via Nginx proxy |
| PostgreSQL | 5432 | localhost only | Internal access |
| Redis | 6379 | localhost only | Internal access |
| ClickHouse | 8123, 9000 | localhost only | Internal access |
| Prometheus | 9090 | localhost only | Via Nginx auth |
| Grafana | 3000 | localhost only | Via Nginx auth |

### 11.2 Environment Variables

```bash
# Application
NODE_ENV=production
APP_KEY=<random-32-char-key>
APP_URL=https://api.certfast.io

# Database
DB_HOST=postgres
DB_PORT=5432
DB_USER=certfast
DB_PASSWORD=<secure-password>
DB_DATABASE=certfast

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Cloudflare R2
R2_ENDPOINT=https://<account>.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=<access-key>
R2_SECRET_ACCESS_KEY=<secret-key>
R2_BUCKET=certfast-evidence-prod

# ClickHouse
CLICKHOUSE_URL=http://clickhouse:8123
CLICKHOUSE_DB=certfast

# Email (Postmark/Resend)
SMTP_HOST=smtp.postmarkapp.com
SMTP_PORT=587
SMTP_USER=<api-key>
SMTP_PASSWORD=<api-key>
```

### 11.3 Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-15 | System Architect | Initial bare metal architecture |
| 1.1 | 2026-03-16 | System Architect | Documentation sync - Sprint 1.5 complete |

---

## 12. Approval

**Architecture Owner**: Technical Pipeline  
**Review Date**: 2026-03-16  
**Status**: Approved for Implementation
