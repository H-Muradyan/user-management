import type { User } from "../../types";

export const UsersStatus = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
} as const;

export type UsersState =
  | { status: typeof UsersStatus.LOADING }
  | { status: typeof UsersStatus.ERROR; message: string }
  | { status: typeof UsersStatus.SUCCESS; users: User[] };

export type SaveNameHandler = (id: number, name: string) => void;

export interface UseUsersResult {
  state: UsersState;
  updateUserName: SaveNameHandler;
  retry: () => void;
}
