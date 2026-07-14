import type { User } from "../../types";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers(signal?: AbortSignal): Promise<User[]> {
  const response = await fetch(USERS_URL, { signal });
  if (!response.ok) {
    throw new Error(`Failed to load users (HTTP ${response.status})`);
  }
  return response.json();
}
