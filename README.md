# AIONEX Platform Workspace

This project is structured as a monorepo containing both the public **Website** and the internal **Admin Dashboard**.

```
AIONEX WEBSITE/
├── website/              # Public marketing website (Vite + React + Tailwind)
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── vite.config.js    # Runs on Port 3000
│   └── package.json
│
├── dashboard/            # Administrative dashboard (Vite + React + Tailwind)
│   ├── src/
│   │   ├── components/   # Sidebar, Header, Overview stats & tables
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js    # Runs on Port 3001
│   └── package.json
│
├── package.json          # Root workspace configuration
└── README.md
```

---

## 🚀 Quick Start

Run all commands from the root directory:

### Run Public Website Only (Port 3000)
```bash
npm run dev:website
# or: npm run dev
```

### Run Admin Dashboard Only (Port 3001)
```bash
npm run dev:dashboard
```

### Run Both Website & Dashboard Concurrently
```bash
npm run dev:all
```

---

## 🛠️ Build

```bash
# Build both modules
npm run build

# Build individual modules
npm run build:website
npm run build:dashboard
```
