# 🌾 Framers Group of India

A community of 250+ farmers — Premium Groundnuts from Farm to Globe.

## Features
- 📊 Live Groundnut Market Price vs Our Price
- 📦 Live Order Tracking
- 🛒 Products Listing (Seeds, Fertilizers, Tools)
- 🌱 Seeds & Industries Guide

## Tech Stack
- **Frontend**: React + Vite + React Router
- **Backend**: Node.js + Express
- **Database**: MongoDB (mock data for prototype)

## Project Structure
```
framers-group-india/
├── client/                 ← React frontend
│   └── src/
│       ├── components/     ← Navbar, Footer, Ticker
│       ├── pages/          ← Home, Prices, TrackOrder, Products, Seeds
│       └── styles/         ← Global CSS
└── server/                 ← Express backend
    ├── routes/             ← prices, orders, products, seeds
    └── data/               ← Mock data
```

## Setup & Run

### Step 1 — Install dependencies
```bash
# Install server
cd server && npm install

# Install client
cd ../client && npm install
```

### Step 2 — Run the backend
```bash
cd server
npm run dev
# Runs on http://localhost:5000
```

### Step 3 — Run the frontend (new terminal)
```bash
cd client
npm run dev
# Opens at http://localhost:5173
```

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/prices | Get groundnut prices |
| GET | /api/orders/:orderId | Track an order |
| GET | /api/products | List all products |
| GET | /api/products?category=seed | Filter by category |
| GET | /api/seeds | List all seeds & industries |

## Test Order IDs
- `FGI-2024-1001` — Delivered
- `FGI-2024-1053` — On the Way
- `FGI-2024-1089` — Packed
