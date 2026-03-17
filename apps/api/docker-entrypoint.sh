#!/bin/sh
set -e

echo "🚀 CertFast API - Starting..."

# Wait for PostgreSQL to be ready using pg_isready
echo "⏳ Waiting for PostgreSQL..."

until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" > /dev/null 2>&1; do
  echo "   PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "✅ PostgreSQL is ready"

# Run migrations
echo "🔄 Running database migrations..."
node ace migration:run --force

echo "✅ Migrations completed"

# Start the application
echo "🎉 Starting CertFast API server..."
exec node build/bin/server.js
