# Build stage
FROM node:20-alpine AS build

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Set NODE_ENV to production
ENV NODE_ENV=production

# Build admin panel
RUN pnpm build

# Production stage
FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built files from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY --from=build /app/config ./config
COPY --from=build /app/database ./database

# Copy data directory (for seeding)
COPY --from=build /app/data ./data

# Expose port
EXPOSE 1337

# Set NODE_ENV
ENV NODE_ENV=production

# Start Strapi
CMD ["pnpm", "start"]
