import { useCallback, useEffect, useState } from "react";
import { fetchUsers } from "../../api/users/users";
import { saveEdit, withSavedEdits } from "@/utils/storage";
import { UsersStatus } from "./types";
import type { UsersState, UseUsersResult } from "./types";
export { UsersStatus } from "./types";
export type { SaveNameHandler } from "./types";

export function useUsers(): UseUsersResult {
  const [state, setState] = useState<UsersState>({
    status: UsersStatus.LOADING,
  });
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchUsers(controller.signal)
      .then((users) => {
        setState({ status: UsersStatus.SUCCESS, users: withSavedEdits(users) });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setState({ status: UsersStatus.ERROR, message });
      });

    return () => controller.abort();
  }, [reloadKey]);

  const updateUserName = useCallback((id: number, name: string) => {
    setState((prev) =>
      prev.status === UsersStatus.SUCCESS
        ? {
            ...prev,
            users: prev.users.map((user) =>
              user.id === id ? { ...user, name } : user,
            ),
          }
        : prev,
    );
    saveEdit(id, name);
  }, []);

  const retry = useCallback(() => {
    setState({ status: UsersStatus.LOADING });
    setReloadKey((key) => key + 1);
  }, []);

  return { state, updateUserName, retry };
}
