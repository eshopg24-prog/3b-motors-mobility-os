import { PLATFORM_PHASES, PROJECT_IDENTITY } from "@3bm/config";

export function HomeStatus() {
  const activePhase = [...PLATFORM_PHASES]
    .reverse()
    .find((phase) => phase.status !== "notStarted");

  return (
    <section className="home-status-grid">
      <article className="info-panel">
        <p className="eyebrow">Canonical Organization</p>
        <h2>{PROJECT_IDENTITY.canonicalOrganizationName}</h2>
        <dl>
          <div>
            <dt>organizationId</dt>
            <dd>{PROJECT_IDENTITY.canonicalOrganizationId}</dd>
          </div>
          <div>
            <dt>Base currency</dt>
            <dd>{PROJECT_IDENTITY.baseCurrency}</dd>
          </div>
          <div>
            <dt>Primary market</dt>
            <dd>{PROJECT_IDENTITY.primaryMarket}</dd>
          </div>
        </dl>
      </article>

      <article className="info-panel">
        <p className="eyebrow">Current Build Branch Phase</p>
        <h2>{activePhase?.name ?? "No active phase"}</h2>
        <p>
          Phase 1 defines typed architecture registries and blueprint views only.
          It does not activate runtime authorization, business workflows, or production readiness.
        </p>
      </article>

      <article className="info-panel warning-panel">
        <p className="eyebrow">Locked Scope</p>
        <h2>Business modules not started</h2>
        <p>
          Public commerce, catalog CRUD, inventory mutations, finance operations,
          logistics execution, procurement execution, integrations, and AI runtime remain locked.
        </p>
      </article>
    </section>
  );
}
