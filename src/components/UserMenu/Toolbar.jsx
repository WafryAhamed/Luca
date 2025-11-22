import styles from "./UserMenu.module.css";

export default function Toolbar({
  onOpenFocus,
  onOpenStopwatch,
  onOpenNotebook,
  onQuickNote,
}) {
  return (
    <div className={styles.MiniToolbar}>
      <span className={styles.MiniToolbarLabel}>Study Tools</span>

      <button className={styles.MiniToolbarButton} onClick={onOpenFocus}>
        ⏱️ Timer
      </button>

      <button className={styles.MiniToolbarButton} onClick={onOpenStopwatch}>
        🕒 Stopwatch
      </button>

      <button className={styles.MiniToolbarButton} onClick={onOpenNotebook}>
        📝 Notes
      </button>

      <button className={styles.MiniToolbarButton} onClick={onQuickNote}>
        ⚡ Quick note
      </button>
    </div>
  );
}
