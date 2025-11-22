import { useEffect, useState } from "react";
import styles from "./UserMenu.module.css";

export default function FocusTimer({ onBack }) {
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [isFocusActive, setIsFocusActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isFocusActive) {
      interval = setInterval(() => {
        setFocusSeconds((prevSec) => {
          if (prevSec > 0) return prevSec - 1;
          return 59;
        });
        setFocusMinutes((prevMin) => {
          if (focusSeconds === 0) {
            if (prevMin > 0) return prevMin - 1;
            return prevMin;
          }
          return prevMin;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocusActive, focusSeconds]);

  useEffect(() => {
    if (focusMinutes === 0 && focusSeconds === 0 && isFocusActive) {
      setIsFocusActive(false);
      alert("🎉 Focus session ended!");
    }
  }, [focusMinutes, focusSeconds, isFocusActive]);

  return (
    <div className={styles.ToolPanel}>
      <div className={styles.ToolHeader}>
        <button onClick={onBack} className={styles.BackButton}>
          ←
        </button>
        <h3>Focus Timer</h3>
      </div>

      <div className={styles.GlassCard}>
        <div className={styles.TimerDisplay}>
          {String(focusMinutes).padStart(2, "0")}:
          {String(focusSeconds).padStart(2, "0")}
        </div>

        <div className={styles.ToolButtons}>
          <button
            onClick={() => setIsFocusActive((prev) => !prev)}
            className={styles.ToolButton}
          >
            {isFocusActive ? "Pause" : "Start"}
          </button>

          <button
            onClick={() => {
              setIsFocusActive(false);
              setFocusMinutes(25);
              setFocusSeconds(0);
            }}
            className={styles.ToolButton}
          >
            Reset
          </button>
        </div>

        <p className={styles.ToolHint}>Stay focused!</p>
      </div>
    </div>
  );
}
