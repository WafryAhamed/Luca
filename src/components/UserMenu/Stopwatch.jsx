import { useEffect, useState } from "react";
import styles from "./UserMenu.module.css";

export default function Stopwatch({ onBack }) {
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStopwatchRunning]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className={styles.ToolPanel}>
      <div className={styles.ToolHeader}>
        <button onClick={onBack} className={styles.BackButton}>
          ←
        </button>
        <h3>Stopwatch</h3>
      </div>

      <div className={styles.GlassCard}>
        <div className={styles.TimerDisplay}>{formatTime(stopwatchTime)}</div>

        <div className={styles.ToolButtons}>
          <button
            onClick={() => setIsStopwatchRunning((prev) => !prev)}
            className={styles.ToolButton}
          >
            {isStopwatchRunning ? "Stop" : "Start"}
          </button>

          <button
            onClick={() => {
              setIsStopwatchRunning(false);
              setStopwatchTime(0);
            }}
            className={styles.ToolButton}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
