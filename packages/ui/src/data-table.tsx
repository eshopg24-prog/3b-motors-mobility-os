"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "./states";

export type DataTableColumn<TRecord> = {
  readonly key: string;
  readonly header: string;
  readonly accessor: keyof TRecord;
  readonly render?: (record: TRecord) => React.ReactNode;
  readonly sortable?: boolean;
};

export type DataTableFilter<TRecord> = {
  readonly key: string;
  readonly label: string;
  readonly accessor: keyof TRecord;
  readonly options: readonly { readonly label: string; readonly value: string }[];
};

export type DataTableProps<TRecord> = {
  readonly columns: readonly DataTableColumn<TRecord>[];
  readonly data: readonly TRecord[];
  readonly filters?: readonly DataTableFilter<TRecord>[];
  readonly getRowKey: (record: TRecord) => string;
  readonly title: string;
  readonly searchableFields?: readonly (keyof TRecord)[];
  readonly onRowClick?: (record: TRecord) => void;
  readonly pageSize?: number;
};

type SortDirection = "asc" | "desc";

export function DataTable<TRecord extends object>({
  columns,
  data,
  filters = [],
  getRowKey,
  onRowClick,
  pageSize = 10,
  searchableFields = [],
  title
}: DataTableProps<TRecord>) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Readonly<Record<string, string>>>({});
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return data.filter((record) => {
      const matchesQuery =
        !normalizedQuery ||
        searchableFields.length === 0 ||
        searchableFields.some((field) =>
          String(record[field] ?? "")
            .toLowerCase()
            .includes(normalizedQuery)
        );

      const matchesFilters = filters.every((filter) => {
        const selected = activeFilters[filter.key];
        return !selected || String(record[filter.accessor] ?? "") === selected;
      });

      return matchesQuery && matchesFilters;
    });
  }, [activeFilters, data, filters, query, searchableFields]);

  const sortedData = useMemo(() => {
    if (!sortKey) {
      return filteredData;
    }

    const column = columns.find((candidate) => candidate.key === sortKey);
    if (!column) {
      return filteredData;
    }

    const direction = sortDirection === "asc" ? 1 : -1;
    return [...filteredData].sort((left, right) =>
      String(left[column.accessor] ?? "").localeCompare(String(right[column.accessor] ?? ""), undefined, {
        numeric: true,
        sensitivity: "base"
      }) * direction
    );
  }, [columns, filteredData, sortDirection, sortKey]);

  const pageCount = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSort = (column: DataTableColumn<TRecord>) => {
    if (column.sortable === false) {
      return;
    }

    setPage(1);
    if (sortKey === column.key) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(column.key);
    setSortDirection("asc");
  };

  return (
    <section className="data-table-card">
      <header className="data-table-card__header">
        <div>
          <h3>{title}</h3>
          <span className="data-table-card__count">{sortedData.length} records</span>
        </div>
        <input
          aria-label={`Search ${title}`}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          placeholder="Search records..."
          type="search"
          value={query}
        />
      </header>
      {filters.length > 0 ? (
        <div className="data-table-filters" aria-label={`${title} filters`}>
          {filters.map((filter) => (
            <label key={filter.key}>
              <span>{filter.label}</span>
              <select
                onChange={(event) => {
                  setActiveFilters((current) => ({ ...current, [filter.key]: event.target.value }));
                  setPage(1);
                }}
                value={activeFilters[filter.key] ?? ""}
              >
                <option value="">All</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      ) : null}
      {pageData.length === 0 ? (
        <EmptyState description="No records match the current search and filters." title="No records found" />
      ) : (
        <div className="data-table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>
                    <button
                      className="data-table__sort"
                      disabled={column.sortable === false}
                      onClick={() => toggleSort(column)}
                      type="button"
                    >
                      {column.header}
                      {sortKey === column.key ? (sortDirection === "asc" ? " ↑" : " ↓") : ""}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.map((record) => (
                <tr
                  key={getRowKey(record)}
                  onClick={() => onRowClick?.(record)}
                  onKeyDown={(event) => {
                    if (onRowClick && (event.key === "Enter" || event.key === " ")) {
                      event.preventDefault();
                      onRowClick(record);
                    }
                  }}
                  tabIndex={onRowClick ? 0 : undefined}
                >
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.render ? column.render(record) : String(record[column.accessor] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <footer className="data-table-pagination" aria-label={`${title} pagination`}>
        <button disabled={currentPage <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))} type="button">
          Previous
        </button>
        <span>
          Page {currentPage} of {pageCount}
        </span>
        <button
          disabled={currentPage >= pageCount}
          onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
          type="button"
        >
          Next
        </button>
      </footer>
    </section>
  );
}
