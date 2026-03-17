# ============================================================
# FRONTEND PRODUCTION DOCKERFILE
# CertFast Web App - React + Vite
# ============================================================

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/

# Install dependencies
RUN npm ci

# Copy source code
COPY apps/web ./apps/web
COPY packages ./packages

# Set environment variables for build
ENV NODE_ENV=production
ENV VITE_API_URL=https://api.certfast.io

# Build the application
RUN npm run build --workspace=certfast-web

# Production stage - Nginx
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Copy nginx configuration
COPY infrastructure/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
