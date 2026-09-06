import { Badge } from "./badge";
import { cn } from "./lib/cn";

export type MetricCardProps = {
  readonly label: string;
  readonly value: string | number;
  readonly helper?: string;
  readonly trend?: string;
  readonly tone?: "default" | "success" | "warning" | "danger";
};

export function MetricCard({ helper, label, tone = "default", trend, value }: MetricCardProps) {
  return (
    <article className={cn("ui-card metric-card", `metric-card--${tone}`)}>
      <span className="metric-card__label">{label}</span>
      <strong className="metric-card__value">{value}</strong>
      <div className="metric-card__footer">
        <span>{helper ?? "No note"}</span>
        {trend ? <Badge tone={tone === "default" ? "info" : tone}>{trend}</Badge> : null}
      </div>
    </article>
  );
}

export type ChartCardProps = {
  readonly title: string;
  readonly subtitle?: string;
  readonly children: React.ReactNode;
};

export function ChartCard({ children, subtitle, title }: ChartCardProps) {
  return (
    <article className="ui-card chart-card">
      <header>
        <h3>{title}</h3>
        {subtitle ? <p>{subtitle}</p> : null}
      </header>
      <div>{children}</div>
    </article>
  );
}

export type VehicleCardProps = {
  readonly title: string;
  readonly category: string;
  readonly status: string;
  readonly ctaLabel: string;
  readonly ctaHref?: string;
};

export function VehicleCard({ category, ctaHref, ctaLabel, status, title }: VehicleCardProps) {
  return (
    <article className="ui-card vehicle-card">
      <div className="vehicle-card__visual" aria-hidden="true" />
      <div>
        <Badge tone="ev">{category}</Badge>
        <h3>{title}</h3>
        <p>{status}</p>
      </div>
      {ctaHref ? (
        <a className="vehicle-card__action" href={ctaHref}>
          {ctaLabel}
        </a>
      ) : (
        <button className="vehicle-card__action" disabled title="Unavailable in the current phase" type="button">
          {ctaLabel}
        </button>
      )}
    </article>
  );
}

export type ReportCardProps = {
  readonly title: string;
  readonly description: string;
  readonly status: string;
};

export function ReportCard({ description, status, title }: ReportCardProps) {
  return (
    <article className="ui-card report-card">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <Badge tone="info">{status}</Badge>
    </article>
  );
}
