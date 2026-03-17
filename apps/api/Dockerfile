# ============================================================
# API PRODUCTION DOCKERFILE
# CertFast Backend - AdonisJS
# ============================================================

FROM node:22-alpine

WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

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

# Start the compiled application (from build/ directory)
CMD ["node", "build/bin/server.js"]
