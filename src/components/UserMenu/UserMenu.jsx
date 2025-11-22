import { useState, useEffect } from "react";
import styles from "./UserMenu.module.css";

export default function UserMenu({ onClose }) {
  const [activeTool, setActiveTool] = useState(null);
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [isFocusActive, setIsFocusActive] = useState(false);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Focus Timer
  useEffect(() => {
    let interval = null;
    if (isFocusActive) {
      interval = setInterval(() => {
        if (focusSeconds > 0) {
          setFocusSeconds(focusSeconds - 1);
        } else if (focusMinutes > 0) {
          setFocusMinutes(focusMinutes - 1);
          setFocusSeconds(59);
        } else {
          setIsFocusActive(false);
          alert("🎉 Focus session ended! Take a break.");
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFocusActive, focusMinutes, focusSeconds]);

  // Stopwatch
  useEffect(() => {
    let interval = null;
    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime(stopwatchTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStopwatchRunning, stopwatchTime]);

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), text: newNote }]);
      setNewNote("");
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // 🔹 Focus Timer
  if (activeTool === "focus") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button onClick={() => setActiveTool(null)} className={styles.BackButton}>←</button>
          <h3>Focus Timer</h3>
        </div>
        <div className={styles.GlassCard}>
          <div className={styles.TimerDisplay}>
            {String(focusMinutes).padStart(2, "0")}:{String(focusSeconds).padStart(2, "0")}
          </div>
          <div className={styles.ToolButtons}>
            <button
              onClick={() => setIsFocusActive(!isFocusActive)}
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
          <p className={styles.ToolHint}>Stay focused for 25 minutes, then take a short break 🌿</p>
        </div>
      </div>
    );
  }

  // 🔹 Stopwatch code is here
  if (activeTool === "stopwatch") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button onClick={() => setActiveTool(null)} className={styles.BackButton}>←</button>
          <h3>Stopwatch</h3>
        </div>
        <div className={styles.GlassCard}>
          <div className={styles.TimerDisplay}>{formatTime(stopwatchTime)}</div>
          <div className={styles.ToolButtons}>
            <button
              onClick={() => setIsStopwatchRunning(!isStopwatchRunning)}
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

  // 🔹 Notes Saver code
  if (activeTool === "notes") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button onClick={() => setActiveTool(null)} className={styles.BackButton}>←</button>
          <h3>Notes Saver</h3>
        </div>
        <div className={styles.GlassCard}>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note here..."
            className={styles.ToolTextarea}
          />
          <button onClick={addNote} className={styles.ToolButton}>Add Note</button>
          <div className={styles.NotesList}>
            {notes.map((note) => (
              <div key={note.id} className={styles.NoteItem}>
                <span>{note.text}</span>
                <button onClick={() => deleteNote(note.id)} className={styles.DeleteButton}>🗑️</button>
              </div>
            ))}
          </div>
          {notes.length === 0 && <p className={styles.ToolHint}>No notes yet — start writing!</p>}
        </div>
      </div>
    );
  }

  // 🔹 Main Menu code
  return (
    <div className={styles.UserMenu}>
      <div className={styles.UserMenuItem} onClick={onClose}>Settings</div>
      <div className={styles.UserMenuItem} onClick={onClose}>Help</div>
      <div className={styles.Divider}></div>
      <div className={styles.ToolSection}>Tools</div>
      <div className={styles.UserMenuItem} onClick={() => setActiveTool("focus")}>⏱️ Focus Timer</div>
      <div className={styles.UserMenuItem} onClick={() => setActiveTool("stopwatch")}>🕒 Stopwatch</div>
      <div className={styles.UserMenuItem} onClick={() => setActiveTool("notes")}>📝 Notes Saver</div>
      <div className={styles.Divider}></div>
      <div
        className={`${styles.UserMenuItem} ${styles.LogoutItem}`}
        onClick={() => {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("user");
          alert("Logged out!");
          onClose();
        }}
      >
        Logout
      </div>
    </div>
  );
}
