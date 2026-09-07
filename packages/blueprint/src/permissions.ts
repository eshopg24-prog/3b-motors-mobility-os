import type { PermissionDefinition } from "./types";

export const permissionRegistry: readonly PermissionDefinition[] = [
  {
    key: "blueprint.view",
    label: "View architecture blueprint",
    riskLevel: "low",
    description: "Allows viewing platform blueprint pages."
  },
  {
    key: "blueprint.manage",
    label: "Manage architecture blueprint",
    riskLevel: "high",
    description: "Allows editing architecture definitions and phase governance."
  },
  {
    key: "admin.view",
    label: "View admin console",
    riskLevel: "high",
    description: "Allows access to administrative screens."
  },
  {
    key: "security.view",
    label: "View security events",
    riskLevel: "high",
    description: "Allows reading security event records."
  },
  {
    key: "audit.view",
    label: "View audit events",
    riskLevel: "medium",
    description: "Allows reading audit event records."
  },
  {
    key: "catalog.view",
    label: "View catalog",
    riskLevel: "low",
    description: "Allows reading internal catalog records."
  },
  {
    key: "catalog.manage",
    label: "Manage catalog",
    riskLevel: "medium",
    description: "Allows creating and updating product records."
  },
  {
    key: "inventory.view",
    label: "View inventory",
    riskLevel: "medium",
    description: "Allows viewing internal inventory records."
  },
  {
    key: "inventory.command",
    label: "Execute inventory commands",
    riskLevel: "critical",
    description: "Allows controlled stock ledger operations."
  },
  {
    key: "finance.view",
    label: "View finance",
    riskLevel: "high",
    description: "Allows viewing finance records."
  },
  {
    key: "finance.command",
    label: "Execute finance commands",
    riskLevel: "critical",
    description: "Allows controlled payment, refund, reconciliation, and journal actions."
  },
  {
    key: "documents.create",
    label: "Create commercial documents",
    riskLevel: "medium",
    description: "Allows creating quotations, invoices, receipts, and commercial documents."
  },
  {
    key: "documents.export",
    label: "Export commercial documents",
    riskLevel: "high",
    description: "Allows exporting protected commercial documents."
  },
  {
    key: "procurement.manage",
    label: "Manage procurement",
    riskLevel: "high",
    description: "Allows creating supplier, RFQ, PO, receiving, and landed-cost records."
  },
  {
    key: "logistics.manage",
    label: "Manage logistics",
    riskLevel: "medium",
    description: "Allows managing shipments, carriers, delivery zones, and transfers."
  },
  {
    key: "service.manage",
    label: "Manage service and warranty",
    riskLevel: "medium",
    description: "Allows managing service jobs, warranty claims, repairs, and RMA."
  },
  {
    key: "approvals.decide",
    label: "Approve or reject requests",
    riskLevel: "critical",
    description: "Allows deciding approval requests where policy permits."
  },
  {
    key: "ai.view",
    label: "View AI governance",
    riskLevel: "medium",
    description: "Allows viewing governed AI insights, recommendations, and evaluations."
  },
  {
    key: "qa.view",
    label: "View QA readiness",
    riskLevel: "medium",
    description: "Allows viewing QA, security, and production-readiness evidence."
  }
] as const;
