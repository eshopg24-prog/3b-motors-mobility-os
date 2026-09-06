import type { WorkflowDefinition } from "./types";

export const workflowRegistry: readonly WorkflowDefinition[] = [
  {
    key: "phaseControl",
    label: "Phase Control",
    phase: 1,
    entity: "PhaseControl",
    states: [
      "notStarted",
      "planning",
      "building",
      "inspectionRequired",
      "repairRequired",
      "verificationRequired",
      "verified",
      "frozen"
    ],
    terminalStates: ["frozen"],
    requiresAudit: true
  },
  {
    key: "catalogLifecycle",
    label: "Catalog Lifecycle",
    phase: 5,
    entity: "Product",
    states: [
      "draft",
      "pendingReview",
      "changesRequested",
      "approved",
      "active",
      "hidden",
      "retired",
      "rejected"
    ],
    terminalStates: ["retired", "rejected"],
    requiresAudit: true
  },
  {
    key: "leadLifecycle",
    label: "Lead Lifecycle",
    phase: 6,
    entity: "PublicLead",
    states: [
      "submitted",
      "new",
      "reviewing",
      "contacted",
      "qualified",
      "quoted",
      "negotiating",
      "approved",
      "converted",
      "rejected",
      "closed",
      "spam"
    ],
    terminalStates: ["converted", "rejected", "closed", "spam"],
    requiresAudit: true
  },
  {
    key: "documentLifecycle",
    label: "Commercial Document Lifecycle",
    phase: 7,
    entity: "CommercialDocument",
    states: [
      "draft",
      "pendingReview",
      "approved",
      "sent",
      "accepted",
      "rejected",
      "converted",
      "paid",
      "partiallyPaid",
      "overdue",
      "voided",
      "cancelled",
      "archived"
    ],
    terminalStates: ["voided", "cancelled", "archived"],
    requiresAudit: true
  },
  {
    key: "stockLedgerCommand",
    label: "Stock Ledger Command",
    phase: 11,
    entity: "InventoryCommand",
    states: [
      "requested",
      "validated",
      "approvalRequired",
      "approved",
      "posted",
      "rejected"
    ],
    terminalStates: ["posted", "rejected"],
    requiresAudit: true
  },
  {
    key: "vehicleIdentityLifecycle",
    label: "Vehicle Identity Lifecycle",
    phase: 12,
    entity: "VehicleAsset",
    states: [
      "expected",
      "received",
      "available",
      "reserved",
      "assigned",
      "picked",
      "shipped",
      "delivered",
      "returned",
      "underInspection",
      "underRepair",
      "refurbished",
      "replaced",
      "writtenOff",
      "retired"
    ],
    terminalStates: ["writtenOff", "retired"],
    requiresAudit: true
  },
  {
    key: "purchaseOrderLifecycle",
    label: "Purchase Order Lifecycle",
    phase: 14,
    entity: "PurchaseOrder",
    states: [
      "draft",
      "submitted",
      "approvalRequired",
      "approved",
      "sent",
      "partiallyReceived",
      "received",
      "closed",
      "cancelled",
      "rejected"
    ],
    terminalStates: ["closed", "cancelled", "rejected"],
    requiresAudit: true
  },
  {
    key: "shipmentLifecycle",
    label: "Shipment Lifecycle",
    phase: 15,
    entity: "Shipment",
    states: [
      "created",
      "carrierAssigned",
      "pickedUp",
      "inTransit",
      "outForDelivery",
      "delivered",
      "exception",
      "returned",
      "cancelled"
    ],
    terminalStates: ["delivered", "returned", "cancelled"],
    requiresAudit: true
  },
  {
    key: "warrantyClaimLifecycle",
    label: "Warranty Claim Lifecycle",
    phase: 17,
    entity: "WarrantyClaim",
    states: [
      "requested",
      "eligibilityCheck",
      "approved",
      "rejected",
      "returnAuthorized",
      "itemReceived",
      "inspectionPending",
      "inspecting",
      "customerActionRequired",
      "repairEstimateSent",
      "approvedForRepair",
      "waitingParts",
      "inRepair",
      "qualityCheck",
      "replacementApproved",
      "refundApproved",
      "completed",
      "closed",
      "cancelled"
    ],
    terminalStates: ["completed", "closed", "cancelled", "rejected"],
    requiresAudit: true
  },
  {
    key: "approvalLifecycle",
    label: "Universal Approval Lifecycle",
    phase: 22,
    entity: "ApprovalRequest",
    states: [
      "draft",
      "submitted",
      "pendingApproval",
      "approved",
      "rejected",
      "expired",
      "executed",
      "cancelled"
    ],
    terminalStates: ["rejected", "expired", "executed", "cancelled"],
    requiresAudit: true
  }
] as const;
