# Build stage
FROM node:20-alpine AS build

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy all source code
COPY . .

# Build the application
ENV NODE_ENV=production
RUN pnpm build

# Production stage
FROM node:20-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install ALL dependencies (not just production for now)
RUN pnpm install --frozen-lockfile

# Copy everything from build stage (compiled code + source for reference)
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
COPY --from=build /app/database ./database
COPY --from=build /app/data ./data

# Create symlink so Strapi can find config in production mode
RUN ln -sf /app/dist/config /app/config

# Create .tmp directory for SQLite database
RUN mkdir -p .tmp

# Expose port
EXPOSE 1337

# Set NODE_ENV
ENV NODE_ENV=production

# Set Strapi to use the compiled config
ENV STRAPI_DISABLE_UPDATE_NOTIFICATION=true
ENV STRAPI_HIDE_STARTUP_MESSAGE=false

# Start Strapi - use the start script with explicit host binding
CMD ["sh", "-c", "pnpm start"]
