import { useCallback, useMemo, useState } from "react";
import {
  filterByCity,
  searchUsers,
  sortByName,
  uniqueCities,
  type SortDirection,
} from "@/utils/filters";
import { useDebouncedValue } from "../useDebouncedValue/useDebouncedValue";
import type { User } from "@/types";
import type { UseUserFiltersResult } from "./types";

export function useUserFilters(users: User[]): UseUserFiltersResult {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const debouncedSearch = useDebouncedValue(search);
  const cities = useMemo(() => uniqueCities(users), [users]);

  const visibleUsers = useMemo(
    () =>
      sortByName(
        filterByCity(searchUsers(users, debouncedSearch), city),
        sortDirection,
      ),
    [users, debouncedSearch, city, sortDirection],
  );

  const toggleSort = useCallback(
    () => setSortDirection((dir) => (dir === "asc" ? "desc" : "asc")),
    [],
  );

  const clearFilters = useCallback(() => {
    setSearch("");
    setCity("");
  }, []);

  const hasActiveFilters = search !== "" || city !== "";

  return {
    search,
    setSearch,
    city,
    setCity,
    cities,
    sortDirection,
    toggleSort,
    visibleUsers,
    hasActiveFilters,
    clearFilters,
  };
}
