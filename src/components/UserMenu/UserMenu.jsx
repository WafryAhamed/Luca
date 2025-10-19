// components/UserMenu/UserMenu.jsx
import styles from "./UserMenu.module.css";

export default function UserMenu({ onClose }) {
  return (
    <div className={styles.UserMenu}>
      <div className={styles.UserMenuItem} onClick={onClose}>
        Settings
      </div>
      <div className={styles.UserMenuItem} onClick={onClose}>
        Help
      </div>
      <div className={styles.UserMenuItem} onClick={() => alert("Logged out!")}>
        Logout
      </div>
    </div>
  );
}