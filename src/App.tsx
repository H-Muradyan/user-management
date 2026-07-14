import styles from "./App.module.css";
import { useUsers } from "@/hooks/useUsers";
import { Status, UsersView } from "./components";

function App() {
  const { state, updateUserName, retry } = useUsers();

  return (
    <main className={styles.app}>
      <h1>User Management</h1>

      {state.status === "loading" && <Status>Loading users…</Status>}

      {state.status === "error" && (
        <Status error action={{ label: "Try again", onClick: retry }}>
          {state.message}
        </Status>
      )}

      {state.status === "success" && (
        <UsersView users={state.users} onSaveName={updateUserName} />
      )}
    </main>
  );
}

export default App;
