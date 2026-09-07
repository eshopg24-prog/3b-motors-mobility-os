export const threeBDesignTokens = {
  colors: {
    deepBlack: "#05090F",
    graphite: "#0B1320",
    carbonPanel: "#101B2A",
    steelBorder: "#1D2B3A",
    white: "#F8FAFC",
    softWhite: "#E5E7EB",
    mutedText: "#9CA3AF",
    subtleText: "#64748B",
    threeBRed: "#E31B23",
    darkRed: "#A91018",
    electricBlue: "#1D8FFF",
    trustBlue: "#2563EB",
    successGreen: "#22C55E",
    warningAmber: "#F59E0B",
    dangerRed: "#EF4444",
    premiumGold: "#D4AF37",
    logisticsPurple: "#7C3AED",
    evGreen: "#14B8A6",
    serviceSky: "#38BDF8",
    procurementOrange: "#F97316",
    integrationIndigo: "#6366F1"
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "22px",
    full: "999px"
  },
  typography: {
    bodyFont:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    monoFont:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, monospace"
  },
  workspaceAccent: {
    publicWebsite: "#E31B23",
    customerPortal: "#1D8FFF",
    dealerPortal: "#D4AF37",
    fleetPortal: "#7C3AED",
    inventoryOs: "#14B8A6",
    service: "#38BDF8",
    warranty: "#22C55E",
    procurement: "#F97316",
    finance: "#D4AF37",
    logistics: "#7C3AED",
    integrations: "#6366F1",
    aiGovernance: "#1D8FFF",
    admin: "#EF4444",
    qa: "#22C55E",
    blueprint: "#E31B23"
  }
} as const;

export type WorkspaceAccentKey = keyof typeof threeBDesignTokens.workspaceAccent;

export const statusToneMap = {
  draft: "muted",
  submitted: "info",
  pending: "warning",
  pendingReview: "warning",
  reviewing: "info",
  approved: "success",
  active: "ev",
  completed: "success",
  paid: "success",
  partiallyPaid: "warning",
  overdue: "danger",
  rejected: "danger",
  cancelled: "muted",
  blocked: "danger",
  voided: "muted",
  archived: "muted",
  retired: "muted",
  quoteOnly: "info"
} as const;

export type StatusKey = keyof typeof statusToneMap;
export type StatusTone = (typeof statusToneMap)[StatusKey];
