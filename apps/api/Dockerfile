# ============================================================
# API PRODUCTION DOCKERFILE
# CertFast Backend - AdonisJS
# ============================================================

FROM node:22-alpine

WORKDIR /app

# Install curl for healthcheck and postgresql-client for DB wait
RUN apk add --no-cache curl postgresql-client

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Copy and make entrypoint executable
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Build TypeScript
RUN npm run build

# Verify build output
RUN ls -la build/ && ls -la build/bin/ && ls -la build/config/

# Create uploads directory
RUN mkdir -p tmp/uploads

# Set environment
ENV NODE_ENV=production
ENV PORT=3333
ENV HOST=0.0.0.0

# Expose port
EXPOSE 3333

# Start via entrypoint (migrations + server)
CMD ["/docker-entrypoint.sh"]
