# 3b-motors-mobility-os

Production-grade mobility commerce and operations platform for 3B Motors Ethiopia.

## Stack
- React + TypeScript + Tailwind CSS (Vite SPA)
- React Router for multi-workspace routing
- Express server (`server.js`) for production static hosting and SPA fallback

## Install
```bash
npm install
```

## Development
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Start Production Server
```bash
npm run start
```

## GoDaddy ZIP Deployment
This project expects a Node.js hosting plan that supports long-running Express processes.

1. Run `npm run build` locally.
2. Create a ZIP containing: `dist/`, `server.js`, `package.json`, `package-lock.json`, and `.env.example` (do not include `node_modules`).
3. Upload and extract the ZIP on the server.
4. Run `npm install --omit=dev` on the server to install runtime dependencies after extraction (required before first start).
5. Configure environment variables using `.env.example`.
6. Start the app with `npm run start`.
