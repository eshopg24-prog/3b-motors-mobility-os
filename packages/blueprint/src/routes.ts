import type { RouteDefinition } from "./types";

export const routeRegistry: readonly RouteDefinition[] = [
  {
    path: "/status",
    label: "Build Status",
    workspace: "publicWebsite",
    accessLevel: "public",
    requiredPermission: null,
    phase: 0,
    publicSafe: true
  },
  {
    path: "/blueprint",
    label: "Architecture Blueprint",
    workspace: "blueprint",
    accessLevel: "protected",
    requiredPermission: "blueprint.view",
    phase: 1,
    publicSafe: false
  },
  {
    path: "/blueprint/platform",
    label: "Platform Overview",
    workspace: "blueprint",
    accessLevel: "protected",
    requiredPermission: "blueprint.view",
    phase: 1,
    publicSafe: false
  },
  {
    path: "/blueprint/routes",
    label: "Route Map",
    workspace: "blueprint",
    accessLevel: "protected",
    requiredPermission: "blueprint.view",
    phase: 1,
    publicSafe: false
  },
  {
    path: "/blueprint/entities",
    label: "Entity Registry",
    workspace: "blueprint",
    accessLevel: "protected",
    requiredPermission: "blueprint.view",
    phase: 1,
    publicSafe: false
  },
  {
    path: "/blueprint/relationships",
    label: "Relationship Map",
    workspace: "blueprint",
    accessLevel: "protected",
    requiredPermission: "blueprint.view",
    phase: 1,
    publicSafe: false
  },
  {
    path: "/blueprint/rbac",
    label: "RBAC Matrix",
    workspace: "blueprint",
    accessLevel: "protected",
    requiredPermission: "blueprint.view",
    phase: 1,
    publicSafe: false
  },
  {
    path: "/blueprint/security",
    label: "Security Blueprint",
    workspace: "blueprint",
    accessLevel: "protected",
    requiredPermission: "security.view",
    phase: 1,
    publicSafe: false
  },
  {
    path: "/blueprint/workflows",
    label: "Workflow Registry",
    workspace: "blueprint",
    accessLevel: "protected",
    requiredPermission: "blueprint.view",
    phase: 1,
    publicSafe: false
  },
  {
    path: "/blueprint/integrations",
    label: "Integration Blueprint",
    workspace: "blueprint",
    accessLevel: "protected",
    requiredPermission: "blueprint.view",
    phase: 1,
    publicSafe: false
  },
  {
    path: "/blueprint/ai-governance",
    label: "AI Governance Blueprint",
    workspace: "blueprint",
    accessLevel: "protected",
    requiredPermission: "ai.view",
    phase: 1,
    publicSafe: false
  },
  {
    path: "/blueprint/production-readiness",
    label: "Production Readiness",
    workspace: "blueprint",
    accessLevel: "protected",
    requiredPermission: "qa.view",
    phase: 1,
    publicSafe: false
  },
  {
    path: "/design-system",
    label: "Design System and App Shell",
    workspace: "blueprint",
    accessLevel: "protected",
    requiredPermission: "blueprint.view",
    phase: 2,
    publicSafe: false
  },
  {
    path: "/",
    label: "Public Homepage",
    workspace: "publicWebsite",
    accessLevel: "public",
    requiredPermission: null,
    phase: 4,
    publicSafe: true
  },
  {
    path: "/vehicles",
    label: "Vehicles",
    workspace: "publicWebsite",
    accessLevel: "public",
    requiredPermission: null,
    phase: 4,
    publicSafe: true
  },
  {
    path: "/internal/catalog/dashboard",
    label: "Catalog Dashboard",
    workspace: "catalog",
    accessLevel: "protected",
    requiredPermission: "catalog.view",
    phase: 5,
    publicSafe: false
  },
  {
    path: "/inventory-os/dashboard",
    label: "Inventory Dashboard",
    workspace: "inventoryOs",
    accessLevel: "protected",
    requiredPermission: "inventory.view",
    phase: 11,
    publicSafe: false
  },
  {
    path: "/finance/dashboard",
    label: "Finance Dashboard",
    workspace: "finance",
    accessLevel: "protected",
    requiredPermission: "finance.view",
    phase: 18,
    publicSafe: false
  },
  {
    path: "/operations/dashboard",
    label: "Operations Command Center",
    workspace: "operations",
    accessLevel: "protected",
    requiredPermission: "admin.view",
    phase: 19,
    publicSafe: false
  }
] as const;
