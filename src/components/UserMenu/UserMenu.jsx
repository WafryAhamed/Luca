// src/components/UserMenu/UserMenu.jsx
import { useState, useEffect } from "react";
import styles from "./UserMenu.module.css";

export default function UserMenu({ onClose }) {
  const [activeTool, setActiveTool] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Focus Timer
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [isFocusActive, setIsFocusActive] = useState(false);
  const [focusMode, setFocusMode] = useState('pomodoro'); // pomodoro/break

  // Stopwatch
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  // Notes
  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), text: newNote }]);
      setNewNote("");
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Focus Timer Logic
  useEffect(() => {
    let interval = null;
    if (isFocusActive && focusTime > 0) {
      interval = setInterval(() => {
        setFocusTime(time => time - 1);
      }, 1000);
    } else if (isFocusActive && focusTime === 0) {
      setIsFocusActive(false);
      const message = focusMode === 'pomodoro' 
        ? "Focus session ended! Take a 5-minute break." 
        : "Break time over! Ready to focus?";
      alert(message);
      
      // Auto-switch mode
      if (focusMode === 'pomodoro') {
        setFocusMode('break');
        setFocusTime(5 * 60);
      } else {
        setFocusMode('pomodoro');
        setFocusTime(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isFocusActive, focusTime, focusMode]);

  const toggleFocus = () => {
    if (focusTime === 0) {
      setFocusMode('pomodoro');
      setFocusTime(25 * 60);
    }
    setIsFocusActive(!isFocusActive);
  };

  const resetFocus = () => {
    setIsFocusActive(false);
    setFocusMode('pomodoro');
    setFocusTime(25 * 60);
  };

  // Stopwatch Logic
  useEffect(() => {
    let interval = null;
    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime(time => time + 1);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isStopwatchRunning]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    const ms = Math.floor((totalSeconds % 1) * 100);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
  };

  const addLap = () => {
    setLaps([...laps, stopwatchTime]);
  };

  const resetStopwatch = () => {
    setIsStopwatchRunning(false);
    setStopwatchTime(0);
    setLaps([]);
  };

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setActiveTool(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (activeTool === "focus") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button onClick={() => setActiveTool(null)} className={styles.BackButton}>
            ←
          </button>
          <h3>{focusMode === 'pomodoro' ? 'Focus Session' : 'Break Time'}</h3>
          <div></div>
        </div>
        
        <div className={styles.FocusDisplay}>
          <div className={styles.FocusCircle}>
            <svg viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(185, 103, 255, 0.2)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#B967FF"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - focusTime / (focusMode === 'pomodoro' ? 25*60 : 5*60))}`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className={styles.FocusTime}>
              {Math.floor(focusTime / 60)}:{String(Math.floor(focusTime % 60)).padStart(2, '0')}
            </div>
          </div>
        </div>

        <div className={styles.ToolActions}>
          <button 
            onClick={toggleFocus} 
            className={`${styles.ToolButton} ${isFocusActive ? styles.PauseButton : styles.StartButton}`}
          >
            {isFocusActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={resetFocus} className={`${styles.ToolButton} ${styles.ResetButton}`}>
            Reset
          </button>
        </div>

        <div className={styles.FocusInfo}>
          {focusMode === 'pomodoro' 
            ? 'Work for 25 minutes without distractions' 
            : 'Take a 5-minute break to recharge'}
        </div>
      </div>
    );
  }

  if (activeTool === "stopwatch") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button onClick={() => setActiveTool(null)} className={styles.BackButton}>
            ←
          </button>
          <h3>Stopwatch</h3>
          <div></div>
        </div>
        
        <div className={styles.StopwatchDisplay}>
          {formatTime(stopwatchTime / 100)}
        </div>

        <div className={styles.ToolActions}>
          <button 
            onClick={() => setIsStopwatchRunning(!isStopwatchRunning)} 
            className={`${styles.ToolButton} ${isStopwatchRunning ? styles.PauseButton : styles.StartButton}`}
          >
            {isStopwatchRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={addLap} className={`${styles.ToolButton} ${styles.LapButton}`}>
            Lap
          </button>
          <button onClick={resetStopwatch} className={`${styles.ToolButton} ${styles.ResetButton}`}>
            Reset
          </button>
        </div>

        {laps.length > 0 && (
          <div className={styles.LapList}>
            <h4>Laps</h4>
            {laps.slice().reverse().map((lap, i) => (
              <div key={i} className={styles.LapItem}>
                <span>Lap {laps.length - i}</span>
                <span>{formatTime(lap / 100)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (activeTool === "notes") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button onClick={() => setActiveTool(null)} className={styles.BackButton}>
            ←
          </button>
          <h3>Notes Saver</h3>
          <div></div>
        </div>
        
        <div className={styles.NotesInput}>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note here..."
            className={styles.NotesTextarea}
          />
          <button onClick={addNote} className={styles.AddNoteButton}>
            + Add
          </button>
        </div>

        <div className={styles.NotesList}>
          {notes.length === 0 ? (
            <p className={styles.EmptyNotes}>No notes yet. Start writing!</p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className={styles.NoteCard}>
                <p>{note.text}</p>
                <button 
                  onClick={() => deleteNote(note.id)} 
                  className={styles.DeleteNoteButton}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.UserMenu}>
      <div className={styles.UserMenuItem} onClick={onClose}>
        <span>⚙️</span> Settings
      </div>
      <div className={styles.UserMenuItem} onClick={onClose}>
        <span>❓</span> Help
      </div>
      
      <div className={styles.Divider}></div>
      
      <div className={styles.ToolSection}>Study Tools</div>
      
      <div 
        className={styles.UserMenuItem} 
        onClick={() => setActiveTool("focus")}
      >
        <span>🎯</span> Focus Timer
      </div>
      
      <div 
        className={styles.UserMenuItem} 
        onClick={() => setActiveTool("stopwatch")}
      >
        <span>⏱️</span> Stopwatch
      </div>
      
      <div 
        className={styles.UserMenuItem} 
        onClick={() => setActiveTool("notes")}
      >
        <span>📝</span> Notes Saver
      </div>
      
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
        <span>🚪</span> Logout
      </div>
    </div>
  );
}