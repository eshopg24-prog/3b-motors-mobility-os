import { Button } from "./button";

export function LoadingSkeleton({ label = "Loading..." }: { readonly label?: string }) {
  return (
    <div className="state-block" role="status" aria-live="polite">
      <div className="skeleton-line skeleton-line--wide" />
      <div className="skeleton-line" />
      <div className="skeleton-line skeleton-line--short" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function EmptyState({
  actionLabel,
  description,
  onAction,
  title
}: {
  readonly title: string;
  readonly description: string;
  readonly actionLabel?: string;
  readonly onAction?: () => void;
}) {
  return (
    <section className="state-block">
      <h3>{title}</h3>
      <p>{description}</p>
      {actionLabel && onAction ? (
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      ) : null}
    </section>
  );
}

export function ErrorState({
  description,
  retryLabel = "Try again",
  title,
  onRetry
}: {
  readonly title: string;
  readonly description: string;
  readonly retryLabel?: string;
  readonly onRetry?: () => void;
}) {
  return (
    <section className="state-block state-block--error" role="alert">
      <h3>{title}</h3>
      <p>{description}</p>
      {onRetry ? (
        <Button onClick={onRetry} variant="danger">
          {retryLabel}
        </Button>
      ) : null}
    </section>
  );
}

export function AccessDenied({
  currentRole,
  requiredPermission,
  requiredRole,
  returnHref = "/"
}: {
  readonly currentRole: string;
  readonly requiredRole: string;
  readonly requiredPermission: string;
  readonly returnHref?: string;
}) {
  return (
    <section className="access-denied">
      <span className="ui-badge ui-badge--danger">Access Denied</span>
      <h1>Permission required</h1>
      <p>
        Your current role cannot access this workspace. Request access from an administrator or return to a permitted area.
      </p>
      <dl>
        <div>
          <dt>Current role</dt>
          <dd>{currentRole}</dd>
        </div>
        <div>
          <dt>Required role</dt>
          <dd>{requiredRole}</dd>
        </div>
        <div>
          <dt>Required permission</dt>
          <dd>{requiredPermission}</dd>
        </div>
      </dl>
      <div className="access-denied__actions">
        <Button disabled title="Access-request workflow is not implemented until the security phase" variant="secondary">
          Request access unavailable
        </Button>
        <a className="ui-button ui-button--outline ui-button--md" href={returnHref}>
          Return
        </a>
      </div>
    </section>
  );
}
