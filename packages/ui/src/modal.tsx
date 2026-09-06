"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { Button } from "./button";
import { cn } from "./lib/cn";

export function Modal({
  children,
  isOpen,
  onClose,
  title
}: {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly children: React.ReactNode;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousActiveElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section aria-labelledby="modal-title" aria-modal="true" className="modal-panel" role="dialog">
        <header className="modal-panel__header">
          <h2 id="modal-title">{title}</h2>
          <button
            aria-label="Close modal"
            className="icon-button"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            ×
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}

export function ConfirmationModal({
  confirmLabel = "Confirm",
  description,
  isOpen,
  onCancel,
  onConfirm,
  riskLevel,
  title
}: {
  readonly isOpen: boolean;
  readonly title: string;
  readonly description: string;
  readonly riskLevel: "low" | "medium" | "high" | "critical";
  readonly confirmLabel?: string;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <div className={cn("confirmation-risk", `confirmation-risk--${riskLevel}`)}>
        Risk level: {riskLevel}
      </div>
      <p className="modal-copy">{description}</p>
      <p className="modal-audit-note">
        Production use requires permission enforcement and persisted audit evidence. This component does not create audit records by itself.
      </p>
      <footer className="modal-actions">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant={riskLevel === "critical" ? "danger" : "primary"}>
          {confirmLabel}
        </Button>
      </footer>
    </Modal>
  );
}
