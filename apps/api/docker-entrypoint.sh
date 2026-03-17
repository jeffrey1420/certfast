#!/bin/sh
set -e

echo "🚀 CertFast API - Starting..."

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL..."

until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" > /dev/null 2>&1; do
  echo "   PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "✅ PostgreSQL is ready"

# Run migrations (use compiled ace.js from build/)
echo "🔄 Running database migrations..."
node build/ace.js migration:run --force

echo "✅ Migrations completed"

# Start the application
echo "🎉 Starting CertFast API server..."
exec node build/bin/server.js
