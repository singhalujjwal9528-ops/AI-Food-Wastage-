# Deployment Guide — AI Food Wastage Prevention & Redistribution Platform

This project is configured for **zero-friction cloud deployment**. You can deploy it using any of the three popular industry methods below.

---

## 🌟 Method 1: Render.com (Recommended — 100% Free All-in-One Service)

With our multi-stage [`Dockerfile`](./Dockerfile), Render automatically builds the React frontend, seeds the SQLite database, trains the Scikit-learn ML model, and serves the entire platform from a single unified URL.

### Steps:
1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Production full-stack ready"
   git push origin main
   ```
2. Go to [dashboard.render.com](https://dashboard.render.com/) and click **New +** $\rightarrow$ **Web Service**.
3. Connect your GitHub repository.
4. Set the following settings:
   - **Name**: `ai-food-waste-platform`
   - **Region**: Closest to you (e.g., Singapore / Frankfurt / Oregon)
   - **Language / Runtime**: **Docker**
   - **Instance Type**: **Free**
5. Click **Deploy Web Service**.
6. Render will automatically build the container and provide your live HTTPS URL:
   `https://ai-food-waste-platform.onrender.com`

> **Note**: Both the React web application and the interactive API documentation (`/docs`) are served from this single link!

---

## ⚡ Method 2: Split Deployment (Vercel Frontend + Render Backend)

If you prefer deploying the frontend on **Vercel** and backend on **Render**:

### Step 2A: Deploy Backend on Render
1. In Render, select **New +** $\rightarrow$ **Web Service**.
2. Connect your repo and set:
   - **Environment**: **Python 3**
   - **Build Command**:
     ```bash
     pip install -r backend/requirements.txt && python backend/seed_data.py && python backend/train_model.py
     ```
   - **Start Command**:
     ```bash
     uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT
     ```
3. Copy your live backend URL (e.g., `https://food-waste-api.onrender.com`).

### Step 2B: Deploy Frontend on Vercel
1. Go to [vercel.com](https://vercel.com/) and click **Add New** $\rightarrow$ **Project**.
2. Import your GitHub repository.
3. In **Environment Variables**, add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://food-waste-api.onrender.com` (your Render backend URL)
4. Click **Deploy**. Vercel will build and launch your frontend with global CDN caching.

---

## 🐳 Method 3: Docker Deployment (Local VPS / AWS EC2 / DigitalOcean)

To run the complete production container on any server with Docker installed:

```bash
# 1. Build and run in background
docker compose up -d --build

# 2. Check running container status
docker ps

# 3. View live server logs
docker compose logs -f
```
The application will be live at `http://YOUR_SERVER_IP:8000`.

---

## 🔍 Pre-Deployment Verification Checklist

- [x] Machine Learning model trained and tested ($R^2 = 92.54\%$).
- [x] SQLite database schema initialized and seeded with 1,000 providers & 1,000 receivers.
- [x] CORS middleware enabled for all domains.
- [x] React single-page routing rewrite configured in `vercel.json` and FastAPI fallback.
- [x] Frontend production bundle verified with `npm run build`.

