import type { User } from "../types";

type UserEdit = { name: string };
type UserEdits = Record<number, UserEdit>;

const STORAGE_KEY = "user-edits";

function loadEdits(): UserEdits {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function withSavedEdits(users: User[]): User[] {
  const edits = loadEdits();
  return users.map((user) => {
    const edit = edits[user.id];
    return edit ? { ...user, ...edit } : user;
  });
}

export function saveEdit(id: number, name: string): void {
  const edits = loadEdits();
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...edits, [id]: { name } }),
    );
  } catch (error) {
    console.warn("Could not persist user edits to localStorage", error);
  }
}
