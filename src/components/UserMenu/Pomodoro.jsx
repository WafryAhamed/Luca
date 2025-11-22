import { useEffect, useState } from "react";
import styles from "./UserMenu.module.css";

function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export default function Pomodoro({ onBack, onEnableFocusMode }) {
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [cycles, setCycles] = useState(4);

  const [currentCycle, setCurrentCycle] = useState(1);
  const [phase, setPhase] = useState("focus"); // "focus" | "short" | "long"
  const [secondsLeft, setSecondsLeft] = useState(focusMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 0) return prev - 1;

        // handle phase change
        setPhase((prevPhase) => {
          if (prevPhase === "focus") {
            // Completed a focus block
            if (currentCycle >= cycles) {
              setCurrentCycle(1);
              setSecondsLeft(focusMinutes * 60);
              setIsRunning(false);
              alert("🎉 Pomodoro cycles completed!");
              return "focus";
            }
            const nextCycle = currentCycle + 1;
            setCurrentCycle(nextCycle);

            if (nextCycle % cycles === 0) {
              setSecondsLeft(longBreak * 60);
              return "long";
            } else {
              setSecondsLeft(shortBreak * 60);
              return "short";
            }
          }

          if (prevPhase === "short") {
            setSecondsLeft(focusMinutes * 60);
            return "focus";
          }

          if (prevPhase === "long") {
            setSecondsLeft(focusMinutes * 60);
            return "focus";
          }

          return prevPhase;
        });

        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, focusMinutes, shortBreak, longBreak, cycles, currentCycle]);

  const resetAll = () => {
    setIsRunning(false);
    setCurrentCycle(1);
    setPhase("focus");
    setSecondsLeft(focusMinutes * 60);
  };

  useEffect(() => {
    if (phase === "focus" && onEnableFocusMode) {
      onEnableFocusMode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  return (
    <div className={styles.ToolPanel}>
      <div className={styles.ToolHeader}>
        <button onClick={onBack} className={styles.BackButton}>
          ←
        </button>
        <h3>Pomodoro Mode</h3>
      </div>

      <div className={`${styles.GlassCard} ${styles.PomodoroLayout}`}>
        <div className={styles.PomodoroPhase}>
          {phase === "focus" && "Focus Session"}
          {phase === "short" && "Short Break"}
          {phase === "long" && "Long Break"}
        </div>

        <div className={styles.TimerDisplay}>{formatTime(secondsLeft)}</div>

        <div className={styles.PomodoroConfig}>
          <div className={styles.PomodoroField}>
            <label>Focus (min)</label>
            <input
              type="number"
              min="1"
              value={focusMinutes}
              onChange={(e) => {
                const v = parseInt(e.target.value || "0", 10);
                setFocusMinutes(v);
                if (!isRunning && phase === "focus") {
                  setSecondsLeft(v * 60);
                }
              }}
            />
          </div>
          <div className={styles.PomodoroField}>
            <label>Short Break (min)</label>
            <input
              type="number"
              min="1"
              value={shortBreak}
              onChange={(e) => {
                const v = parseInt(e.target.value || "0", 10);
                setShortBreak(v);
                if (!isRunning && phase === "short") {
                  setSecondsLeft(v * 60);
                }
              }}
            />
          </div>
          <div className={styles.PomodoroField}>
            <label>Long Break (min)</label>
            <input
              type="number"
              min="1"
              value={longBreak}
              onChange={(e) => {
                const v = parseInt(e.target.value || "0", 10);
                setLongBreak(v);
                if (!isRunning && phase === "long") {
                  setSecondsLeft(v * 60);
                }
              }}
            />
          </div>
          <div className={styles.PomodoroField}>
            <label>Cycles</label>
            <input
              type="number"
              min="1"
              value={cycles}
              onChange={(e) => {
                const v = parseInt(e.target.value || "0", 10);
                setCycles(v || 1);
              }}
            />
          </div>
        </div>

        <div className={styles.ToolButtons}>
          <button
            className={styles.ToolButton}
            onClick={() => setIsRunning((prev) => !prev)}
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button className={styles.ToolButton} onClick={resetAll}>
            Reset
          </button>
          <button
            className={styles.ToolButton}
            onClick={onEnableFocusMode}
          >
            Focus Mode
          </button>
        </div>

        <div className={styles.PomodoroMeta}>
          Cycle {currentCycle} of {cycles}
        </div>
      </div>
    </div>
  );
}
