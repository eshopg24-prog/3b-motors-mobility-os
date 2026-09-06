# Phase 2 — Design System and App Shell

## Objective
Create the reusable visual system, layout shell, navigation system, dashboard patterns, interaction states, and base UI components for 3B Motors MOS without implementing business modules.

## Implemented scope
- canonical design tokens
- module color system
- reusable buttons and badges
- metric, chart, vehicle, and report cards
- workspace layout and public layout primitives
- sidebar and top bar
- global search shell with explicit unavailable behavior unless a callback is provided
- searchable, filterable, sortable, keyboard-operable, paginated data table
- modal and confirmation modal
- detail drawer
- form field
- loading, empty, error, access-denied, and integration-required states
- audit-timeline presentation component
- `/design-system` component showcase
- responsive desktop/tablet/mobile rules
- reduced-motion handling

## Safety corrections made during implementation
The initial Phase 2 draft contained active controls that had no behavior and links to routes that do not exist yet. Those were not accepted into the implementation.

The implementation instead:
- renders locked navigation as non-link elements
- renders unavailable quote/product actions as disabled states
- makes every enabled showcase button execute a local reversible interaction
- marks sample audit rows as presentation-only, not persisted AuditEvent evidence
- keeps global cross-entity search unavailable unless an actual search callback is supplied
- prevents the showcase from passing Server Component render functions into the client DataTable boundary
- maps `partiallyPaid` to warning rather than incorrectly treating it as paid success
- keeps Stock/RBAC/business command behavior out of this phase

## Route
- `/design-system`

The architecture route registry declares this route as protected with `blueprint.view`. Runtime route enforcement is not implemented until Phase 3, so this declaration must not be confused with actual authorization.

## Explicitly out of scope
- public website implementation
- product catalog workflow
- ecommerce
- inventory commands
- finance commands
- customer portal data
- dealer portal data
- fleet portal data
- service workflows
- procurement workflows
- live integrations
- AI runtime
- QA engine
- runtime RBAC/RLS/FLS
- persisted AuditEvent/SecurityEvent behavior

## Acceptance criteria
- reusable components compile
- design-system page builds
- active showcase controls have local behavior
- unavailable actions are visibly disabled/locked rather than dead
- table primitive supports search, filters, sorting, pagination, and keyboard row activation
- modal and drawer support Escape close and initial focus handling
- mobile layout rules avoid shell-level horizontal overflow; wide tables use contained horizontal scrolling
- protected workspace shell exists
- public shell exists
- no business modules are implemented
- production status remains NOT READY

## Build evidence
GitHub Actions run `34062778040` passed on implementation commit `3f6f9a7a38fd30663dcb8f8627bb51a6c6ebc46f`:
- dependency installation — PASS
- lint — PASS
- typecheck — PASS
- tests — PASS
- Next.js production build — PASS

Build success proves executable consistency only. It is not inspection, independent verification, approval, freeze, or production-readiness evidence.

## Current phase state
`inspectionRequired`

Phase 0 and Phase 1 are also still `inspectionRequired`; Phase 2 must not be merged as though its prerequisites were frozen.
