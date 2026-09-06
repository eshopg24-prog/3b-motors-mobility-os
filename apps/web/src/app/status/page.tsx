import { PLATFORM_PHASES, PROJECT_IDENTITY } from "@3bm/config";
import { ProductionStatusBanner, ThreeBMotorsLogo } from "@3bm/ui";

export default function StatusPage() {
  return (
    <main className="page-shell">
      <nav className="top-nav" aria-label="Main navigation">
        <ThreeBMotorsLogo />
        <a className="nav-link" href="/">
          Home
        </a>
      </nav>
      <section className="status-page-header">
        <p className="eyebrow">Build Governance</p>
        <h1>Platform Phase Status</h1>
        <p>
          This screen is the Phase 0 starter status page. Business modules are
          intentionally locked until architecture, design system, security, and
          phase controls are implemented.
        </p>
      </section>
      <ProductionStatusBanner status={PROJECT_IDENTITY.productionStatus} />
      <section className="phase-grid" aria-label="Platform phases">
        {PLATFORM_PHASES.map((phase) => (
          <article className="phase-card" key={phase.number}>
            <span className="phase-number">
              Phase {phase.number.toString().padStart(2, "0")}
            </span>
            <h2>{phase.name}</h2>
            <p>Status: {phase.status}</p>
            <p>
              Production blocking:{" "}
              <strong>{phase.productionBlocking ? "Yes" : "No"}</strong>
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
