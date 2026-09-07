import { cn } from "./lib/cn";
import { statusToneMap } from "./tokens";

export type BadgeTone =
  | "muted"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "gold"
  | "purple"
  | "ev";

export type BadgeProps = {
  readonly children: React.ReactNode;
  readonly tone?: BadgeTone;
  readonly className?: string;
};

export function Badge({ children, className, tone = "muted" }: BadgeProps) {
  return <span className={cn("ui-badge", `ui-badge--${tone}`, className)}>{children}</span>;
}

export function RiskBadge({ risk }: { readonly risk: "low" | "medium" | "high" | "critical" }) {
  const tone: BadgeTone =
    risk === "low"
      ? "success"
      : risk === "medium"
        ? "warning"
        : risk === "high"
          ? "gold"
          : "danger";

  return <Badge tone={tone}>{risk.toUpperCase()}</Badge>;
}

export function StatusBadge({ status }: { readonly status: string }) {
  const exactTone = (statusToneMap as Readonly<Record<string, BadgeTone>>)[status];
  if (exactTone) {
    return <Badge tone={exactTone}>{status}</Badge>;
  }

  const normalized = status.toLowerCase();
  const tone: BadgeTone =
    normalized.includes("approved") || normalized.includes("complete")
      ? "success"
      : normalized.includes("pending") || normalized.includes("review")
        ? "warning"
        : normalized.includes("reject") || normalized.includes("blocked") || normalized.includes("failed")
          ? "danger"
          : normalized.includes("active")
            ? "ev"
            : "muted";

  return <Badge tone={tone}>{status}</Badge>;
}
