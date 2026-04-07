# Accounting Oracle 2026

**"What does 2026 hold for your ecommerce accounting journey?"**

A mystical, interactive tarot card experience built for ecommerce accounting professionals. Users shuffle a deck of 39 accounting-themed fortune cards, draw one, and receive a shareable mystical reading — with animations, sound effects, and LinkedIn sharing built in.

Live at: [myworks.software/oracle/](https://myworks.software/oracle/)

---

## How it works

1. **Home** — Crystal ball animation with a "Reveal My Fortune" CTA
2. **Deck** — 5-card stack with a shuffle animation; user draws a random card
3. **Fortune** — 3D card flip reveal with mystical copy, LinkedIn share, and "Draw again" option

Each card has a canonical URL (`/oracle/card-XX`) that can be shared directly.

---

## Tech stack

| Layer | Tools |
|---|---|
| Framework | React 18, TypeScript, Vite 5 |
| Routing | React Router 6 |
| Styling | Tailwind CSS, shadcn-ui, Radix UI |
| Server | Express (SPA fallback, serves `dist/`) |
| Forms | React Hook Form + Zod |
| Data fetching | TanStack React Query |
| Analytics | localStorage-based (no external calls) |

---

## Routing

| Path | View |
|---|---|
| `/oracle/` | Home (crystal ball) |
| `/oracle/card-XX` | Fortune card reveal (XX = 01–39) |
| `/*` | 404 Not Found |

---

## Local development

```sh
npm install
npm run dev
```

### Production build & serve

```sh
npm run build
npm start         # Express server on PORT (default 3000)
```

Vite base path is set to `/oracle/` — keep this in mind for any asset references.

---

## Analytics & debug

Tracking is stored in `localStorage` only — nothing is sent to a server. In the browser console:

```js
window.__oracleDebug.getCounts()   // draw counts per card
window.__oracleDebug.getEvents()   // event log (last 500)
window.__oracleDebug.top(5)        // top 5 most-drawn cards
window.__oracleDebug.clearAll()    // reset all tracking data
```

---

## Cards

39 accounting-themed fortune cards including: *Reconciliation Sage*, *Tax Deadline Dynamo*, *Cash Flow Crystal Ball*, *AI Ally Amulet*, and more. Card images are hosted on Supabase CDN; card back and background assets are bundled locally.
