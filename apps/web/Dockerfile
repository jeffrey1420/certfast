# ============================================================
# FRONTEND PRODUCTION DOCKERFILE
# CertFast Web App - React + Vite
# Multi-stage build: Node build → Nginx serve
# ============================================================

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/

# Install dependencies
RUN npm ci

# Copy source code
COPY apps/web ./apps/web

# Set environment variables for build
ENV NODE_ENV=production
ENV VITE_API_URL=${VITE_API_URL:-https://api.certfast.io}

# Build the application
RUN npm run build --workspace=certfast-web

# Stage 2: Production - Nginx
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Copy nginx configuration
COPY infrastructure/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
