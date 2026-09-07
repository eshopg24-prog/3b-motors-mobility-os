"use client";

import { useMemo, useState } from "react";
import { PROJECT_IDENTITY } from "@3bm/config";
import {
  AccessDenied,
  AuditTimeline,
  Badge,
  Button,
  ChartCard,
  ConfirmationModal,
  DataTable,
  DetailDrawer,
  EmptyState,
  ErrorState,
  FormField,
  GlobalSearch,
  IntegrationRequired,
  LoadingSkeleton,
  MetricCard,
  Modal,
  ProductionStatusBanner,
  PublicLayout,
  ReportCard,
  RiskBadge,
  StatusBadge,
  VehicleCard,
  WorkspaceLayout,
  type DataTableColumn,
  type DataTableFilter,
  type NavigationItem
} from "@3bm/ui";

type DemoRecord = {
  readonly id: string;
  readonly module: string;
  readonly status: string;
  readonly owner: string;
  readonly risk: "low" | "medium" | "high" | "critical";
};

const navigation: readonly NavigationItem[] = [
  { label: "Design System", href: "/design-system" },
  { label: "Blueprint", href: "/blueprint/platform" },
  { label: "Public Website", href: "/", locked: true, requiredPermission: "phase.publicWebsite" },
  { label: "Inventory OS", href: "/inventory-os/dashboard", locked: true, requiredPermission: "inventory.view" },
  { label: "Finance", href: "/finance/dashboard", locked: true, requiredPermission: "finance.view" }
] as const;

const demoRecords: readonly DemoRecord[] = [
  { id: "DS-001", module: "Design Tokens", status: "active", owner: "Product Design", risk: "low" },
  { id: "DS-002", module: "Workspace Shell", status: "pendingReview", owner: "Platform", risk: "medium" },
  { id: "DS-003", module: "Access Control UI", status: "blocked", owner: "Security", risk: "critical" }
] as const;

const columns: readonly DataTableColumn<DemoRecord>[] = [
  { key: "id", header: "ID", accessor: "id" },
  { key: "module", header: "Module", accessor: "module" },
  {
    key: "status",
    header: "Status",
    accessor: "status",
    render: (record) => <StatusBadge status={record.status} />
  },
  { key: "owner", header: "Owner", accessor: "owner" },
  {
    key: "risk",
    header: "Risk",
    accessor: "risk",
    render: (record) => <RiskBadge risk={record.risk} />
  }
] as const;

const filters: readonly DataTableFilter<DemoRecord>[] = [
  {
    key: "risk",
    label: "Risk",
    accessor: "risk",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "Critical", value: "critical" }
    ]
  }
] as const;

