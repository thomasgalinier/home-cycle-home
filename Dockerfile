# Multi-stage Dockerfile for Vite + React (pnpm)

# ---------- Dependencies stage ----------
FROM node:20-alpine AS deps
WORKDIR /app
# Enable Corepack for pnpm
RUN corepack enable
# Copy lockfile and manifest only (leverage Docker layer cache)
COPY package.json pnpm-lock.yaml ./
# Install dependencies (dev deps needed for build)
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store/v3 \
    pnpm install

# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build-time API URL injected for Vite via VITE_* env
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
# Create production build
RUN pnpm run build

# ---------- Runtime stage ----------
FROM nginx:1.27-alpine
# Copy built static assets
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# Nginx base image already sets the default CMD
