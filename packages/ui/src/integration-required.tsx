import { Badge } from "./badge";

export function IntegrationRequired({
  integrationName,
  reason
}: {
  readonly integrationName: string;
  readonly reason: string;
}) {
  return (
    <section className="integration-required">
      <Badge tone="warning">Integration Required</Badge>
      <h3>{integrationName}</h3>
      <p>{reason}</p>
      <p className="integration-required__note">
        This action is unavailable until the integration is configured, tested, approved, and verified.
      </p>
    </section>
  );
}
