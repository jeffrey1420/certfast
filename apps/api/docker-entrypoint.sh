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

# Verify environment
echo "🔧 Environment check:"
echo "   HOST: ${HOST:-0.0.0.0}"
echo "   PORT: ${PORT:-3333}"
echo "   NODE_ENV: ${NODE_ENV:-production}"

# Start the application with explicit host/port
echo "🎉 Starting CertFast API server..."
# Force 0.0.0.0 for Docker compatibility
export HOST=0.0.0.0
export PORT=3333
exec node build/bin/server.js
