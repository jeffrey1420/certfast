#!/bin/bash

# CertFast Environment Setup Helper
# Generates secure random keys for APP_KEY and JWT_SECRET

set -e

ENV_FILE="${1:-apps/api/.env}"
EXAMPLE_FILE="apps/api/.env.example"

echo "🔧 CertFast Environment Setup"
echo "=============================="
echo ""

# Check if .env already exists
if [ -f "$ENV_FILE" ]; then
    echo "⚠️  $ENV_FILE already exists."
    read -p "Overwrite? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Aborted."
        exit 1
    fi
fi

# Generate random keys
APP_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# Copy example file
cp "$EXAMPLE_FILE" "$ENV_FILE"

# Replace placeholder values with generated keys
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS sed
    sed -i '' "s/change_me_in_production_at_least_32_chars/$APP_KEY/g" "$ENV_FILE"
    sed -i '' "s/JWT_SECRET=change_me_in_production_at_least_32_chars/JWT_SECRET=$JWT_SECRET/g" "$ENV_FILE"
else
    # Linux sed
    sed -i "s/change_me_in_production_at_least_32_chars/$APP_KEY/g" "$ENV_FILE"
    sed -i "s/JWT_SECRET=change_me_in_production_at_least_32_chars/JWT_SECRET=$JWT_SECRET/g" "$ENV_FILE"
fi

echo "✅ Generated $ENV_FILE with secure keys:"
echo "   APP_KEY: ${APP_KEY:0:16}..."
echo "   JWT_SECRET: ${JWT_SECRET:0:16}..."
echo ""
echo "📝 Next steps:"
echo "   1. Review and customize other values in $ENV_FILE"
echo "   2. Set up the test database: ./scripts/setup-test-db.sh"
echo "   3. Run migrations: cd apps/api && node ace migration:run"
echo "   4. Start development server: cd apps/api && npm run dev"
echo ""
