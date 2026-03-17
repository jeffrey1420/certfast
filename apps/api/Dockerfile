# ============================================================
# API PRODUCTION DOCKERFILE
# CertFast Backend - AdonisJS
# Multi-stage build for smaller production image
# ============================================================

# Stage 1: Builder
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder
# Copy build contents to /app (not /app/build) because bin/server.js uses relative imports like ../config/
COPY --from=builder /app/build ./
COPY --from=builder /app/bin ./bin

# Copy essential config files
COPY --from=builder /app/database ./database
COPY --from=builder /app/start ./start
COPY --from=builder /app/config ./config

# Create uploads directory
RUN mkdir -p tmp/uploads

# Set environment
ENV NODE_ENV=production
ENV PORT=3333
ENV HOST=0.0.0.0

# Expose port
EXPOSE 3333

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3333/health || exit 1

# Start the application
CMD ["node", "bin/server.js"]
