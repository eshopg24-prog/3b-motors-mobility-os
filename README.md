# 3B Motors Mobility Operating System

Enterprise mobility commerce and operations platform for 3B Motors Ethiopia.

**Current authoritative status: NOT READY.**

This repository is intentionally being rebuilt phase by phase. Phase 0 contains only the starter application, canonical project identity, engineering guardrails, phase registry, and production-status surface. Business modules remain locked.

## Canonical identity

- Company: 3B Motors Ethiopia
- Domain: https://3bmotor.com/
- organizationId: `org_3b_motors_et`
- Base currency: ETB
- Primary market: Ethiopia

## Stack

- pnpm workspace monorepo
- Next.js App Router
- React + TypeScript
- Vitest
- ESLint flat config

## Workspace

```text
apps/web       Next.js starter application
packages/config canonical project identity and phase registry
packages/ui     shared Phase 0 UI primitives
docs            engineering rules and phase evidence
```

## Commands

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm dev
```

## Phase discipline

Every phase follows:

Plan → Build → Inspect → Repair → Verify → Approve → Freeze

Do not start a dependent phase until its prerequisites are verified and frozen.

See `AGENTS.md` before modifying the repository.
