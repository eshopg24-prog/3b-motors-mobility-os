import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-content">
          <p className="eyebrow">404</p>
          <h1>Page not found</h1>
          <p className="hero-statement">
            The page you are looking for does not exist or has not been built yet.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/">
              Return home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
