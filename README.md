# start-sitebridge-nextjs

A production-ready boilerplate for SiteBridge deployment: **Next.js** API server + **Vite React** SPA client.

## Structure

- **`client/`** -- Vite + React 19 SPA with Tailwind CSS v4 and React Router
- **`server/`** -- Next.js 15 API server with better-sqlite3 and standalone output

## Local Development

Start the server and client in separate terminals:

```bash
# Terminal 1: Start the API server on port 4000
cd server
npm install
npm run dev

# Terminal 2: Start the Vite dev server
cd client
npm install
npm run dev
```

The client dev server proxies API requests to `http://localhost:4000` automatically via the `api.ts` helper.

## Deployment

Push to any branch to trigger the GitHub Actions deploy workflow. Required secrets:

- `SSH_PRIVATE_KEY` -- Base64-encoded SSH private key
- `VM_HOST` -- Target server hostname
- `VM_USER` -- SSH user
- `DEPLOY_PATH` -- Absolute path on the server
- `PREVIEW_PORT` -- Port for the PM2 process
- `SITE_ID` -- SiteBridge site identifier
- `WEBHOOK_URL` -- SiteBridge webhook endpoint
- `WEBHOOK_SECRET` -- Webhook HMAC secret

## Key Design Decisions

- **Standalone output** -- Next.js builds to a self-contained `standalone/` directory for minimal deployment footprint
- **Webpack build** -- Uses `--webpack` flag to avoid Turbopack issues with native modules like better-sqlite3
- **SQLite protection** -- rsync excludes `data/`, `*.db`, `*.db-wal`, `*.db-shm` to preserve database files across deploys
- **PM2 delete+start** -- Ensures clean process restarts on every deploy
- **SPA routing** -- Catch-all route handler serves `index.html` for all non-API, non-static paths
