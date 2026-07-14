import type { User } from "@/types";

export type SortDirection = "asc" | "desc";

export function searchUsers(users: User[], query: string): User[] {
  const q = query.trim().toLowerCase();
  if (!q) return users;
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q),
  );
}

export function filterByCity(users: User[], city: string): User[] {
  if (!city) return users;
  return users.filter((user) => user.address.city === city);
}

export function sortByName(users: User[], direction: SortDirection): User[] {
  const dir = direction === "asc" ? 1 : -1;
  return [...users].sort((a, b) => dir * a.name.localeCompare(b.name));
}

export function uniqueCities(users: User[]): string[] {
  console.log("uniqueCities", users);
  return [...new Set(users.map((user) => user.address.city))].sort();
}
