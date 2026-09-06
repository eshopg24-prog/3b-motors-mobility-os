"use client";

import type React from "react";
import { useEffect, useRef } from "react";

export function DetailDrawer({
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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="drawer-backdrop" role="presentation">
      <aside aria-label={title} aria-modal="true" className="detail-drawer" role="dialog">
        <header className="detail-drawer__header">
          <h2>{title}</h2>
          <button
            aria-label="Close drawer"
            className="icon-button"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            ×
          </button>
        </header>
        <div className="detail-drawer__body">{children}</div>
      </aside>
    </div>
  );
}
