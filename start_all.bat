@echo off
title AI Food Wastage Prevention Platform - Full Stack Launcher
color 0A
echo ========================================================
echo  AI Food Wastage Prevention & Surplus Platform
echo  FastAPI Backend + SQLite Database + React Frontend
echo ========================================================
echo.

echo [1/2] Verifying SQLite database and ML models...
if not exist "backend\food_waste.db" (
    echo Seeding SQLite database from dataset...
    python backend\seed_data.py
)

if not exist "backend\ml\wastage_model.joblib" (
    echo Training Random Forest ML Model on food wastage dataset...
    python backend\train_model.py
)

echo.
echo [2/2] Launching Full Stack Services...
echo  - Backend API & SQLite: http://127.0.0.1:8000
echo  - Interactive Swagger Docs: http://127.0.0.1:8000/docs
echo  - React + Vite Web App: http://localhost:5173
echo.
npm run dev
