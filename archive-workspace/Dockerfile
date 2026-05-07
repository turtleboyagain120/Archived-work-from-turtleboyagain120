# syntax=docker/dockerfile:1
FROM node:20-alpine

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci

# Copy workspace
COPY . .

# Build the Next app by default
# (Change NEXT_APP if you rename project)
CMD ["npm", "run", "docker:up"]

