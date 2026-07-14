import { memo } from "react";
import type { SortDirection } from "@/utils/filters";
import styles from "./Toolbar.module.css";

interface ToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  city: string;
  onCityChange: (value: string) => void;
  cities: string[];
  sortDirection: SortDirection;
  onToggleSort: () => void;
  count: number;
}

export const Toolbar = memo(function Toolbar({
  search,
  onSearchChange,
  city,
  onCityChange,
  cities,
  sortDirection,
  onToggleSort,
  count,
}: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <label className={`${styles.field} ${styles.search}`}>
        <span className={styles.label}>Search</span>
        <input
          type="search"
          placeholder="Name or email"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>City</span>
        <select value={city} onChange={(e) => onCityChange(e.target.value)}>
          <option value="">All cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.field}>
        <span className={styles.label}>Sort by name</span>
        <button type="button" className={styles.sort} onClick={onToggleSort}>
          Name <span aria-hidden="true">{sortDirection === "asc" ? "↑" : "↓"}</span>
        </button>
      </div>

      <span className={styles.count}>{count} users</span>
    </div>
  );
});
