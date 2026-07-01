# Hawassa Lakeside — Fundraising Site

A donation site for the **Hawassa Lakeside** lakefront-park project (a Sidama
Bank initiative, powered by AfroPay). Built with **Next.js (App Router)**,
Tailwind, and **Prisma**, with real wallet payments through **AfroPay**
(Telebirr, CBE Birr, M-PESA, Awash) via internal server API routes.

> ⚠️ This is a **Next.js server app** (it runs API routes + a database). It
> **cannot** be hosted on GitHub Pages (static only). Deploy to a Node/serverless
> host such as **Vercel**, Render, Railway, or your own Node server.

---

## 1. Prerequisites

- **Node.js 18+** (tested on Node 24)
- npm

## 2. Install

React 19 needs the legacy peer-deps flag:

```bash
npm install --legacy-peer-deps
```

## 3. Configure environment

Copy the example and fill in your values:

```bash
cp .env.example .env.local
```

`.env.local` (gitignored — never commit real keys):

| Variable | What it is |
|----------|------------|
| `DATABASE_URL` | Prisma DB URL. Default `file:./dev.db` (local SQLite). |
| `AFROPAY_BASE_URL` | `https://paybridge.afropays.co/api/v1` |
| `AFROPAY_API_KEY` | Your AfroPay API key (**server-side only**, never exposed to the browser). |
| `NEXT_PUBLIC_SITE_URL` | Public URL, used for AfroPay redirect/callback URLs (e.g. `http://localhost:3000` in dev). |

## 4. Set up the database (Prisma)

```bash
npm run prisma generate      # generate the client
npm run prisma db push       # create the SQLite tables (dev.db)
```

(`npm run build` also runs `prisma generate` automatically.)

## 5. Run it

```bash
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build && npm start
```

---

## Testing a donation / payment

1. Open the site → **Donate** → pick an amount → **Continue to checkout**.
2. **Wallet** tab → choose a wallet:
   - **Telebirr / CBE Birr / Awash** — any Ethiopian number (e.g. `09xxxxxxxx`).
   - **M-PESA** — must be a **Safaricom** number starting with **07** (validated).
3. Tap **Pay** → a **"Confirm on your phone"** modal appears and polls the
   transaction status. Approve the USSD prompt on the phone with its PIN.
4. On success (AfroPay status `2`) you get a confirmation and the campaign total
   is incremented; anything else shows a failure screen.

**Notes**
- Use **real wallet accounts** — dummy numbers make the gateway return errors.
- The AfroPay sandbox can be rate-limited; retry if a call transiently fails.
- Bank / domestic card / international card tabs are UI-only for now (no live
  endpoint wired yet).

## Payment flow (how it works)

```
Browser → POST /api/afropay/initiate   (server calls AfroPay, key stays secret)
        ← { reference }
Browser → GET  /api/afropay/status?reference=…   (polled every 4s)
        ← { outcome: success | pending | failed }
```

Everything is persisted with Prisma: `Donation` + `PaymentTransaction`
(+ `Campaign`). Status code **2 = success**; `0/1` keep polling; anything else
is treated as failed.

## Key files

| Path | Purpose |
|------|---------|
| `src/lib/afropay-config.ts` | Base URL + API key (from env) |
| `src/lib/afropay-api.ts` | Server-side AfroPay calls + per-wallet endpoints |
| `src/lib/afropay-client.ts` | Browser helpers that call our internal routes |
| `src/app/api/afropay/initiate/route.ts` | Create donation + start payment |
| `src/app/api/afropay/status/route.ts` | Poll status + persist result |
| `src/lib/prisma.ts` | Prisma client + default campaign |
| `src/components/AfroPayCheckout.tsx` | Checkout UI + waiting modal + polling |
| `prisma/schema.prisma` | Data models |

## Deploying

- **Vercel** (recommended): import the repo, set the env vars from
  `.env.example`. For serverless, switch the Prisma datasource to Postgres and
  set `DATABASE_URL` accordingly (SQLite doesn't persist on serverless).
- **Node server / VPS**: `npm run build && npm start`; SQLite works with a
  persistent disk.
