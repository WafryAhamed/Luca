// src/components/UserMenu/UserMenu.jsx
import { useState, useEffect } from "react";
import styles from "./UserMenu.module.css";

export default function UserMenu({ onClose }) {
  const [activeTool, setActiveTool] = useState(null);
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [isFocusActive, setIsFocusActive] = useState(false);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [files, setFiles] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [homeworkPrompt, setHomeworkPrompt] = useState("");
  const [homeworkResponse, setHomeworkResponse] = useState("");
  const [notepadContent, setNotepadContent] = useState("");

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
          alert("Focus session ended! Take a break.");
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

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
    e.target.value = "";
  };

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), text: newNote }]);
      setNewNote("");
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const askHomework = () => {
    if (!homeworkPrompt.trim()) return;
    setHomeworkResponse(
      `Here’s how to solve "${homeworkPrompt}":\n\nStep 1: Identify what’s being asked.\nStep 2: Recall relevant formulas/concepts.\nStep 3: Apply step-by-step.\n\nNeed more detail? Ask me!`
    );
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  if (activeTool === "focus") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button onClick={() => setActiveTool(null)} className={styles.BackButton}>
            ← Back
          </button>
          <h3>Focus Mode</h3>
        </div>
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
        <p className={styles.ToolHint}>Work for 25 min, then take a 5-min break.</p>
      </div>
    );
  }

  if (activeTool === "stopwatch") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button onClick={() => setActiveTool(null)} className={styles.BackButton}>
            ← Back
          </button>
          <h3>Stopwatch</h3>
        </div>
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
    );
  }

  if (activeTool === "files") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button onClick={() => setActiveTool(null)} className={styles.BackButton}>
            ← Back
          </button>
          <h3>File Manager</h3>
        </div>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className={styles.FileInput}
        />
        <ul className={styles.FileList}>
          {files.map((file, index) => (
            <li key={index} className={styles.FileItem}>
              📄 {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </li>
          ))}
        </ul>
        {files.length === 0 && <p className={styles.ToolHint}>No files uploaded.</p>}
      </div>
    );
  }

  if (activeTool === "notes") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button onClick={() => setActiveTool(null)} className={styles.BackButton}>
            ← Back
          </button>
          <h3>Notes Saver</h3>
        </div>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a note..."
          className={styles.ToolTextarea}
        />
        <button onClick={addNote} className={styles.ToolButton}>
          Add Note
        </button>
        <div className={styles.NotesList}>
          {notes.map((note) => (
            <div key={note.id} className={styles.NoteItem}>
              <span>{note.text}</span>
              <button onClick={() => deleteNote(note.id)} className={styles.DeleteButton}>
                🗑️
              </button>
            </div>
          ))}
        </div>
        {notes.length === 0 && <p className={styles.ToolHint}>No notes saved.</p>}
      </div>
    );
  }

  if (activeTool === "homework") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button onClick={() => setActiveTool(null)} className={styles.BackButton}>
            ← Back
          </button>
          <h3>Homework Helper</h3>
        </div>
        <input
          type="text"
          value={homeworkPrompt}
          onChange={(e) => setHomeworkPrompt(e.target.value)}
          placeholder="Enter your homework question..."
          className={styles.ToolInput}
        />
        <button onClick={askHomework} className={styles.ToolButton}>
          Ask LUCA
        </button>
        {homeworkResponse && (
          <div className={styles.ResponseBox}>
            <h4>LUCA says:</h4>
            <pre>{homeworkResponse}</pre>
          </div>
        )}
      </div>
    );
  }

  if (activeTool === "notepad") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button onClick={() => setActiveTool(null)} className={styles.BackButton}>
            ← Back
          </button>
          <h3>Notepad</h3>
        </div>
        <textarea
          value={notepadContent}
          onChange={(e) => setNotepadContent(e.target.value)}
          placeholder="Write anything here..."
          className={styles.ToolTextarea}
          rows="6"
        />
        <div className={styles.ToolButtons}>
          <button
            onClick={() => navigator.clipboard.writeText(notepadContent)}
            className={styles.ToolButton}
          >
            Copy All
          </button>
          <button
            onClick={() => setNotepadContent("")}
            className={styles.ToolButton}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.UserMenu}>
      {/* Original Menu Items */}
      <div className={styles.UserMenuItem} onClick={onClose}>
        Settings
      </div>
      <div className={styles.UserMenuItem} onClick={onClose}>
        Help
      </div>
      <div className={styles.Divider}></div>

      {/* New Tools */}
      <div className={styles.ToolSection}>Tools</div>
      <div className={styles.UserMenuItem} onClick={() => setActiveTool("focus")}>
        ⏱️ Focus Mode
      </div>
      <div className={styles.UserMenuItem} onClick={() => setActiveTool("stopwatch")}>
        ⏱️ Stopwatch
      </div>
      <div className={styles.UserMenuItem} onClick={() => setActiveTool("files")}>
        📁 File Manager
      </div>
      <div className={styles.UserMenuItem} onClick={() => setActiveTool("notes")}>
        📝 Notes Saver
      </div>
      <div className={styles.UserMenuItem} onClick={() => setActiveTool("homework")}>
        📚 Homework Helper
      </div>
      <div className={styles.UserMenuItem} onClick={() => setActiveTool("notepad")}>
        📒 Notepad
      </div>
      <div className={styles.Divider}></div>

      {/* Logout */}
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