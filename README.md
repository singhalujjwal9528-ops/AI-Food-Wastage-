# AI Food Wastage Prevention & Surplus Redistribution System

A production-grade, full-stack AI-driven web application integrating a **React 19 + TypeScript Frontend**, **FastAPI REST Backend**, **SQLite Relational Database**, and a **Scikit-Learn Machine Learning Engine** trained on the official `AI food wastage System` dataset.

---

## 🌟 Architecture & Full-Stack Integration

```
┌─────────────────────────────────────────────────────────────┐
│                       React Frontend                        │
│         (Vite, TypeScript, Tailwind CSS, Recharts)          │
│       Role Dashboards: Restaurant | NGO | Courier | Admin   │
└──────────────────────────────▲──────────────────────────────┘
                               │  REST API & Live Proxy (/api)
┌──────────────────────────────▼──────────────────────────────┐
│                      FastAPI Backend                        │
│          Endpoints: Donations, Claims, Pickups, AI          │
│            Interactive Swagger Docs: /docs                  │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
┌──────────────▼──────────────┐┌──────────────▼───────────────┐
│     SQLite Database         ││   Scikit-Learn ML Model      │
│     (food_waste.db)         ││ (RandomForestRegressor 92.5%)│
│  - 1,000 Providers          ││  Trained on 1,782 records    │
│  - 1,000 Receivers          ││  - Wastage prediction        │
│  - 1,000 Claims             ││  - CO₂ emission forecasting  │
│  - Active & Past Donations  ││  - Prevention heuristics     │
└─────────────────────────────┘└──────────────────────────────┘
```

---

## 📊 Dataset Integration (`AI food wastage System`)

All 5 core dataset files have been integrated into the database and machine learning pipeline:

| Dataset File | Rows | Schema / Key Columns | Role in Platform |
|---|---|---|---|
| `food_wastage_data.csv` | 1,782 | Type of Food, Guests, Event, Quantity, Storage, Seasonality, Location, Wastage Amount | **Trained Machine Learning Model** (`RandomForestRegressor`, $R^2 = 92.54\%$, $\text{MAE} = 1.62\text{ kg}$) for event wastage forecasting. |
| `providers_data.csv` | 1,000 | Provider_ID, Name, Type, Address, City, Contact | Seeded into SQLite `providers` table; powers donor establishment directories. |
| `receivers_data.csv` | 1,000 | Receiver_ID, Name, Type, City, Contact | Seeded into SQLite `receivers` table; verified NGOs, orphanages & community kitchens. |
| `food_listings_data.csv` | 1,000 | Food_ID, Food_Name, Quantity, Expiry, Provider_ID, Location, Food_Type, Meal_Type | Seeded into SQLite `donations` table; active and archival food surplus inventory. |
| `claims_data.csv` | 1,000 | Claim_ID, Food_ID, Receiver_ID, Status, Timestamp | Seeded into SQLite `claims` table; historical claim transactions. |

---

## 🚀 Quick Start (Running Locally)

### Option 1: One-Click Windows Launcher
Double-click `start_all.bat` or run:
```cmd
start_all.bat
```
This automatically verifies the database, trains the model if needed, starts the FastAPI server (`:8000`), starts Vite (`:5173`), and launches your browser.

---

### Option 2: Running Frontend & Backend Manually

#### 1. Backend & Database
```bash
# 1. Train the ML model on the dataset
python backend/train_model.py

# 2. Seed SQLite database from CSV datasets
python backend/seed_data.py

# 3. Launch FastAPI server
python backend/run_server.py
```
- **Backend API**: `http://127.0.0.1:8000`
- **Interactive Swagger Docs**: `http://127.0.0.1:8000/docs`

#### 2. Frontend Development Server
In a separate terminal:
```bash
npm install
npm run dev
```
- **Web App**: `http://localhost:5173`

---

## 🛠️ REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | System health, database connection state & counts. |
| `GET` | `/api/donations` | List surplus food batches with search, category, and status filters. |
| `POST` | `/api/donations` | Publish a new surplus food batch (auto-generates courier pickup task). |
| `GET` | `/api/donations/{id}` | Retrieve specific food listing details. |
| `POST` | `/api/donations/{id}/claim` | NGO claim action (assigns NGO and dispatches volunteer). |
| `GET` | `/api/pickups` | List all delivery courier missions and waypoints. |
| `POST` | `/api/pickups/{id}/accept` | Volunteer accepts delivery assignment. |
| `PATCH` | `/api/pickups/{id}/status` | Update pickup status (`Picked Up`, `On the Way`, `Delivered`). |
| `GET` | `/api/notifications` | Real-time event notifications for surplus, assignments, and deliveries. |
| `GET` | `/api/stats` | Aggregated metrics: kg food saved, meals provided, $CO_2$ offset. |
| `GET` | `/api/analytics` | Recharts-compatible analytics (monthly trend, category breakdown). |
| `POST` | `/api/ai/predict-wastage` | **Scikit-Learn ML inference**: Predicts surplus kg, carbon footprint, and risk level. |
| `GET` | `/api/ai/optimize-routes` | **AI Freshness Routing**: Priority scoring based on spoilage decay and traffic. |
| `GET` | `/api/dataset/summary` | Dataset metadata, row counts, and training verification. |
| `GET` | `/api/dataset/providers` | Paginated search of 1,000 providers from dataset. |
| `GET` | `/api/dataset/receivers` | Paginated search of 1,000 receivers from dataset. |

---

## 🤖 AI / Machine Learning Capabilities

1. **Scikit-Learn Wastage Regressor**:
   - Model: `RandomForestRegressor(n_estimators=120, max_depth=16)`
   - Preprocessing: `StandardScaler` (numerical) + `OneHotEncoder` (categorical) inside a unified `Pipeline`.
   - **Metrics**: $R^2 = 0.9254$ ($92.5\%$), $\text{MAE} = 1.62\text{ kg}$, $\text{RMSE} = 2.78\text{ kg}$.
   - Provides risk classification (`Low`, `Medium`, `High`), carbon footprint calculation ($2.5\text{ kg } CO_2e / \text{kg}$ food), and actionable prevention heuristics.

2. **Freshness Decay & Traffic-Aware Routing Algorithm (FDMTR)**:
   $$\text{Priority Score} = \left(\frac{100 - \text{Freshness}}{2}\right) + \left(\text{Distance} \times \text{Traffic Factor} \times 2.5\right) \times \text{Urgency Multiplier}$$
   Prioritizes rapidly degrading hot cooked meals over packaged dry goods.

---

## 🎓 Academic Viva & Presentation Highlights

- **Complete 3-Tier Architecture**: Clean presentation of Client (React 19), Server (FastAPI), and Database (SQLite relational persistence).
- **Real Dataset Implementation**: Examiners can browse through the 1,000 providers and 1,000 receivers directly inside the **Admin Dashboard -> Dataset & SQLite DB Explorer** tab.
- **Explainable ML**: Trained pipeline with documented $R^2$ validation score, feature importance, and interactive prediction interface in **AI Optimization -> ML Food Wastage Predictor**.
