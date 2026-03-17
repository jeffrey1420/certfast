# ============================================================
# API PRODUCTION DOCKERFILE
# CertFast Backend - AdonisJS
# Simplified for debugging
# ============================================================

FROM node:22-alpine

WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./

# Install ALL dependencies (production needs build tools sometimes)
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Verify build output exists
RUN ls -la bin/ && ls -la config/ && ls -la start/

# Create uploads directory
RUN mkdir -p tmp/uploads

# Set environment
ENV NODE_ENV=production
ENV PORT=3333
ENV HOST=0.0.0.0

# Expose port
EXPOSE 3333

# Start with explicit logging
CMD ["sh", "-c", "echo 'Starting API...' && ls -la bin/ && node bin/server.js"]
