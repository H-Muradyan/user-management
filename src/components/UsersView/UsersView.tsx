import { useCallback, useState } from "react";
import { useUserFilters } from "@/hooks/useUserFilters";
import type { SaveNameHandler } from "@/hooks/useUsers";
import { Status } from "@/components/shared/Status";
import { Toolbar } from "./Toolbar";
import { UserTable } from "./UserTable";
import { UserModal } from "./UserModal";
import type { User } from "@/types";

interface UsersViewProps {
  users: User[];
  onSaveName: SaveNameHandler;
}

export function UsersView({ users, onSaveName }: UsersViewProps) {
  const filters = useUserFilters(users);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedUser = users.find((user) => user.id === selectedId) ?? null;
  
  const selectUser = useCallback((user: User) => setSelectedId(user.id), []);
  const closeModal = useCallback(() => setSelectedId(null), []);

  return (
    <>
      <Toolbar
        search={filters.search}
        onSearchChange={filters.setSearch}
        city={filters.city}
        onCityChange={filters.setCity}
        cities={filters.cities}
        sortDirection={filters.sortDirection}
        onToggleSort={filters.toggleSort}
        count={filters.visibleUsers.length}
      />

      {filters.visibleUsers.length > 0 ? (
        <UserTable
          users={filters.visibleUsers}
          onSelectUser={selectUser}
        />
      ) : (
        <Status
          action={
            filters.hasActiveFilters
              ? { label: "Clear filters", onClick: filters.clearFilters }
              : undefined
          }
        >
          No users match your search.
        </Status>
      )}

      {selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={closeModal}
          onSaveName={onSaveName}
        />
      )}
    </>
  );
}
