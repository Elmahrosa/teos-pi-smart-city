# Elmahrosa Smart City

Egypt's first Pi-powered civic platform. Report, sign, and build your city transparently.

## Demo and sandbox disclosure

All figures and activity are **Demo data for Pi Next Hackathon**. The 5 Pi petition fee uses TESTNET SANDBOX simulation only. **Sandbox Mode — No real Pi will be charged yet**. The checkout does not call Pi.createPayment and cannot create a real Pi transaction.

## Run locally

```bash
npm install
npm run dev
npm run build
npm start
```

## Deploy to Vercel

Import this GitHub repository in Vercel, keep the Next.js defaults, and deploy from `main`. No environment variables or database are required for the demo.

## Pi Browser

The app loads `https://sdk.minepi.com/pi-sdk.js`, initializes Pi with `sandbox: true`, and requests only the `username` scope. Outside Pi Browser it stays usable and shows the Pi Browser guidance.

Before real Testnet or Mainnet transactions: register the app in the Pi Developer Portal, implement server-side approval/completion endpoints, keep app credentials on the server, and never place secrets or wallet credentials in client code.

## Pi Console submission

- App name: Elmahrosa Smart City
- Category: Utilities / Civic
- Short description: A Pi-powered civic demo to report, sign, and build a better city.
- Long description: Alexandria-inspired civic participation demo for petitions, governance, transparent tracking, community mapping, and pioneer badges. The 5 Pi petition action is a clearly labeled Testnet sandbox simulation and does not charge Pi. All content is demo data for Pi Next Hackathon 2026.
- Screenshot 1: Home view with the Alexandria-inspired illustration and demo label.
- Screenshot 2: Petition view with 5 Pi sandbox disclosure.
- Screenshot 3: Governance, treasury, community map, and pioneer badge cards.

Footer: Built in Alexandria, Egypt for Pi Next Hackathon 2026.
