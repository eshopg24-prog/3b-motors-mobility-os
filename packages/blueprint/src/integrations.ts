import type { IntegrationDefinition } from "./types";

export const integrationRegistry: readonly IntegrationDefinition[] = [
  {
    key: "payments",
    label: "Payment Provider",
    category: "payments",
    preferredPath: "backendFunction",
    phase: 21,
    liveAllowedWithoutEvidence: false
  },
  {
    key: "sms",
    label: "SMS Provider",
    category: "communications",
    preferredPath: "backendFunction",
    phase: 21,
    liveAllowedWithoutEvidence: false
  },
  {
    key: "whatsapp",
    label: "WhatsApp Business",
    category: "communications",
    preferredPath: "backendFunction",
    phase: 21,
    liveAllowedWithoutEvidence: false
  },
  {
    key: "carrierTracking",
    label: "Carrier Tracking",
    category: "logistics",
    preferredPath: "backendFunction",
    phase: 21,
    liveAllowedWithoutEvidence: false
  },
  {
    key: "supplierCatalog",
    label: "Supplier Catalog Feed",
    category: "supplier",
    preferredPath: "customOpenAPI",
    phase: 21,
    liveAllowedWithoutEvidence: false
  },
  {
    key: "aiAssistant",
    label: "Governed AI Assistant",
    category: "ai",
    preferredPath: "builtInIntegration",
    phase: 23,
    liveAllowedWithoutEvidence: false
  }
] as const;
