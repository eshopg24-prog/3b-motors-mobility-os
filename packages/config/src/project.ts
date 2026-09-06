export const ORGANIZATION_ID = "org_3b_motors_et" as const;

export const PROJECT_IDENTITY = {
  projectName: "3B Motors Mobility Operating System",
  shortName: "3B Motors MOS",
  companyName: "3B Motors Ethiopia",
  publicDomain: "https://3bmotor.com/",
  canonicalOrganizationId: ORGANIZATION_ID,
  canonicalOrganizationName: "3B Motors Ethiopia",
  baseCurrency: "ETB",
  primaryMarket: "Ethiopia",
  tagline: "Powering Mobility in Africa",
  platformStatement:
    "Vehicles. Parts. Service. Financing. Fulfillment. Intelligence. One mobility platform.",
  productionStatus: "notReady"
} as const;

export type ProductionStatus =
  | "notReady"
  | "inspectionRequired"
  | "verificationRequired"
  | "phaseVerified"
  | "productionReady";

export type PhaseStatus =
  | "notStarted"
  | "planning"
  | "building"
  | "inspectionRequired"
  | "repairRequired"
  | "verificationRequired"
  | "verified"
  | "frozen";

export type PlatformPhase = {
  readonly number: number;
  readonly name: string;
  readonly status: PhaseStatus;
  readonly productionBlocking: boolean;
};

export const PLATFORM_PHASES: readonly PlatformPhase[] = [
  { number: 0, name: "Starter App and Project Identity", status: "inspectionRequired", productionBlocking: true },
  { number: 1, name: "Architecture Blueprint", status: "inspectionRequired", productionBlocking: true },
  { number: 2, name: "Design System and App Shell", status: "building", productionBlocking: true },
  { number: 3, name: "Identity, RBAC, RLS, FLS, Audit, Security", status: "notStarted", productionBlocking: true },
  { number: 4, name: "Public Website and Homepage", status: "notStarted", productionBlocking: true },
  { number: 5, name: "Vehicle and Product Catalog", status: "notStarted", productionBlocking: true },
  { number: 6, name: "Leads, Quotes, Dealer Intake, Fleet Intake", status: "notStarted", productionBlocking: true },
  { number: 7, name: "Commercial Documents and Manual Invoices", status: "notStarted", productionBlocking: true },
  { number: 8, name: "Customer Portal", status: "notStarted", productionBlocking: true },
  { number: 9, name: "Dealer Portal", status: "notStarted", productionBlocking: true },
  { number: 10, name: "Fleet Portal", status: "notStarted", productionBlocking: true },
  { number: 11, name: "Inventory OS and Stock Ledger", status: "notStarted", productionBlocking: true },
  { number: 12, name: "Vehicle Identity and Serial Control", status: "notStarted", productionBlocking: true },
  { number: 13, name: "Bulk Import Engine", status: "notStarted", productionBlocking: true },
  { number: 14, name: "Procurement and Suppliers", status: "notStarted", productionBlocking: true },
  { number: 15, name: "Fulfillment and Logistics", status: "notStarted", productionBlocking: true },
  { number: 16, name: "Orders, Checkout Readiness, Reservations", status: "notStarted", productionBlocking: true },
  { number: 17, name: "Service, Warranty, Returns, Repairs", status: "notStarted", productionBlocking: true },
  { number: 18, name: "Finance and Accounting", status: "notStarted", productionBlocking: true },
  { number: 19, name: "Operations Command Center", status: "notStarted", productionBlocking: true },
  { number: 20, name: "Support and Communications", status: "notStarted", productionBlocking: true },
  { number: 21, name: "Integration Hub", status: "notStarted", productionBlocking: true },
  { number: 22, name: "Universal Approval Engine", status: "notStarted", productionBlocking: true },
  { number: 23, name: "Governed AI Operations", status: "notStarted", productionBlocking: true },
  { number: 24, name: "Intelligence and Reporting", status: "notStarted", productionBlocking: true },
  { number: 25, name: "QA, Security, Production Readiness", status: "notStarted", productionBlocking: true },
  { number: 26, name: "Final Polish and Handoff", status: "notStarted", productionBlocking: true }
] as const;

export function getCurrentProductionStatus(): ProductionStatus {
  return PROJECT_IDENTITY.productionStatus;
}

export function assertProductionNotReady(): boolean {
  return PROJECT_IDENTITY.productionStatus === "notReady";
}
