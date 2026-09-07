"use client";

import { useState } from "react";

export function GlobalSearch({
  onSearch,
  placeholder = "Search vehicles, SKUs, invoices, orders, VINs..."
}: {
  readonly placeholder?: string;
  readonly onSearch?: (query: string) => void;
}) {
  const [query, setQuery] = useState("");
  const unavailable = !onSearch;

  return (
    <form
      className="global-search"
      onSubmit={(event) => {
        event.preventDefault();
        if (onSearch && query.trim()) {
          onSearch(query.trim());
        }
      }}
      role="search"
    >
      <label className="sr-only" htmlFor="global-search">
        Global search
      </label>
      <input
        disabled={unavailable}
        id="global-search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder={unavailable ? "Global search unavailable in this phase" : placeholder}
        title={unavailable ? "Cross-entity search is not implemented yet" : undefined}
        type="search"
        value={query}
      />
      <kbd aria-hidden="true">⌘K</kbd>
    </form>
  );
}
