# 3B Motors Mobility Operating System — Engineering Contract

## Project

3B Motors Mobility Operating System is the enterprise mobility commerce and operations platform for 3B Motors Ethiopia.

Platform statement:

Vehicles. Parts. Service. Financing. Fulfillment. Intelligence. One mobility platform.

## Canonical identity

- Company: 3B Motors Ethiopia
- Domain: https://3bmotor.com/
- Canonical organizationId: org_3b_motors_et
- Base currency: ETB
- Primary market: Ethiopia
- Production status: NOT READY until verified readiness is at least 90/100 with no critical blockers.

## Engineering rules

Build one phase at a time.
Do not build future phases early.
Do not create fake integrations, fake checkout, fake stock, fake payment success, fake delivery tracking, or fake production readiness.
Every visible action must work, navigate, open a modal or drawer, submit a validated form, update an authorized record, execute a controlled backend command, or show a clear unavailable state.

## Data rules

Every protected business record must include:

- id
- organizationId
- status
- createdBy
- updatedBy
- createdAt
- updatedAt
- auditVersion

Use camelCase only.
Use Base44 or database record IDs for relationships. Do not use names, emails, SKUs, VINs, chassis numbers, invoice numbers, order numbers, warehouse codes, dealer codes, or supplier codes as foreign keys.

## Security rules

Navigation visibility is not authorization.
Protected routes must enforce active user, role, permission, organizationId, and ownership.
Public users must never receive private operational fields such as internalCost, supplierCost, landedCost, margin, warehouseId, exactInternalStock, privateNotes, audit metadata, security metadata, payment tokens, integration credentials, full VIN, full chassis number, full engine serial, full battery serial, or full controller serial.
Denied access must create SecurityEvent when evidence is required.
Protected mutations must create AuditEvent.
AuditEvent and SecurityEvent are append-only.

## Inventory rules

Inventory is ledger-based.
Stock must never be directly edited.
Every stock change must create an immutable StockLedger event.
Reversals use compensating ledger entries.
Available stock is derived from on-hand stock minus active reservations.
Negative available stock is blocked unless an approved exception policy exists.

## Vehicle identity rules

Every serialized vehicle or high-value part must have one canonical VehicleAsset or SerialAsset.
VIN, chassis number, engine serial, battery serial, controller serial, and GPS serial must be unique where applicable.
Identifier corrections require permission, reason, approval where required, and audit evidence.

## Phase process

Every phase follows:

Plan → Build → Inspect → Repair → Verify → Approve → Freeze

No dependent phase starts until prerequisites are verified.

## Pull request requirements

Every PR must include:

- phase name
- scope implemented
- files changed
- security impact
- data impact
- tests run
- known gaps
- rollback notes
- production risks

## Base44 dev environment

- Run with: `docker compose -f docker-compose.base44.yml up -d`
- Preview is at port 3000. Health check: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/`
- Stack: pnpm 9.12.0 workspace monorepo, Next.js 15 + Turbopack (apps/web), no backend or database in Phase 0.
- No lockfile was committed originally; `pnpm install --no-frozen-lockfile` generates one on first boot. A `pnpm-lock.yaml` is produced inside the container.
- Next.js auto-modifies `apps/web/tsconfig.json` on first dev run (adds `incremental` and `esModuleInterop`) and regenerates `apps/web/next-env.d.ts`. These are standard Next.js behaviors, not manual edits.
- The root `dev` script (`pnpm --filter @3bm/web dev`) does not accept extra CLI flags cleanly — the `--` separator gets passed through as a literal arg to `next dev`. To pass hostname/port, run `pnpm --filter @3bm/web exec next dev --turbo --hostname 0.0.0.0 --port 3000` instead.
- `allowedDevOrigins` in `apps/web/next.config.mjs` is set from `BASE44_PUBLIC_HOST_SUFFIX` so the preview origin can access dev assets and HMR.
- No secrets required for Phase 0.
