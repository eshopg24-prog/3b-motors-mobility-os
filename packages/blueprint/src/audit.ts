export const auditEventRegistry = [
  "phase.planned",
  "phase.built",
  "phase.inspected",
  "phase.repaired",
  "phase.verified",
  "phase.frozen",
  "catalog.product.created",
  "catalog.product.approved",
  "catalog.product.published",
  "document.created",
  "document.approved",
  "document.exported",
  "inventory.ledger.posted",
  "inventory.adjustment.requested",
  "inventory.transfer.posted",
  "vehicle.identifier.corrected",
  "purchaseOrder.approved",
  "shipment.created",
  "warranty.claim.approved",
  "finance.payment.approved",
  "approval.request.created",
  "approval.request.decided",
  "ai.actionDraft.created"
] as const;

export type AuditEventKey = (typeof auditEventRegistry)[number];
