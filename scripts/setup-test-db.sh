#!/bin/bash

set -e

echo "🚀 CertFast Test Database Setup"
echo "================================"
echo ""

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first:"
    echo "   https://docs.docker.com/engine/install/"
    exit 1
fi

# Check Docker Compose
if ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose not found. Please install Docker Compose:"
    echo "   https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker found: $(docker --version)"
echo "✅ Docker Compose found: $(docker compose version)"
echo ""

# Start test DB
echo "🐘 Starting PostgreSQL test database..."
docker compose up -d postgres-test

# Wait for health check
echo "⏳ Waiting for database to be ready..."
timeout 30 bash -c 'until docker compose ps postgres-test | grep -q "healthy"; do sleep 1; done' || {
    echo "❌ Database failed to become healthy"
    docker compose logs postgres-test
    exit 1
}

echo "✅ PostgreSQL test database is ready on port 5433"
echo ""

# Verify connection
echo "🔍 Testing database connection..."
docker exec certfast-postgres-test psql -U certfast -d certfast_test -c "SELECT version();" > /dev/null 2>&1 || {
    echo "❌ Failed to connect to database"
    exit 1
}

echo "✅ Database connection verified"
echo ""

# Check .env file
if [ ! -f "apps/api/.env" ]; then
    echo "⚠️  No .env file found. Creating from .env.example..."
    cp apps/api/.env.example apps/api/.env
    echo "✅ Created apps/api/.env"
    echo ""
    echo "⚠️  IMPORTANT: Update the following in apps/api/.env:"
    echo "   - APP_KEY (generate with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\")"
    echo "   - JWT_SECRET (same command)"
fi

echo ""
echo "🎉 Setup complete! You can now run tests:"
echo ""
echo "   cd apps/api"
echo "   npm test"
echo ""
