# Elmahrosa Smart City

A community-built civic smart city concept in Alexandria, Egypt, built for Pi Next Hackathon 2026.

> **Concept & Community Vision.** This project is not an operating city, land development, investment, or financial product. Land partnership under study - no land sale. No shares, profit, or returns are offered. Pi SDK is configured with `sandbox: false` for production build. Any payment flow must be completed through properly secured server-side approval/completion handlers and Pi Developer Portal approval before mainnet use.

## Run locally

Requirements: Node.js 18.17+ and npm.

```bash
npm install
npm run dev
npm run build
npm start
```

Open <http://localhost:3000>. The Pi SDK sign-in UI is available only in Pi Browser; outside it, the app remains browseable. Payment and petition flows require Pi Browser context and properly configured server-side Pi handlers.

## Deploy to Vercel

Import `Elmahrosa/teos-pi-smart-city` in your Vercel account, select the Next.js preset, and deploy from `main`. No environment variables or database are required for the base deployment. A repository update alone does not grant deployment access or verify a Vercel deployment; check the Vercel build logs after import.

## Pi Browser and Console

Pi sign-in requests the `username` scope using the Pi Browser SDK with `sandbox: false` in the production build. Pi payment integration requires properly secured server-side approval/completion handlers, credentials stored as server secrets, and testing/approval through the Pi Developer Portal before enabling mainnet transactions.

Suggested Console details and submission checklist: [`docs/PI_CONSOLE_ASSETS.md`](docs/PI_CONSOLE_ASSETS.md).

## Features

- Arabic-first interface with English toggle
- Concept districts, Alexandria map illustration, and phased vision
- Session-based proposal voting and proposal-writing helper
- Treasury disclosure and complimentary badge concept
- No sale of land or shares, no financial claims

## Security and environment

Never commit `.env` files, API keys, Pi credentials, or deployment tokens. Use Vercel environment settings for private deployment secrets. Review your repository and Vercel settings before public submission.
