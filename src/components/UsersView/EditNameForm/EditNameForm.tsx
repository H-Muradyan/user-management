import { useState, type SubmitEvent } from "react";
import styles from "./EditNameForm.module.css";

interface EditNameFormProps {
  initialName: string;
  onSave: (name: string) => void;
}

export function EditNameForm({ initialName, onSave }: EditNameFormProps) {
  const [name, setName] = useState(initialName);

  const trimmed = name.trim();
  const canSave = trimmed.length > 0 && trimmed !== initialName;

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSave) return;
    onSave(trimmed);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="edit-name">Name</label>
      <div className={styles.row}>
        <input
          id="edit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <button type="submit" disabled={!canSave}>
          Save
        </button>
      </div>
    </form>
  );
}
