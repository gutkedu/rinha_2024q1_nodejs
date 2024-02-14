# ---- Build Stage ----
FROM node:21-bullseye-slim AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Run Stage ----
FROM node:21-bullseye-slim

WORKDIR /app
COPY --from=builder /app/build ./build
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Start the server
CMD ["npm", "run", "start"]