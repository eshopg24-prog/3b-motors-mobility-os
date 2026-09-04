# CLAUDE.md

## Project
3B Motors Enterprise Mobility Platform is a Vite + React + TypeScript SPA with Tailwind dark theme styling and Express production hosting.

## Local Development
- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Start production server: `npm run start`

## Workspace Model
- Public marketing routes: `/`, `/vehicles`, `/parts`, `/electric-mobility`, `/services`, `/dealers`, `/about`, `/contact`
- Customer routes: `/customer/*` (role: customer)
- Inventory routes: `/inventory-os/*` and `/admin/bulk-upload` (roles: inventory_manager/admin)
