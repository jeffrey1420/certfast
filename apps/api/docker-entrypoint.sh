#!/bin/sh
set -e

echo "🚀 CertFast API - Starting..."

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL..."
max_attempts=30
attempt=0

until node -e "
const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
pool.query('SELECT 1').then(() => { process.exit(0); }).catch(() => { process.exit(1); });
" 2>/dev/null; do
  attempt=$((attempt + 1))
  if [ $attempt -ge $max_attempts ]; then
    echo "❌ PostgreSQL connection timeout"
    exit 1
  fi
  echo "   Attempt $attempt/$max_attempts..."
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
