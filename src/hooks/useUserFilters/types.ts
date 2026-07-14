import type { SortDirection } from "@/utils/filters";
import type { User } from "@/types";

export interface UseUserFiltersResult {
  search: string;
  setSearch: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  cities: string[];
  sortDirection: SortDirection;
  toggleSort: () => void;
  visibleUsers: User[];
  hasActiveFilters: boolean;
  clearFilters: () => void;
}
