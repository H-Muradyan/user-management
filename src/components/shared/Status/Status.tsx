import type { ReactNode } from "react";
import styles from "./Status.module.css";

interface StatusProps {
  children: ReactNode;
  error?: boolean;
  action?: { label: string; onClick: () => void };
}

export function Status({ children, error = false, action }: StatusProps) {
  return (
    <div
      className={error ? `${styles.status} ${styles.error}` : styles.status}
      role={error ? "alert" : undefined}
    >
      <p>{children}</p>
      {action && (
        <button type="button" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
