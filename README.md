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

<!-- TRILLIONX:presentation:begin -->

### Animated surfaces

Generated from this repository's own source tree: every count, route and module below was measured, not written by hand.

#### Identity

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/hero-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/hero-light.svg">
  <img alt="Identity diagram for imessage" src="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/hero-motion.svg">
</picture>

#### Entry points

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/terminal-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/terminal-light.svg">
  <img alt="Entry points diagram for imessage" src="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/terminal-motion.svg">
</picture>

#### Modules

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/architecture-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/architecture-light.svg">
  <img alt="Modules diagram for imessage" src="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/architecture-motion.svg">
</picture>

#### Routes

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/data_flow-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/data_flow-light.svg">
  <img alt="Routes diagram for imessage" src="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/data_flow-motion.svg">
</picture>

#### Composition

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/component_map-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/component_map-light.svg">
  <img alt="Composition diagram for imessage" src="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/component_map-motion.svg">
</picture>

#### Build and tests

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/build-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/build-light.svg">
  <img alt="Build and tests diagram for imessage" src="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/build-motion.svg">
</picture>

#### Identity object

<picture>
  <source media="(prefers-reduced-motion: reduce)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/footer-reduced.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/footer-light.svg">
  <img alt="Identity object diagram for imessage" src="https://raw.githubusercontent.com/M4G3LL4N0/imessage/main/.github-art/surfaces/footer-motion.svg">
</picture>

<!-- TRILLIONX:presentation:end -->

<!-- TRILLIONX:evidence:begin -->

## What is measurable here

Generated by `.github-art` from the source tree at publish time.

| Signal | Value |
| --- | --- |
| HTTP routes | 2 |
| Entry points | 1 |
| Module roots | 2 |
| Test files | 0 |
| CI workflows | 0 |
| Distinctive stack | Zod |
| Status | PROTOTYPE |
| Evidence confidence | E2 |
| Animated surfaces | 7 |

<!-- TRILLIONX:evidence:end -->
