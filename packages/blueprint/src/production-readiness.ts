import type { ReadinessCheckDefinition } from "./types";

export const productionReadinessRegistry: readonly ReadinessCheckDefinition[] = [
  {
    key: "phase-control-complete",
    phase: 1,
    category: "governance",
    title: "Phase control process exists",
    severity: "critical",
    requiredForLaunch: true
  },
  {
    key: "route-registry-complete",
    phase: 1,
    category: "architecture",
    title: "Route registry exists and has unique paths",
    severity: "critical",
    requiredForLaunch: true
  },
  {
    key: "entity-registry-complete",
    phase: 1,
    category: "architecture",
    title: "Entity registry exists and declares ownership/public access",
    severity: "critical",
    requiredForLaunch: true
  },
  {
    key: "rbac-blueprint-complete",
    phase: 1,
    category: "security",
    title: "RBAC blueprint exists",
    severity: "critical",
    requiredForLaunch: true
  },
  {
    key: "audit-security-ledger-blueprint",
    phase: 1,
    category: "audit",
    title: "Audit and security event ledgers are defined",
    severity: "critical",
    requiredForLaunch: true
  },
  {
    key: "public-data-boundary-defined",
    phase: 1,
    category: "privacy",
    title: "Public/private field boundary is defined",
    severity: "critical",
    requiredForLaunch: true
  },
  {
    key: "integration-live-rules-defined",
    phase: 1,
    category: "integrations",
    title: "Integration live status requires evidence",
    severity: "high",
    requiredForLaunch: true
  },
  {
    key: "production-status-honest",
    phase: 1,
    category: "release",
    title: "Production status remains NOT READY",
    severity: "critical",
    requiredForLaunch: true
  }
] as const;
