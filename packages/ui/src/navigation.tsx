import type React from "react";
import { cn } from "./lib/cn";
import { ThreeBMotorsLogo } from "./logo";

export type NavigationItem = {
  readonly label: string;
  readonly href: string;
  readonly requiredPermission?: string;
  readonly locked?: boolean;
};

export type SidebarProps = {
  readonly workspaceLabel: string;
  readonly items: readonly NavigationItem[];
  readonly activeHref?: string;
  readonly footer?: React.ReactNode;
};

export function Sidebar({ activeHref, footer, items, workspaceLabel }: SidebarProps) {
  return (
    <aside className="workspace-sidebar">
      <ThreeBMotorsLogo />
      <div className="workspace-sidebar__label">{workspaceLabel}</div>
      <nav aria-label={`${workspaceLabel} navigation`}>
        {items.map((item) =>
          item.locked ? (
            <span
              aria-disabled="true"
              className="workspace-nav-link workspace-nav-link--locked"
              key={item.href}
              title={`Unavailable until ${item.requiredPermission ?? "the required phase"} is implemented`}
            >
              <span>{item.label}</span>
              <small>Locked</small>
            </span>
          ) : (
            <a
              className={cn("workspace-nav-link", activeHref === item.href && "workspace-nav-link--active")}
              href={item.href}
              key={item.href}
            >
              <span>{item.label}</span>
            </a>
          )
        )}
      </nav>
      {footer ? <footer className="workspace-sidebar__footer">{footer}</footer> : null}
    </aside>
  );
}

export function TopBar({
  currentUserLabel,
  pageTitle,
  workspaceSwitcher
}: {
  readonly pageTitle: string;
  readonly currentUserLabel: string;
  readonly workspaceSwitcher?: React.ReactNode;
}) {
  return (
    <header className="workspace-topbar">
      <div>
        <p className="topbar-eyebrow">3B Motors MOS</p>
        <h1>{pageTitle}</h1>
      </div>
      <div className="topbar-search">
        <form className="global-search global-search--mini" role="search">
          <label className="sr-only" htmlFor="topbar-global-search">
            Search
          </label>
          <input
            disabled
            id="topbar-global-search"
            placeholder="Search unavailable in Phase 2"
            title="Cross-entity search is not implemented yet"
            type="search"
          />
        </form>
      </div>
      <div className="topbar-actions">
        {workspaceSwitcher}
        <button
          aria-label="Notifications unavailable in Phase 2"
          className="icon-button"
          disabled
          title="Notifications are not implemented yet"
          type="button"
        >
          ●
        </button>
        <span className="profile-pill" title="Display-only identity label until Phase 3">
          {currentUserLabel}
        </span>
      </div>
    </header>
  );
}
