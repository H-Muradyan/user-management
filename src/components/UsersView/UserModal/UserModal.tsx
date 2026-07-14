import { Modal } from "@/components/shared/Modal";
import { EditNameForm } from "../EditNameForm";
import type { User } from "@/types";
import type { SaveNameHandler } from "@/hooks/useUsers";
import styles from "./UserModal.module.css";

interface UserModalProps {
  user: User;
  onClose: () => void;
  onSaveName: SaveNameHandler;
}

function userDetails(user: User): Array<[label: string, value: string]> {
  return [
    ["Username", `@${user.username}`],
    ["Email", user.email],
    ["Phone", user.phone],
    ["Website", user.website],
    ["Company", user.company.name],
    ["Catch phrase", user.company.catchPhrase],
    ["Address", `${user.address.suite}, ${user.address.street}`],
    ["City", `${user.address.city} ${user.address.zipcode}`],
  ];
}

export function UserModal({ user, onClose, onSaveName }: UserModalProps) {
  const handleSave = (name: string) => {
    onSaveName(user.id, name);
    onClose();
  };

  return (
    <Modal title={user.name} onClose={onClose}>
      <EditNameForm initialName={user.name} onSave={handleSave} />

      <dl className={styles.details}>
        {userDetails(user).map(([label, value]) => (
          <div key={label} className={styles.field}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </Modal>
  );
}
