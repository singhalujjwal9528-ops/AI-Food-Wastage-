# AI Food Waste Platform - Frontend

A clean, practical, student-developed food surplus redistribution web application designed for academic viva evaluation and real-world deployment.

## 🌟 Project Purpose & Core Philosophy
Urban food wastage occurs primarily due to delayed information sharing between commercial food establishments (restaurants, banquets, catering kitchens) and community shelters/orphanages.

This platform bridges that gap using:
1. **Instant Surplus Publishing**: 60-second donation listing form.
2. **AI-Assisted Pickup & Route Optimization**: Dynamically balances food freshness shelf-life, road traffic, and courier proximity.
3. **Multi-Role Portals**: Dedicated operational interfaces for Restaurants, NGOs, Volunteers, and Admins.
4. **Live Telemetry & Timeline Tracking**: 5-step pickup lifecycle from listing to physical handover.
5. **Environmental Impact Analytics**: Interactive Recharts tracking carbon offset (kg CO₂e) and meals redistributed.

---

## 🛠️ Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (Clean white background, green accents, subtle borders)
- **Routing**: React Router v6 (`react-router-dom`)
- **Data Visualization**: Recharts (Area, Bar, Pie, Line charts)
- **Icons**: Lucide React
- **State Management**: React Context (`AppContext`) with automatic `localStorage` persistence

---

## 🚀 Running the Project Locally

```bash
# 1. Navigate to the project directory
cd "C:\Users\ujjwa\.gemini\antigravity-ide\scratch\ai-food-waste-platform"

# 2. Install dependencies (if not already installed)
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser:
http://localhost:5173/
```

To run a production build test:
```bash
npm run build
```

---

## 🧭 Page Routes & Architecture

| Route | Feature Description |
|---|---|
| `/` | **Landing Page**: Hero section ("Turn Surplus Food Into Someone's Meal"), impact metrics, 4-step workflow, live active batches feed. |
| `/login` & `/register` | **Authentication**: Fast persona switchers (Restaurant, NGO, Volunteer, Admin) for viva demonstration. |
| `/restaurant/dashboard` | **Restaurant Dashboard**: 4 key stats (Total food donated, Active donations, Completed pickups, Food saved this month), recent donation table with filters. |
| `/restaurant/add-food` | **Add Surplus Food**: Practical form with food item, category, quantity, unit, preparation time, expiry time, pickup address, contact number, and map preview. |
| `/ngo/dashboard` | **NGO Dashboard**: Nearby available food list, active pickups, one-click "Accept Pickup" action. |
| `/volunteer/dashboard` | **Volunteer Dashboard**: Available pickups list, active delivery mission, "Mark Picked Up" and "Mark Delivered" status controls. |
| `/ai-optimization` | **AI Pickup Optimization**: Freshness decay model, traffic conditions, estimated pickup time, and "Recommended Pickup" panel with schematic map. |
| `/available-food` | **Food Availability Board**: Discovery board with category, distance radius, and expiry filters. Toggle between Grid and Table view. |
| `/tracking` | **Live Pickup Tracking**: 5-step timeline (Donation Created → Pickup Assigned → Food Picked Up → On the Way → Delivered) + GPS map schematic. |
| `/notifications` | **Notification Center**: Real-time alerts for new surplus, courier assignment, expiry warnings, and AI routes. |
| `/analytics` | **Analytics Dashboard**: Recharts graphs (Monthly trend, Category breakdown pie, SLA timeliness, Carbon footprint reduction). |
| `/donation-history` | **Donation Ledger**: Searchable, filterable, and sortable historical archive of all food distributions. |
| `/admin/dashboard` | **Admin Control Center**: User accounts directory, FSSAI verification approvals, platform-wide audit log. |
| `/settings` | **Profile & Preferences**: Personal info, operational location, notification rules, and password management. |

---

## 💡 Viva / Project Presentation Points

When presenting this project to examiners or professors, highlight these design decisions:
1. **Human & Developer-Built Aesthetic**: Clean white background, no distracting AI gradients or glassmorphism. Looks like an authentic B.Tech CSE capstone project.
2. **Freshness Decay Weighting**: The AI routing logic doesn't just calculate Euclidean distance; it balances $t_{\text{remaining}}$ against traffic congestion so highly perishable items get prioritized over packaged bakery items.
3. **Synchronous Cross-Role State**: Adding a donation as a Restaurant immediately shows up in the NGO claim board and Volunteer task pool without requiring a backend reload.
4. **Indian Urban Context**: Realistic locations in Bengaluru (Indiranagar, Koramangala, HSR Layout, Jayanagar, Whitefield) and Indian culinary categories (Cooked meals, Dal, Rice, Rotis).
