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
1. Run `npm run build`.
2. Include `dist/`, `server.js`, `package.json`, and `package-lock.json` in deployment package.
3. Upload ZIP to hosting environment and run `npm install --production`.
4. Set environment variables from `.env.example`.
5. Start app with `npm run start`.
