import { memo } from "react";
import type { User } from "@/types";
import styles from "./UserTable.module.css";

interface UserTableProps {
  users: User[];
  onSelectUser: (user: User) => void;
}

export const UserTable = memo(function UserTable({
  users,
  onSelectUser,
}: UserTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              tabIndex={0}
              onClick={() => onSelectUser(user)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectUser(user);
                }
              }}
            >
              <td data-label="Name">{user.name}</td>
              <td data-label="Email">{user.email}</td>
              <td data-label="Company">{user.company.name}</td>
              <td data-label="City">{user.address.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
