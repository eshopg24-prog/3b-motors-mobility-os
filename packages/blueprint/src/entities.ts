import type { EntityDefinition } from "./types";

export const entityRegistry: readonly EntityDefinition[] = [
  {
    name: "PhaseControl",
    family: "governance",
    phase: 1,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Governed phase lifecycle record used for plan, build, inspection, verification, approval, and freeze status.",
    baseFieldsRequired: true
  },
  {
    name: "Organization",
    family: "identity",
    phase: 3,
    organizationScoped: false,
    appendOnly: false,
    publicReadable: false,
    description: "Canonical organization record for 3B Motors Ethiopia.",
    baseFieldsRequired: true
  },
  {
    name: "UserProfile",
    family: "identity",
    phase: 3,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Application-specific user profile, role, status, and organization link.",
    baseFieldsRequired: true
  },
  {
    name: "Permission",
    family: "security",
    phase: 3,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Atomic permission definition.",
    baseFieldsRequired: true
  },
  {
    name: "RolePermission",
    family: "security",
    phase: 3,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Mapping between canonical role and permission.",
    baseFieldsRequired: true
  },
  {
    name: "AuditEvent",
    family: "security",
    phase: 3,
    organizationScoped: true,
    appendOnly: true,
    publicReadable: false,
    description: "Append-only business audit ledger.",
    baseFieldsRequired: true
  },
  {
    name: "SecurityEvent",
    family: "security",
    phase: 3,
    organizationScoped: true,
    appendOnly: true,
    publicReadable: false,
    description: "Append-only security event ledger.",
    baseFieldsRequired: true
  },
  {
    name: "Product",
    family: "catalog",
    phase: 5,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Canonical vehicle, spare part, service package, or quote-only product.",
    baseFieldsRequired: true
  },
  {
    name: "ProductVariant",
    family: "catalog",
    phase: 5,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Sellable or quotable variant attached to a product.",
    baseFieldsRequired: true
  },
  {
    name: "PublicProductProjection",
    family: "catalog",
    phase: 5,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: true,
    description: "Public-safe product projection excluding cost, margin, supplier, warehouse, and private fields.",
    baseFieldsRequired: true
  },
  {
    name: "PublicLead",
    family: "leads",
    phase: 6,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Canonical lead record for quote, dealer, fleet, financing, service, and contact intake.",
    baseFieldsRequired: true
  },
  {
    name: "CommercialDocument",
    family: "documents",
    phase: 7,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Unified commercial document header for invoices, quotations, delivery notes, and reports.",
    baseFieldsRequired: true
  },
  {
    name: "CommercialDocumentLineItem",
    family: "documents",
    phase: 7,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Line items for commercial documents.",
    baseFieldsRequired: true
  },
  {
    name: "StockLedger",
    family: "inventory",
    phase: 11,
    organizationScoped: true,
    appendOnly: true,
    publicReadable: false,
    description: "Immutable inventory ledger event.",
    baseFieldsRequired: true
  },
  {
    name: "InventoryCommand",
    family: "inventory",
    phase: 11,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Controlled inventory mutation request that may post one or more immutable StockLedger events.",
    baseFieldsRequired: true
  },
  {
    name: "InventoryProjection",
    family: "inventory",
    phase: 11,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Derived inventory balance projection from ledger events and reservations.",
    baseFieldsRequired: true
  },
  {
    name: "VehicleAsset",
    family: "vehicleIdentity",
    phase: 12,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Canonical physical vehicle identity record.",
    baseFieldsRequired: true
  },
  {
    name: "PurchaseOrder",
    family: "procurement",
    phase: 14,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Supplier purchase order with approval, receiving, and landed-cost linkage.",
    baseFieldsRequired: true
  },
  {
    name: "Shipment",
    family: "logistics",
    phase: 15,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Shipment record linked to fulfillment, carrier, and tracking events.",
    baseFieldsRequired: true
  },
  {
    name: "WarrantyClaim",
    family: "serviceWarranty",
    phase: 17,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Warranty claim with eligibility, inspection, decision, and resolution workflow.",
    baseFieldsRequired: true
  },
  {
    name: "AccountingInvoice",
    family: "finance",
    phase: 18,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Finance invoice record connected to receivables, payment allocation, and journal logic.",
    baseFieldsRequired: true
  },
  {
    name: "ApprovalRequest",
    family: "approvals",
    phase: 22,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Reusable approval request for sensitive actions.",
    baseFieldsRequired: true
  },
  {
    name: "AIRecommendation",
    family: "ai",
    phase: 23,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Source-backed AI recommendation with confidence score and approval gating.",
    baseFieldsRequired: true
  },
  {
    name: "ProductionReadinessCheck",
    family: "qa",
    phase: 25,
    organizationScoped: true,
    appendOnly: false,
    publicReadable: false,
    description: "Launch-readiness check with evidence and blocker severity.",
    baseFieldsRequired: true
  }
] as const;
