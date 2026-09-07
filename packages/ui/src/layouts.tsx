import type React from "react";
import { PROJECT_IDENTITY } from "@3bm/config";
import { ThreeBMotorsLogo } from "./logo";
import { Sidebar, type NavigationItem, TopBar } from "./navigation";

export type PublicNavigationItem = {
  readonly label: string;
  readonly href: string;
  readonly locked?: boolean;
};

const defaultPublicNavigation: readonly PublicNavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Build Status", href: "/status" },
  { label: "Vehicles", href: "/vehicles", locked: true },
  { label: "Motorcycles", href: "/motorcycles", locked: true },
  { label: "Three-Wheelers", href: "/three-wheelers", locked: true },
  { label: "Electric Mobility", href: "/electric-mobility", locked: true },
  { label: "Parts", href: "/parts", locked: true },
  { label: "Services", href: "/services", locked: true }
] as const;

export function PublicLayout({
  children,
  navigation = defaultPublicNavigation,
  quoteHref
}: {
  readonly children: React.ReactNode;
  readonly navigation?: readonly PublicNavigationItem[];
  readonly quoteHref?: string;
}) {
  return (
    <div className="public-layout">
      <header className="public-header">
        <ThreeBMotorsLogo />
        <nav aria-label="Public navigation">
          {navigation.map((item) =>
            item.locked ? (
              <span aria-disabled="true" className="public-nav-locked" key={item.href} title="Future phase">
                {item.label}
              </span>
            ) : (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            )
          )}
        </nav>
        {quoteHref ? (
          <a className="ui-button ui-button--primary ui-button--sm" href={quoteHref}>
            Request Quote
          </a>
        ) : (
          <span aria-disabled="true" className="ui-button ui-button--primary ui-button--sm public-cta-locked" title="Quote intake is not implemented yet">
            Request Quote · Locked
          </span>
        )}
      </header>
      <main>{children}</main>
      <footer className="public-footer">
        <ThreeBMotorsLogo />
        <p>{PROJECT_IDENTITY.platformStatement}</p>
        <small>Production status: NOT READY</small>
      </footer>
    </div>
  );
}

export function WorkspaceLayout({
  activeHref,
  children,
  currentUserLabel,
  navigation,
  pageDescription,
  pageTitle,
  sidebarFooter,
  workspaceLabel
}: {
  readonly workspaceLabel: string;
  readonly pageTitle: string;
  readonly pageDescription?: string;
  readonly currentUserLabel: string;
  readonly navigation: readonly NavigationItem[];
  readonly activeHref?: string;
  readonly sidebarFooter?: React.ReactNode;
  readonly children: React.ReactNode;
}) {
  const sidebarProps: Parameters<typeof Sidebar>[0] = {
    items: navigation,
    workspaceLabel,
    ...(activeHref ? { activeHref } : {}),
    ...(sidebarFooter ? { footer: sidebarFooter } : {})
  };

  return (
    <div className="workspace-layout">
      <Sidebar {...sidebarProps} />
      <section className="workspace-content">
        <TopBar currentUserLabel={currentUserLabel} pageTitle={pageTitle} />
        {pageDescription ? <p className="workspace-description">{pageDescription}</p> : null}
        {children}
      </section>
    </div>
  );
}
