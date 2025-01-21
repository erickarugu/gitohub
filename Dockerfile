FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files
COPY pnpm-lock.yaml .
COPY package.json .

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Install TypeScript
RUN npm install -g typescript


# Build the application
RUN pnpm run build

# Set the target to runner
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/dist .

# Copy the node_modules directory from the builder stage
COPY --from=builder /app/node_modules .



# Start the application
CMD ["pnpm", "start"]
