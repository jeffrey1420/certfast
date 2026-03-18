#!/bin/bash
# CertFast Test Environment Validation Script
# Checks if all prerequisites for running tests are met

set -e

echo "🔍 CertFast Test Environment Validation"
echo "========================================"
echo ""

ERRORS=0
WARNINGS=0

# Check Node.js
echo -n "📦 Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ $NODE_VERSION"
else
    echo "❌ Not found"
    ((ERRORS++))
fi

# Check npm
echo -n "📦 npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ $NPM_VERSION"
else
    echo "❌ Not found"
    ((ERRORS++))
fi

# Check Docker
echo -n "🐳 Docker... "
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version | cut -d' ' -f3 | tr -d ',')
    echo "✅ $DOCKER_VERSION"
else
    echo "❌ Not found (required for test database)"
    ((ERRORS++))
fi

# Check Docker Compose
echo -n "🐳 Docker Compose... "
if docker compose version &> /dev/null; then
    COMPOSE_VERSION=$(docker compose version --short)
    echo "✅ $COMPOSE_VERSION"
else
    echo "❌ Not found (required for test database)"
    ((ERRORS++))
fi

echo ""
echo "📁 Project Structure"
echo "--------------------"

# Check API directory
echo -n "  apps/api/... "
if [ -d "apps/api" ]; then
    echo "✅ Found"
else
    echo "❌ Missing"
    ((ERRORS++))
fi

# Check web directory
echo -n "  apps/web/... "
if [ -d "apps/web" ]; then
    echo "✅ Found"
else
    echo "❌ Missing"
    ((ERRORS++))
fi

# Check node_modules
echo -n "  apps/api/node_modules/... "
if [ -d "apps/api/node_modules" ]; then
    echo "✅ Found"
else
    echo "⚠️  Missing (run: cd apps/api && npm install)"
    ((WARNINGS++))
fi

echo ""
echo "⚙️  Configuration"
echo "-----------------"

# Check .env file
echo -n "  apps/api/.env... "
if [ -f "apps/api/.env" ]; then
    echo "✅ Found"
else
    echo "⚠️  Missing (copy from .env.example)"
    ((WARNINGS++))
fi

# Check docker-compose.yml
echo -n "  docker-compose.yml... "
if [ -f "docker-compose.yml" ]; then
    echo "✅ Found"
else
    echo "❌ Missing"
    ((ERRORS++))
fi

echo ""
echo "🐘 Test Database"
echo "----------------"

# Check if postgres-test container exists
echo -n "  Container status... "
if docker ps --format "table {{.Names}}" | grep -q "certfast-postgres-test"; then
    echo "✅ Running"
elif docker ps -a --format "table {{.Names}}" | grep -q "certfast-postgres-test"; then
    echo "⚠️  Stopped (run: docker compose up -d postgres-test)"
    ((WARNINGS++))
else
    echo "❌ Not created (run: ./scripts/setup-test-db.sh)"
    ((ERRORS++))
fi

# Check port 5433
echo -n "  Port 5433... "
if command -v lsof &> /dev/null && lsof -i :5433 &> /dev/null; then
    echo "✅ In use"
elif command -v netstat &> /dev/null && netstat -tuln 2>/dev/null | grep -q ":5433"; then
    echo "✅ In use"
else
    echo "⚠️  Not listening (database may not be ready)"
    ((WARNINGS++))
fi

echo ""
echo "🧪 Test Suite"
echo "-------------"

# Check tests directory
echo -n "  Test files... "
TEST_COUNT=$(find apps/api/tests -name "*.spec.ts" 2>/dev/null | wc -l)
if [ "$TEST_COUNT" -gt 0 ]; then
    echo "✅ $TEST_COUNT test files found"
else
    echo "❌ No test files found"
    ((ERRORS++))
fi

# Check if test script exists
echo -n "  npm test script... "
if grep -q '"test"' apps/api/package.json 2>/dev/null; then
    echo "✅ Configured"
else
    echo "❌ Not configured"
    ((ERRORS++))
fi

echo ""
echo "========================================"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo "🎉 All checks passed! Ready to run tests."
    echo ""
    echo "   Run: cd apps/api && npm test"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo "⚠️  $WARNINGS warning(s). Tests may still run."
    echo ""
    echo "   Run: cd apps/api && npm test"
    exit 0
else
    echo "❌ $ERRORS error(s), $WARNINGS warning(s)."
    echo ""
    echo "🔧 To fix:"
    if ! command -v docker &> /dev/null; then
        echo "   1. Install Docker: https://docs.docker.com/engine/install/"
    fi
    if ! docker ps --format "table {{.Names}}" | grep -q "certfast-postgres-test" 2>/dev/null; then
        echo "   2. Start test database: ./scripts/setup-test-db.sh"
    fi
    if [ ! -d "apps/api/node_modules" ]; then
        echo "   3. Install dependencies: cd apps/api && npm install"
    fi
    exit 1
fi
