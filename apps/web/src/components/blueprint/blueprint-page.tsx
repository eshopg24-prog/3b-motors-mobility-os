import {
  auditEventRegistry,
  entityRegistry,
  integrationRegistry,
  permissionRegistry,
  productionReadinessRegistry,
  publicForbiddenFields,
  relationshipRegistry,
  routeRegistry,
  securityEventRegistry,
  workflowRegistry
} from "@3bm/blueprint";
import { PROJECT_IDENTITY } from "@3bm/config";
import { ProductionStatusBanner, ThreeBMotorsLogo } from "@3bm/ui";

type BlueprintPageKind =
  | "platform"
  | "routes"
  | "entities"
  | "relationships"
  | "rbac"
  | "security"
  | "workflows"
  | "integrations"
  | "aiGovernance"
  | "productionReadiness";

type BlueprintPageProps = {
  readonly kind: BlueprintPageKind;
};

const pageTitle: Record<BlueprintPageKind, string> = {
  platform: "Platform Overview",
  routes: "Route Map",
  entities: "Entity Registry",
  relationships: "Relationship Map",
  rbac: "RBAC Matrix",
  security: "Security Blueprint",
  workflows: "Workflow Registry",
  integrations: "Integration Blueprint",
  aiGovernance: "AI Governance Blueprint",
  productionReadiness: "Production Readiness"
};

const blueprintLinks = [
  ["/blueprint/platform", "Platform"],
  ["/blueprint/routes", "Routes"],
  ["/blueprint/entities", "Entities"],
  ["/blueprint/relationships", "Relationships"],
  ["/blueprint/rbac", "RBAC"],
  ["/blueprint/security", "Security"],
  ["/blueprint/workflows", "Workflows"],
  ["/blueprint/integrations", "Integrations"],
  ["/blueprint/ai-governance", "AI Governance"],
  ["/blueprint/production-readiness", "Readiness"]
] as const;

