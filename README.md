# Photon iMessage Sender

A production-oriented Next.js app that sends iMessages via Photon Codes using a secure server-side API route.

## What this app does

- Renders a minimal web form for:
  - iMessage phone number
  - message text
- Sends form data to `POST /api/send`
- Validates and normalizes input on the server
- Uses Photon SDK **only on the server** (never in client code)
- Returns clear success/error states in the UI

## Tech stack

- Next.js (App Router)
- TypeScript
- pnpm
- Vercel-compatible server route (`runtime = "nodejs"`)
- `zod` for validation
- `@photon-ai/advanced-imessage-kit` for Photon integration

## Required environment variables

Create a local env file from the example:

```bash
cp .env.local.example .env.local
```

Set the following values:

- `PHOTON_SERVER_URL` - Your Photon server URL
- `PHOTON_API_KEY` - Your Photon API key

## Install and run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and run production locally

```bash
pnpm build
pnpm start
```

## Deploy to Vercel

1. Create a Vercel project from this repository.
2. In Vercel project settings, add:
   - `PHOTON_SERVER_URL`
   - `PHOTON_API_KEY`
3. Deploy.

CLI deployment flow:

```bash
pnpm dlx vercel
pnpm dlx vercel --prod
```

## Security notes

- Never expose `PHOTON_API_KEY` in client-side code.
- Keep all Photon initialization and message sending inside `app/api/send/route.ts`.
- Do not commit `.env.local` or any real credentials.
