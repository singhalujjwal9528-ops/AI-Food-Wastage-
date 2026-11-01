# =======================================================
# Multi-stage Dockerfile for AI Food Waste Platform
# Combines React 19 Frontend + FastAPI Backend + SQLite DB
# =======================================================

# Stage 1: Build React Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Python Backend with Embedded ML Model & DB
FROM python:3.11-slim
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

# Install Python requirements
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy source code and dataset
COPY backend ./backend
COPY dataset ./dataset
COPY --from=frontend-builder /app/dist ./dist

# Initialize SQLite database and train ML model
RUN python backend/seed_data.py && python backend/train_model.py

EXPOSE 8000

# Run Uvicorn on dynamic PORT (compatible with Render, Railway, Heroku, Cloud Run)
CMD ["sh", "-c", "uvicorn backend.app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]

