import type { RelationshipDefinition } from "./types";

export const relationshipRegistry: readonly RelationshipDefinition[] = [
  {
    fromEntity: "UserProfile",
    toEntity: "Organization",
    relationship: "manyToOne",
    required: true,
    description: "Every protected user profile belongs to one organization."
  },
  {
    fromEntity: "RolePermission",
    toEntity: "Permission",
    relationship: "manyToOne",
    required: true,
    description: "Role permissions reference canonical permission definitions."
  },
  {
    fromEntity: "ProductVariant",
    toEntity: "Product",
    relationship: "manyToOne",
    required: true,
    description: "A product can have many variants."
  },
  {
    fromEntity: "PublicProductProjection",
    toEntity: "Product",
    relationship: "oneToOne",
    required: true,
    description: "Public product projection is derived from approved product data."
  },
  {
    fromEntity: "CommercialDocumentLineItem",
    toEntity: "CommercialDocument",
    relationship: "manyToOne",
    required: true,
    description: "Each commercial document has one or more line items."
  },
  {
    fromEntity: "StockLedger",
    toEntity: "ProductVariant",
    relationship: "manyToOne",
    required: false,
    description: "Stock ledger entries may reference variants where applicable."
  },
  {
    fromEntity: "InventoryCommand",
    toEntity: "StockLedger",
    relationship: "oneToMany",
    required: false,
    description: "A validated inventory command may post immutable stock ledger events."
  },
  {
    fromEntity: "VehicleAsset",
    toEntity: "ProductVariant",
    relationship: "manyToOne",
    required: true,
    description: "Vehicle assets must be tied to a product variant."
  },
  {
    fromEntity: "Shipment",
    toEntity: "CommercialDocument",
    relationship: "oneToMany",
    required: false,
    description: "Shipments may generate delivery notes, packing lists, and waybills."
  },
  {
    fromEntity: "WarrantyClaim",
    toEntity: "VehicleAsset",
    relationship: "manyToOne",
    required: true,
    description: "Warranty claims must be linked to the affected vehicle or serial asset."
  },
  {
    fromEntity: "ApprovalRequest",
    toEntity: "AuditEvent",
    relationship: "oneToMany",
    required: true,
    description: "Approval decisions must produce audit evidence."
  }
] as const;