export function BlueprintPage({ kind }: BlueprintPageProps) {
  return (
    <main className="blueprint-shell">
      <aside className="blueprint-sidebar">
        <ThreeBMotorsLogo />
        <nav aria-label="Blueprint navigation">
          {blueprintLinks.map(([href, label]) => (
            <a className="blueprint-nav-link" href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
      </aside>

      <section className="blueprint-main">
        <header className="blueprint-header">
          <div>
            <p className="eyebrow">Architecture Blueprint</p>
            <h1>{pageTitle[kind]}</h1>
            <p>
              Source-of-truth planning layer for 3B Motors MOS. This phase defines
              architecture and governance only. Business workflows remain locked.
            </p>
            <p className="blueprint-access-warning">
              Access classifications are declarative in Phase 1. Runtime route guards,
              RBAC enforcement, RLS, FLS, and security-event persistence are not yet implemented.
            </p>
          </div>
        </header>

        <ProductionStatusBanner status={PROJECT_IDENTITY.productionStatus} />

        {kind === "platform" && <PlatformOverview />}
        {kind === "routes" && <RouteMap />}
        {kind === "entities" && <EntityMap />}
        {kind === "relationships" && <RelationshipMap />}
        {kind === "rbac" && <RbacMap />}
        {kind === "security" && <SecurityBlueprint />}
        {kind === "workflows" && <WorkflowMap />}
        {kind === "integrations" && <IntegrationMap />}
        {kind === "aiGovernance" && <AIGovernanceBlueprint />}
        {kind === "productionReadiness" && <ProductionReadinessMap />}
      </section>
    </main>
  );
}

function PlatformOverview() {
  const stats = [
    ["Registered routes", routeRegistry.length],
    ["Registered entities", entityRegistry.length],
    ["Relationships", relationshipRegistry.length],
    ["Permissions", permissionRegistry.length],
    ["Workflows", workflowRegistry.length],
    ["Readiness checks", productionReadinessRegistry.length]
  ] as const;

  return (
    <section className="blueprint-grid">
      {stats.map(([label, value]) => (
        <article className="blueprint-card" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
        </article>
      ))}

      <article className="blueprint-panel wide">
        <h2>Platform Statement</h2>
        <p>{PROJECT_IDENTITY.platformStatement}</p>
        <dl>
          <div>
            <dt>Company</dt>
            <dd>{PROJECT_IDENTITY.companyName}</dd>
          </div>
          <div>
            <dt>organizationId</dt>
            <dd>{PROJECT_IDENTITY.canonicalOrganizationId}</dd>
          </div>
          <div>
            <dt>Domain</dt>
            <dd>{PROJECT_IDENTITY.publicDomain}</dd>
          </div>
        </dl>
      </article>
    </section>
  );
}

function RouteMap() {
  return (
    <section className="blueprint-panel">
      <h2>Routes</h2>
      <div className="blueprint-table">
        <div className="table-row table-head">
          <span>Path</span>
          <span>Workspace</span>
          <span>Access</span>
          <span>Permission</span>
          <span>Phase</span>
        </div>
        {routeRegistry.map((route) => (
          <div className="table-row" key={route.path}>
            <span className="mono">{route.path}</span>
            <span>{route.workspace}</span>
            <span>{route.accessLevel}</span>
            <span>{route.requiredPermission ?? "public"}</span>
            <span>{route.phase}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function EntityMap() {
  return (
    <section className="blueprint-panel">
      <h2>Entities</h2>
      <div className="blueprint-table">
        <div className="table-row table-head">
          <span>Name</span>
          <span>Family</span>
          <span>Phase</span>
          <span>Org scoped</span>
          <span>Append-only</span>
        </div>
        {entityRegistry.map((entity) => (
          <div className="table-row" key={entity.name}>
            <span className="mono">{entity.name}</span>
            <span>{entity.family}</span>
            <span>{entity.phase}</span>
            <span>{entity.organizationScoped ? "Yes" : "No"}</span>
            <span>{entity.appendOnly ? "Yes" : "No"}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function RelationshipMap() {
  return (
    <section className="blueprint-panel">
      <h2>Relationships</h2>
      <div className="blueprint-table">
        <div className="table-row table-head">
          <span>From</span>
          <span>To</span>
          <span>Type</span>
          <span>Required</span>
          <span>Description</span>
        </div>
        {relationshipRegistry.map((relationship) => (
          <div
            className="table-row"
            key={`${relationship.fromEntity}-${relationship.toEntity}`}
          >
            <span className="mono">{relationship.fromEntity}</span>
            <span className="mono">{relationship.toEntity}</span>
            <span>{relationship.relationship}</span>
            <span>{relationship.required ? "Yes" : "No"}</span>
            <span>{relationship.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function RbacMap() {
  return (
    <section className="blueprint-panel">
      <h2>Permission Registry</h2>
      <div className="blueprint-table">
        <div className="table-row cols-4 table-head">
          <span>Permission</span>
          <span>Label</span>
          <span>Risk</span>
          <span>Description</span>
        </div>
        {permissionRegistry.map((permission) => (
          <div className="table-row cols-4" key={permission.key}>
            <span className="mono">{permission.key}</span>
            <span>{permission.label}</span>
            <span>{permission.riskLevel}</span>
            <span>{permission.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SecurityBlueprint() {
  return (
    <section className="blueprint-grid">
      <article className="blueprint-panel">
        <h2>Security Events</h2>
        <ul className="blueprint-list">
          {securityEventRegistry.map((event) => (
            <li className="mono" key={event}>
              {event}
            </li>
          ))}
        </ul>
      </article>

      <article className="blueprint-panel">
        <h2>Public Forbidden Fields</h2>
        <ul className="blueprint-list">
          {publicForbiddenFields.map((field) => (
            <li className="mono" key={field}>
              {field}
            </li>
          ))}
        </ul>
      </article>

      <article className="blueprint-panel wide">
        <h2>Audit Events</h2>
        <ul className="blueprint-list columns">
          {auditEventRegistry.map((event) => (
            <li className="mono" key={event}>
              {event}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

function WorkflowMap() {
  return (
    <section className="blueprint-panel">
      <h2>Workflows</h2>
      <div className="workflow-stack">
        {workflowRegistry.map((workflow) => (
          <article className="workflow-card" key={workflow.key}>
            <div>
              <span className="mono">{workflow.key}</span>
              <h3>{workflow.label}</h3>
              <p>Entity: {workflow.entity}</p>
            </div>
            <div className="state-list">
              {workflow.states.map((state) => (
                <span key={state}>{state}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function IntegrationMap() {
  return (
    <section className="blueprint-panel">
      <h2>Integration Registry</h2>
      <div className="blueprint-table">
        <div className="table-row table-head">
          <span>Key</span>
          <span>Category</span>
          <span>Path</span>
          <span>Phase</span>
          <span>Live without evidence</span>
        </div>
        {integrationRegistry.map((integration) => (
          <div className="table-row" key={integration.key}>
            <span className="mono">{integration.key}</span>
            <span>{integration.category}</span>
            <span>{integration.preferredPath}</span>
            <span>{integration.phase}</span>
            <span>No</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function AIGovernanceBlueprint() {
  const may = [
    "summarize authorized records",
    "classify support tickets",
    "forecast demand",
    "identify inventory anomalies",
    "recommend replenishment",
    "draft reports",
    "flag duplicate vehicle identifiers"
  ];

  const mayNot = [
    "approve payments",
    "approve refunds",
    "adjust stock",
    "transfer stock",
    "post journals",
    "change roles",
    "change permissions",
    "delete protected records",
    "correct vehicle identifiers",
    "approve warranties",
    "approve suppliers"
  ];

  return (
    <section className="blueprint-grid">
      <article className="blueprint-panel">
        <h2>AI May</h2>
        <ul className="blueprint-list">
          {may.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>

      <article className="blueprint-panel danger-panel">
        <h2>AI May Not Directly</h2>
        <ul className="blueprint-list">
          {mayNot.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}

function ProductionReadinessMap() {
  return (
    <section className="blueprint-panel">
      <h2>Production Readiness Checks</h2>
      <div className="blueprint-table">
        <div className="table-row table-head">
          <span>Key</span>
          <span>Category</span>
          <span>Severity</span>
          <span>Required</span>
          <span>Title</span>
        </div>
        {productionReadinessRegistry.map((check) => (
          <div className="table-row" key={check.key}>
            <span className="mono">{check.key}</span>
            <span>{check.category}</span>
            <span>{check.severity}</span>
            <span>{check.requiredForLaunch ? "Yes" : "No"}</span>
            <span>{check.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
