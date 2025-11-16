# Docker Setup for Auralis

Quick guide to run Auralis using Docker.

## Prerequisites

- Docker and Docker Compose installed
- Git (to clone the repository)

## Quick Start

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd Auralis
   cp .env.example .env.local
   ```

2. **Configure environment**
   Edit `.env.local` with your Appwrite and Gemini API credentials.

3. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   Open http://localhost:3000

## Commands

```bash
# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop application
docker-compose down

# Rebuild and start
docker-compose up --build
```

## Health Check

The application includes a health endpoint at `/api/health` for monitoring container status.