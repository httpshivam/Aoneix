# AIONEX Dashboard - Developer Architecture & Guidelines

## 1. 🎨 Theme & UI/UX Principles
- **AIONEX Website Theme Alignment**: The dashboard strictly inherits the design language of the main website:
  - Brand Palette: `#00c25a` (Primary), `#075e37` (Dark), `#052e16` (Deep), `#eaf8ef` (Surface Mint), `#132c1c` (Badge Dark).
  - Typography: Apple SF Pro Display / System UI.
  - Visual Elements: Glassmorphism (`shadow-glass`), subtle green glows, rounded borders (`rounded-2xl`, `rounded-3xl`).
- **Screenshots (SS) Usage**: Any screenshots provided by the client/user are **strictly for understanding functionality, workflows, and data fields** — NOT for copying raw UI. The UI must always follow the AIONEX premium design system.

---

## 2. ⚡ Dynamic Data & ISR / Cache Rules
- **ISR Write / Revalidate Rule**: STRICTLY **0** (`revalidate: 0`, `cache: 'no-store'`).
- All requests are executed with `no-cache`, `no-store`, `must-revalidate` headers.
- Stale caching is prohibited; all data updates, lead status transitions, and analytics must be dynamic and live.

---

## 3. 📁 Organized API Architecture
The `api/` directory is strictly modularized by domain section:

```
dashboard/src/api/
├── client.js                # Centralized dynamic fetch wrapper (cache: 'no-store')
├── analytics/
│   └── analytics.api.js     # Stats, conversion rates, trends
├── leads/
│   └── leads.api.js         # Inquiries, lead qualification, status updates
├── projects/
│   └── projects.api.js      # Client projects and timeline
├── services/
│   └── services.api.js      # AI platform services catalog
└── index.js                 # Central export registry
```

Any new section must have its own dedicated folder under `src/api/<section>/<section>.api.js`.

---

## 4. 🔒 Git & Deployment Policy
- **CRITICAL**: Never push to GitHub or trigger deployments without explicit user confirmation.
