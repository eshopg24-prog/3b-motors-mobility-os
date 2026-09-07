import { PROJECT_IDENTITY } from "@3bm/config";
import { ProductionStatusBanner, ThreeBMotorsLogo } from "@3bm/ui";
import { HomeStatus } from "../components/home-status";

export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="hero-shell">
        <nav className="top-nav" aria-label="Main navigation">
          <ThreeBMotorsLogo />
          <a className="nav-link" href="/status">
            Status
          </a>
        </nav>
        <section className="hero-card">
          <div className="hero-content">
            <p className="eyebrow">3B Motors Ethiopia</p>
            <h1>{PROJECT_IDENTITY.shortName}</h1>
            <p className="hero-statement">{PROJECT_IDENTITY.platformStatement}</p>
            <div className="hero-actions">
              <a className="primary-button" href="/status">
                View Build Status
              </a>
              <span className="disabled-action" aria-disabled="true">
                Business modules locked
              </span>
            </div>
          </div>
          <ProductionStatusBanner status={PROJECT_IDENTITY.productionStatus} />
        </section>
      </header>
      <HomeStatus />
    </main>
  );
}
