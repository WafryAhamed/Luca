import { useState, useEffect } from "react";
import styles from "./UserMenu.module.css";

export default function UserMenu({ onClose }) {
  const [activeTool, setActiveTool] = useState(null);

  // Focus, Stopwatch, Notes
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [isFocusActive, setIsFocusActive] = useState(false);

  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Settings
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState("general");
  const [settings, setSettings] = useState({
    language: "English",
    region: "Sri Lanka",
    theme: "Dark",
    fontSize: "Medium",
    autoSaveNotes: true,
    notifications: true,
    pushAlerts: false,
    soundAlerts: true,
    reduceMotion: false,
    highContrast: false,
    dataSharing: false,
  });

  // 🆕 Help Center modal state
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [activeHelpTab, setActiveHelpTab] = useState("help");

  // Focus Timer logic
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
          alert("🎉 Focus session ended!");
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFocusActive, focusMinutes, focusSeconds]);

  // Stopwatch logic
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
  const deleteNote = (id) => setNotes(notes.filter((note) => note.id !== id));
  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  // ===================================================
  // Focus Timer
  // ===================================================
  if (activeTool === "focus") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button onClick={() => setActiveTool(null)} className={styles.BackButton}>
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
          <p className={styles.ToolHint}>Stay focused 🌿</p>
        </div>
      </div>
    );
  }

  // ===================================================
  // Stopwatch
  // ===================================================
  if (activeTool === "stopwatch") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button onClick={() => setActiveTool(null)} className={styles.BackButton}>
            ←
          </button>
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

  // ===================================================
  // Notes Saver
  // ===================================================
  if (activeTool === "notes") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button onClick={() => setActiveTool(null)} className={styles.BackButton}>
            ←
          </button>
          <h3>Notes Saver</h3>
        </div>

        <div className={styles.GlassCard}>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note..."
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

          {notes.length === 0 && <p className={styles.ToolHint}>No notes yet</p>}
        </div>
      </div>
    );
  }

  // ===================================================
  // MAIN MENU + SETTINGS + HELP MODALS
  // ===================================================
  return (
    <>
      {/* ------------------- MAIN MENU ------------------- */}
      <div className={styles.UserMenu}>
        <div className={styles.UserMenuItem} onClick={() => setIsSettingsOpen(true)}>
          ⚙️ Settings
        </div>

        <div className={styles.UserMenuItem} onClick={() => setIsHelpOpen(true)}>
          ❓ Help
        </div>

        <div className={styles.Divider}></div>

        <div className={styles.ToolSection}>Tools</div>

        <div className={styles.UserMenuItem} onClick={() => setActiveTool("focus")}>
          ⏱️ Focus Timer
        </div>
        <div className={styles.UserMenuItem} onClick={() => setActiveTool("stopwatch")}>
          🕒 Stopwatch
        </div>
        <div className={styles.UserMenuItem} onClick={() => setActiveTool("notes")}>
          📝 Notes Saver
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
          Logout
        </div>
      </div>

      {/* ------------------- SETTINGS MODAL (unchanged) ------------------- */}
      {isSettingsOpen && (
        <div className={styles.SettingsOverlay} onClick={() => setIsSettingsOpen(false)}>
          <div className={styles.SettingsModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.SettingsHeader}>
              <div>
                <h3>Settings</h3>
                <p>Customize your study experience</p>
              </div>
              <button
                className={styles.SettingsCloseBtn}
                onClick={() => setIsSettingsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className={styles.SettingsBody}>
              {/* sidebar */}
              <div className={styles.SettingsSidebar}>
                {[
                  ["general", "General"],
                  ["appearance", "Appearance"],
                  ["notifications", "Notifications"],
                  ["accessibility", "Accessibility"],
                  ["privacy", "Privacy"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    className={`${styles.SettingsTab} ${
                      activeSettingsTab === key ? styles.SettingsTabActive : ""
                    }`}
                    onClick={() => setActiveSettingsTab(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* content area */}
              <div className={styles.SettingsContent}>
                {/* GENERAL */}
                {activeSettingsTab === "general" && (
                  <>
                    <h4>General</h4>
                    <div className={styles.SettingRow}>
                      <div className={styles.SettingText}>
                        <span>Language</span>
                        <small>Choose your preferred language</small>
                      </div>
                      <select
                        className={styles.SettingSelect}
                        value={settings.language}
                        onChange={(e) =>
                          setSettings({ ...settings, language: e.target.value })
                        }
                      >
                        <option>English</option>
                        <option>Tamil</option>
                        <option>Sinhala</option>
                      </select>
                    </div>
                  </>
                )}
                {/* ... other settings unchanged */}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
         🆕 HELP CENTER MODAL (NEW FEATURE)
      ---------------------------------------------------------------- */}
      {isHelpOpen && (
        <div className={styles.HelpOverlay} onClick={() => setIsHelpOpen(false)}>
          <div className={styles.HelpModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.HelpHeader}>
              <div>
                <h3>Help Center</h3>
                <p>Your guide to using LUCA</p>
              </div>
              <button className={styles.HelpCloseBtn} onClick={() => setIsHelpOpen(false)}>
                ✕
              </button>
            </div>

            <div className={styles.HelpBody}>
              {/* SIDEBAR */}
              <div className={styles.HelpSidebar}>
                {[
                  ["help", "Help Center"],
                  ["terms", "Terms & Policies"],
                  ["bug", "Report a Bug"],
                  ["download", "Download Apps"],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    className={`${styles.HelpTab} ${
                      activeHelpTab === key ? styles.HelpTabActive : ""
                    }`}
                    onClick={() => setActiveHelpTab(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* CONTENT */}
              <div className={styles.HelpContent}>
                {/* HELP CENTER */}
                {activeHelpTab === "help" && (
                  <>
                    <h4>Welcome to LUCA</h4>
                    <p className={styles.HelpParagraph}>
                      <strong>Stop stressing. Start understanding.</strong>
                      <br />
                      Tired of re-reading the same things? LUCA simplifies every concept
                      so you learn once and remember forever.
                    </p>

                    <h4>All your study tools in one place</h4>
                    <ul className={styles.HelpList}>
                      <li>📚 Ask anything — Math, Science, English, Coding…</li>
                      <li>💬 Save your chats like a personal study notebook</li>
                      <li>⏰ Stay focused with built-in 25-minute Pomodoro</li>
                      <li>🌏 Works in Sinhala, Tamil & English</li>
                    </ul>

                    <h4>Start your learning journey</h4>
                    <p className={styles.HelpParagraph}>
                      Thousands of students are using LUCA to feel confident, calm and in
                      control — even before exams.
                    </p>
                  </>
                )}

                {/* TERMS & POLICIES */}
                {activeHelpTab === "terms" && (
                  <>
                    <h4>Terms & Policies</h4>
                    <p className={styles.HelpParagraph}>
                      By using LUCA, you agree to our data policy, usage terms, and safety
                      guidelines. We never sell your data and only store what is needed
                      for your learning tools to function.
                    </p>
                  </>
                )}

                {/* REPORT BUG */}
                {activeHelpTab === "bug" && (
                  <>
                    <h4>Report a Bug</h4>
                    <p className={styles.HelpParagraph}>
                      Found something not working? Help us improve LUCA!
                    </p>
                    <textarea
                      className={styles.HelpTextarea}
                      placeholder="Describe the issue..."
                    ></textarea>
                    <button className={styles.HelpSubmitBtn}>Submit Report</button>
                  </>
                )}

                {/* DOWNLOAD APPS */}
                {activeHelpTab === "download" && (
                  <>
                    <h4>Download LUCA</h4>
                    <p>Use LUCA anywhere, anytime.</p>
                    <div className={styles.DownloadButtons}>
                      <button className={styles.StoreButton}>📱 Android App</button>
                      <button className={styles.StoreButton}>📲 iOS App</button>
                      <button className={styles.StoreButton}>🖥️ Desktop App</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
