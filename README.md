# 🐝 BeeBite – Real‑Time Food Ordering & Tracking

BeeBite is a demo restaurant platform that showcases **real‑time order tracking** with **Socket.IO**, **MongoDB**, and a modern **React** + **Tailwind CSS** UI.

Customers can place orders, track them live, and view order history.  
Admins get a live dashboard to manage every stage of the order lifecycle.

---

## ✨ Features

### Customer

- **Landing page + menu**
  - Bee‑themed hero, interactive sections, category filters
- **Cart**
  - Add/remove items, update quantity
  - Persists in `localStorage` (refresh‑safe)
- **Checkout**
  - Validated form (name, phone, address)
  - Live totals (subtotal, tax, delivery fee)
  - Emits `placeOrder` via Socket.IO
- **Order tracking**
  - Real‑time status updates (pending → confirmed → preparing → ready → out_for_delivery → delivered)
  - Progress timeline, ETA badge, live activity feed
- **Order history**
  - Lookup by phone number
  - Filter by Active / Completed / Cancelled
  - Click to open tracking page

### Admin

- **Admin login**
  - Socket‑based `adminLogin` with password (from `.env`)
  - Session persisted in `localStorage` (`isAdmin`, `adminPass`)
- **Dashboard**
  - Stats: today’s orders, pending, in‑kitchen, delivered
  - Tabs: Pending / In Progress / Delivery / Completed / Cancelled
  - Colorful order cards with quick actions
- **Order actions**
  - Accept order with custom ETA
  - Reject with preset/custom reasons
  - Update status step‑by‑step
  - Set / adjust ETA from detail modal
- **Order detail modal**
  - Customer info
  - Items, totals, payment info
  - Status history timeline
  - ETA controls

### Real‑Time

- Socket.IO events for both customer & admin
- Socket rooms:
  - `order_{orderId}` – per‑order updates
  - `customers` – global customer feed
  - `admins` – admin updates
- Live activity feed for customers and admins

---

## 🧱 Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Socket.IO Client
- **Backend:** Node.js, Express, Socket.IO Server
- **Database:** MongoDB (orders + status history)
- **State persistence:** `localStorage` (cart, admin session, customer phone)

---

## 📁 Project Structure (simplified)

```text
.
├── server/
│   ├── server.js              # Express + Socket.IO entry point
│   ├── config/
│   │   └── database.js        # connectDB, getCollection, closeDB
│   ├── socket/
│   │   └── orderHandler.js    # all Socket.IO events
│   └── utils/
│       └── helper.js          # generateOrderId, validateOrderData, totals, etc.
└── client/
    ├── src/
    │   ├── App.jsx
    │   ├── hooks/
    │   │   └── useSocket.js
    │   ├── components/
    │   │   ├── common/        # Header, Notification, ConnectionStatus
    │   │   ├── customer/      # Menu, Cart, OrderForm, OrderTracking, OrderHistory, LandingPage
    │   │   └── admin/         # AdminLogin, AdminDashboard, OrderCard, OrderDetail
    │   └── utils/
    │       └── menuData.js
    └── index.html, etc.

Live Link : https://beebite.vercel.app/
