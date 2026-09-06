# Phase 1 — Architecture Blueprint

## Objective
Create the source-of-truth architecture layer for 3B Motors MOS before business modules are implemented.

## Completed scope
- blueprint route map
- entity registry
- relationship registry
- permission registry
- workflow registry
- integration registry
- audit event registry
- security event registry
- production-readiness registry
- public/private field boundary
- blueprint pages
- cross-registry integrity tests

## Architecture corrections applied
The supplied Phase 1 draft was strengthened before implementation:
- `/status` and `/blueprint` are registered because they are real routes.
- the internal catalog dashboard uses a dedicated `catalog` workspace instead of `publicWebsite`.
- `PhaseControl` and `PublicLead` are registered because workflows reference them.
- inventory mutation lifecycle is modeled on `InventoryCommand`, not on immutable `StockLedger` records.
- `fullGpsSerial` is included in the public forbidden-field boundary.
- tests verify that protected-route permissions resolve, relationship endpoints exist, and workflow entities resolve.

## Routes
- /blueprint
- /blueprint/platform
- /blueprint/routes
- /blueprint/entities
- /blueprint/relationships
- /blueprint/rbac
- /blueprint/security
- /blueprint/workflows
- /blueprint/integrations
- /blueprint/ai-governance
- /blueprint/production-readiness

## Explicitly out of scope
- public website content
- product catalog CRUD
- ecommerce
- customer portal
- dealer portal
- fleet portal
- inventory mutations
- finance operations
- logistics workflows
- procurement workflows
- live integrations
- AI runtime
- production launch

## Security boundary
Blueprint access levels and required permissions are declarative only in Phase 1. Runtime route guards, RBAC enforcement, RLS, FLS, AuditEvent persistence, and SecurityEvent persistence are not implemented by this phase and must not be claimed as active security controls.

## Acceptance criteria
- all blueprint routes compile and render through the Next.js application
- registries are typed
- route paths are unique
- entity names are unique
- permission keys are unique
- protected routes declare registered permissions
- relationship endpoints reference registered entities
- workflow entities reference registered entities
- StockLedger remains append-only in the architecture model
- public forbidden fields include protected vehicle identifiers
- production status remains NOT READY

## Phase dependency warning
This implementation is prepared as a stacked branch above Phase 0. It must not be merged or frozen as an accepted Phase 1 until Phase 0 has completed inspection, verification, approval, and freeze.
