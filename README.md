# Elmahrosa Smart City

A community-built civic smart city concept in Alexandria, Egypt, prepared as a demo for Pi Next Hackathon 2026.

> **Demo Data for Pi Next Hackathon. Concept & Community Vision.** This project is not an operating city, land development, investment, or financial product. Land partnership under study — no land sale. No shares, profit, or returns are offered. **Sandbox Mode — No real Pi charged.**

## Run locally

Requirements: Node.js 18.17+ and npm.

```bash
npm install
npm run dev
npm run build
npm start
```

Open <http://localhost:3000>. The Pi SDK sign-in UI is available only in Pi Browser; outside it, the demo remains browseable. Petition support is a local UI simulation only. It never creates or submits a Pi transaction.

## Deploy to Vercel

Import `Elmahrosa/teos-pi-smart-city` in your Vercel account, select the Next.js preset, and deploy from `main`. No environment variables or database are required for the static demo. A repository update alone does not grant deployment access or verify a Vercel deployment; check the Vercel build logs after import.

## Pi Browser and Console

Pi sign-in requests the `username` scope using the Pi Browser SDK in sandbox mode. Do not treat the UI payment simulation as a real or testnet transaction. Pi payment integration requires properly secured server-side approval/completion handlers, credentials stored as server secrets, and testing/approval through the Pi Developer Portal. This repository does not implement those handlers and must not be switched to Mainnet by changing a variable.

Suggested Console details and submission checklist: [`docs/PI_CONSOLE_ASSETS.md`](docs/PI_CONSOLE_ASSETS.md).

## Demo features

- Arabic-first interface with English toggle
- Concept districts, Alexandria map illustration, and phased vision
- Session-only proposal voting and a local proposal-writing helper
- Demo treasury disclosure and complimentary badge concept
- No sale of land or shares, no financial claims, and no real payment processing

## Security and environment

Never commit `.env` files, API keys, Pi credentials, or deployment tokens. Use Vercel environment settings for private deployment secrets. The sandbox UI does not need secrets. Review your repository and Vercel settings before public submission.
