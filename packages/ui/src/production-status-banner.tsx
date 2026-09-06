import type { ProductionStatus } from "@3bm/config";

type ProductionStatusBannerProps = {
  readonly status: ProductionStatus;
};

const STATUS_LABEL: Record<ProductionStatus, string> = {
  notReady: "NOT READY",
  inspectionRequired: "INSPECTION REQUIRED",
  verificationRequired: "VERIFICATION REQUIRED",
  phaseVerified: "PHASE VERIFIED",
  productionReady: "PRODUCTION READY"
};

export function ProductionStatusBanner({ status }: ProductionStatusBannerProps) {
  const isProductionReady = status === "productionReady";

  return (
    <section
      className={isProductionReady ? "status-banner status-ready" : "status-banner status-blocked"}
      aria-label="Production status"
    >
      <div>
        <span className="status-eyebrow">Production Status</span>
        <strong>{STATUS_LABEL[status]}</strong>
      </div>
      <p>
        This platform is being built phase by phase. It must not be treated as
        production-ready until QA verifies a readiness score of at least 90/100
        with no critical blockers.
      </p>
    </section>
  );
}
