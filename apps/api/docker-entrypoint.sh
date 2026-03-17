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

# NOTE: Migrations must be run manually after first deploy
# docker exec <container> node ace migration:run --force

echo "🎉 Starting CertFast API server..."
exec node build/bin/server.js