export function DesignSystemShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DemoRecord | null>(null);
  const [message, setMessage] = useState("No local demo action executed yet.");
  const [searchResult, setSearchResult] = useState("No local search submitted yet.");

  const drawerRecord = useMemo(() => selectedRecord ?? demoRecords[0] ?? null, [selectedRecord]);

  return (
    <WorkspaceLayout
      activeHref="/design-system"
      currentUserLabel="Demo role: Operations Manager"
      navigation={navigation}
      pageDescription="Reusable visual system, shell patterns, enterprise components, states, tables, modals, and explicit unavailable states. This route is a component showcase, not a live business workspace."
      pageTitle="Design System and App Shell"
      sidebarFooter={<span className="mono">Phase 2 / NOT READY</span>}
      workspaceLabel="Design System"
    >
      <ProductionStatusBanner status={PROJECT_IDENTITY.productionStatus} />

      <section className="dashboard-grid" aria-label="Design system inventory">
        <MetricCard helper="Public and protected shell primitives" label="Layouts" value="2" />
        <MetricCard helper="Exported reusable UI components" label="Components" value="26" />
        <MetricCard helper="Color, radius, typography, workspace and status systems" label="Token Groups" value="5" />
        <MetricCard helper="No launch claim is permitted" label="Readiness" tone="warning" value="NOT READY" />
      </section>

      <section className="showcase-grid">
        <ChartCard title="Module Color System" subtitle="Canonical module accents">
          <div className="token-grid">
            <Badge tone="danger">Public Website</Badge>
            <Badge tone="info">Customer Portal</Badge>
            <Badge tone="gold">Dealer Portal</Badge>
            <Badge tone="purple">Fleet Portal</Badge>
            <Badge tone="ev">Inventory OS</Badge>
            <Badge tone="warning">Procurement</Badge>
          </div>
        </ChartCard>

        <ChartCard title="Button System" subtitle="Every enabled demo control has a local, reversible action">
          <div className="button-row">
            <Button onClick={() => setModalOpen(true)}>Open modal</Button>
            <Button onClick={() => setDrawerOpen(true)} variant="secondary">Open drawer</Button>
            <Button onClick={() => setMessage("Outline action executed locally.")} variant="outline">Outline action</Button>
            <Button onClick={() => setMessage("No local demo action executed yet.")} variant="ghost">Reset message</Button>
            <Button onClick={() => setConfirmationOpen(true)} variant="danger">Risk confirmation</Button>
            <Button onClick={() => setMessage("Success action executed locally.")} variant="success">Success action</Button>
          </div>
          <p className="demo-message" aria-live="polite">{message}</p>
        </ChartCard>
      </section>

      <section className="showcase-grid">
        <VehicleCard
          category="Electric Mobility"
          ctaLabel="Preview unavailable"
          status="Public commerce is locked until verified."
          title="EV Motorcycle Product Card"
        />
        <IntegrationRequired
          integrationName="Payment Provider"
          reason="Payment actions remain unavailable until integration governance and checkout readiness are implemented and verified."
        />
      </section>

      <section className="showcase-grid">
        <ReportCard
          description="Static component preview only; no report engine or operational data source is connected."
          status="Preview"
          title="Readiness Report Card"
        />
        <ChartCard title="Global Search Contract" subtitle="Local demo callback only; cross-entity search is not implemented">
          <GlobalSearch onSearch={(query) => setSearchResult(`Local demo query: ${query}`)} placeholder="Try a local design-system query..." />
          <p className="demo-message" aria-live="polite">{searchResult}</p>
        </ChartCard>
      </section>

      <DataTable
        columns={columns}
        data={demoRecords}
        filters={filters}
        getRowKey={(record) => record.id}
        onRowClick={(record) => {
          setSelectedRecord(record);
          setDrawerOpen(true);
        }}
        pageSize={2}
        searchableFields={["id", "module", "status", "owner"]}
        title="Component Readiness"
      />

      <section className="showcase-grid">
        <LoadingSkeleton label="Loading demo state" />
        <EmptyState
          actionLabel="Acknowledge empty state"
          description="This is the standard empty state for routes with no records."
          onAction={() => setMessage("Empty-state action executed locally.")}
          title="No records yet"
        />
        <ErrorState
          description="This is the standard error state for failed data loading."
          onRetry={() => setMessage("Retry action executed locally; no network request was made.")}
          title="Unable to load data"
        />
      </section>

      <AccessDenied
        currentRole="dealer"
        requiredPermission="finance.view"
        requiredRole="financeManager"
        returnHref="/design-system"
      />

      <AuditTimeline
        description="Component preview only. These rows are not persisted AuditEvent records and are not verification evidence."
        items={[
          {
            id: "SAMPLE-AUD-DS-001",
            action: "Design-system preview rendered",
            actor: "sample-ui",
            timestamp: "Phase 2 sample",
            risk: "low"
          },
          {
            id: "SAMPLE-AUD-DS-002",
            action: "Locked-state preview rendered",
            actor: "sample-ui",
            timestamp: "Phase 2 sample",
            risk: "medium"
          }
        ]}
        title="Audit Timeline · Sample UI"
      />

      <PublicLayout>
        <section className="public-preview-card">
          <p className="eyebrow">Public Shell Preview</p>
          <h2>Powering Mobility Across Africa</h2>
          <p>
            This preview confirms the reusable public shell exists. Future public routes and quote actions are visibly locked; public website content and commerce are not implemented in Phase 2.
          </p>
        </section>
      </PublicLayout>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Modal Component Preview">
        <p className="modal-copy">This interaction is local to the design-system showcase and does not mutate business data.</p>
        <FormField helperText="Presentation-only field; no persistence occurs." id="demo-reference" label="Demo reference">
          <input className="ui-input" id="demo-reference" placeholder="DS-DEMO" type="text" />
        </FormField>
        <footer className="modal-actions">
          <Button onClick={() => setModalOpen(false)} variant="outline">Close</Button>
        </footer>
      </Modal>

      <ConfirmationModal
        description="This demonstrates the confirmation pattern only. Confirming records a local UI message and does not execute a protected command."
        isOpen={confirmationOpen}
        onCancel={() => setConfirmationOpen(false)}
        onConfirm={() => {
          setConfirmationOpen(false);
          setMessage("Critical confirmation demo completed locally; no protected command ran.");
        }}
        riskLevel="critical"
        title="Critical Action Pattern"
      />

      <DetailDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Detail Drawer Preview">
        {drawerRecord ? (
          <dl>
            <div><dt>ID</dt><dd>{drawerRecord.id}</dd></div>
            <div><dt>Module</dt><dd>{drawerRecord.module}</dd></div>
            <div><dt>Status</dt><dd>{drawerRecord.status}</dd></div>
            <div><dt>Owner</dt><dd>{drawerRecord.owner}</dd></div>
          </dl>
        ) : (
          <p>No sample record selected.</p>
        )}
      </DetailDrawer>
    </WorkspaceLayout>
  );
}
