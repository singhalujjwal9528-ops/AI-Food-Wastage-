# AI Food Wastage Prevention & Surplus Redistribution System

A production-grade, full-stack AI-driven web application integrating a **React 19 + TypeScript Frontend**, **FastAPI REST Backend**, **SQLite Relational Database**, and a **Scikit-Learn Machine Learning Engine** trained on the official `AI food wastage System` dataset.

**Live Demo:** https://ai-food-wastage.vercel.app/ | https://ai-food-wastage.onrender.com

---

## Architecture & Full-Stack Integration

```text
┌─────────────────────────────────────────────────────────────┐
│                       React Frontend                        │
│         (Vite, TypeScript, Tailwind CSS, Recharts)          │
│       Role Dashboards: Restaurant | NGO | Courier | Admin   │
└──────────────────────────────▲──────────────────────────────┘
                               │
                      REST API & Live Proxy (/api)
                               │
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
