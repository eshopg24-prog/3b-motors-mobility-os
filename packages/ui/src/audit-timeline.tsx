import { Badge } from "./badge";

export type AuditTimelineItem = {
  readonly id: string;
  readonly action: string;
  readonly actor: string;
  readonly timestamp: string;
  readonly risk: "low" | "medium" | "high" | "critical";
};

export function AuditTimeline({
  description = "Business actions and evidence trail.",
  items,
  title = "Audit Timeline"
}: {
  readonly items: readonly AuditTimelineItem[];
  readonly title?: string;
  readonly description?: string;
}) {
  return (
    <section className="audit-timeline">
      <header>
        <h3>{title}</h3>
        <p>{description}</p>
      </header>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <div>
              <strong>{item.action}</strong>
              <span>{item.actor}</span>
            </div>
            <time>{item.timestamp}</time>
            <Badge
              tone={
                item.risk === "critical"
                  ? "danger"
                  : item.risk === "high"
                    ? "gold"
                    : item.risk === "medium"
                      ? "warning"
                      : "success"
              }
            >
              {item.risk}
            </Badge>
          </li>
        ))}
      </ol>
    </section>
  );
}
