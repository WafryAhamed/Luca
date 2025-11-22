import { useState, useEffect } from "react";
import styles from "./UserMenu.module.css";

export default function UserMenu({ onClose }) {
  const [activeTool, setActiveTool] = useState(null);
  const [activeSettingsTab, setActiveSettingsTab] = useState("general");
  const [activeSubSection, setActiveSubSection] = useState(null);

  // Focus Timer
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [isFocusActive, setIsFocusActive] = useState(false);

  // Stopwatch
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  // Notes
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Settings with sub-sections
  const [settings, setSettings] = useState({
    language: "English",
    region: "Sri Lanka",
    theme: "Dark",
    fontSize: "Medium",
    uiDensity: "Comfortable",
    notifications: true,
    timerAlertSound: true,
    pushNotifications: false,
    voiceInput: false,
    textToSpeech: false,
    reduceMotion: false,
    highContrast: false,
    dataSharing: false,
    exportData: false,
    autoSaveNotes: true,
    defaultTool: "none",
  });

  // Focus timer effect
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

  // Stopwatch effect
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
    setNotes(notes.filter((note) => note.id !== id));
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // ---------------------------------------------------------
  // SETTINGS PANEL WITH SUB-SECTIONS
  // ---------------------------------------------------------
  if (activeTool === "settings") {
    return (
      <div className={styles.ToolPanel}>
        {/* Header */}
        <div className={styles.ToolHeader}>
          <button onClick={() => setActiveTool(null)} className={styles.BackButton}>
            ←
          </button>
          <h3>Settings</h3>
        </div>

        <div className={styles.SettingsContainer}>
          {/* LEFT SIDE TABS */}
          <div className={styles.SettingsSidebar}>
            {[
              ["general", "General"],
              ["appearance", "Appearance"],
              ["notifications", "Notifications"],
              ["accessibility", "Accessibility"],
              ["privacy", "Privacy"],
              ["notes", "Notes"],
              ["account", "Account"],
            ].map(([key, label]) => (
              <div
                key={key}
                className={`${styles.SettingsTab} ${
                  activeSettingsTab === key ? styles.ActiveTab : ""
                }`}
                onClick={() => {
                  setActiveSettingsTab(key);
                  setActiveSubSection(null);
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className={styles.SettingsContent}>
            {/* -------- GENERAL -------- */}
            {activeSettingsTab === "general" && (
              <>
                <h4>Main Settings</h4>

                <div className={styles.SettingRow}>
                  <label>Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      setSettings({ ...settings, language: e.target.value })
                    }
                    className={styles.SettingSelect}
                  >
                    <option>English</option>
                    <option>Tamil</option>
                    <option>Sinhala</option>
                  </select>
                </div>

                <div className={styles.SettingRow}>
                  <label>Region</label>
                  <select
                    value={settings.region}
                    onChange={(e) =>
                      setSettings({ ...settings, region: e.target.value })
                    }
                    className={styles.SettingSelect}
                  >
                    <option>Sri Lanka</option>
                    <option>India</option>
                    <option>Global</option>
                  </select>
                </div>

                <div className={styles.SettingRow}>
                  <label>Default Tool</label>
                  <select
                    value={settings.defaultTool}
                    onChange={(e) =>
                      setSettings({ ...settings, defaultTool: e.target.value })
                    }
                    className={styles.SettingSelect}
                  >
                    <option value="none">None</option>
                    <option value="focus">Focus Timer</option>
                    <option value="stopwatch">Stopwatch</option>
                    <option value="notes">Notes</option>
                  </select>
                </div>
              </>
            )}

            {/* -------- APPEARANCE -------- */}
            {activeSettingsTab === "appearance" && (
              <>
                <h4>Theme & UI</h4>

                <div className={styles.SettingRow}>
                  <label>Theme</label>
                  <select
                    value={settings.theme}
                    onChange={(e) =>
                      setSettings({ ...settings, theme: e.target.value })
                    }
                    className={styles.SettingSelect}
                  >
                    <option>Dark</option>
                    <option>Light</option>
                    <option>Auto</option>
                  </select>
                </div>

                <div className={styles.SettingRow}>
                  <label>Font Size</label>
                  <select
                    value={settings.fontSize}
                    onChange={(e) =>
                      setSettings({ ...settings, fontSize: e.target.value })
                    }
                    className={styles.SettingSelect}
                  >
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </div>

                <div className={styles.SettingRow}>
                  <label>UI Density</label>
                  <select
                    value={settings.uiDensity}
                    onChange={(e) =>
                      setSettings({ ...settings, uiDensity: e.target.value })
                    }
                    className={styles.SettingSelect}
                  >
                    <option>Comfortable</option>
                    <option>Compact</option>
                  </select>
                </div>
              </>
            )}

            {/* -------- NOTIFICATIONS -------- */}
            {activeSettingsTab === "notifications" && (
              <>
                <h4>Notifications</h4>

                <div className={styles.SettingToggle}>
                  <span>Enable Notifications</span>
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={() =>
                      setSettings({
                        ...settings,
                        notifications: !settings.notifications,
                      })
                    }
                  />
                </div>

                <div className={styles.SettingToggle}>
                  <span>Timer Alert Sound</span>
                  <input
                    type="checkbox"
                    checked={settings.timerAlertSound}
                    onChange={() =>
                      setSettings({
                        ...settings,
                        timerAlertSound: !settings.timerAlertSound,
                      })
                    }
                  />
                </div>

                <div className={styles.SettingToggle}>
                  <span>Push Notifications</span>
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={() =>
                      setSettings({
                        ...settings,
                        pushNotifications: !settings.pushNotifications,
                      })
                    }
                  />
                </div>
              </>
            )}

            {/* -------- ACCESSIBILITY -------- */}
            {activeSettingsTab === "accessibility" && (
              <>
                <h4>Accessibility</h4>

                <div className={styles.SettingToggle}>
                  <span>Voice Input</span>
                  <input
                    type="checkbox"
                    checked={settings.voiceInput}
                    onChange={() =>
                      setSettings({
                        ...settings,
                        voiceInput: !settings.voiceInput,
                      })
                    }
                  />
                </div>

                <div className={styles.SettingToggle}>
                  <span>Text-to-Speech</span>
                  <input
                    type="checkbox"
                    checked={settings.textToSpeech}
                    onChange={() =>
                      setSettings({
                        ...settings,
                        textToSpeech: !settings.textToSpeech,
                      })
                    }
                  />
                </div>

                <div className={styles.SettingToggle}>
                  <span>Reduce Motion</span>
                  <input
                    type="checkbox"
                    checked={settings.reduceMotion}
                    onChange={() =>
                      setSettings({
                        ...settings,
                        reduceMotion: !settings.reduceMotion,
                      })
                    }
                  />
                </div>

                <div className={styles.SettingToggle}>
                  <span>High Contrast</span>
                  <input
                    type="checkbox"
                    checked={settings.highContrast}
                    onChange={() =>
                      setSettings({
                        ...settings,
                        highContrast: !settings.highContrast,
                      })
                    }
                  />
                </div>
              </>
            )}

            {/* -------- PRIVACY -------- */}
            {activeSettingsTab === "privacy" && (
              <>
                <h4>Privacy & Security</h4>

                <div className={styles.SettingToggle}>
                  <span>Data Sharing</span>
                  <input
                    type="checkbox"
                    checked={settings.dataSharing}
                    onChange={() =>
                      setSettings({
                        ...settings,
                        dataSharing: !settings.dataSharing,
                      })
                    }
                  />
                </div>

                <button className={styles.DangerButton}>
                  Export My Data
                </button>

                <button className={styles.DangerButton}>
                  Delete All Data
                </button>
              </>
            )}

            {/* -------- NOTES -------- */}
            {activeSettingsTab === "notes" && (
              <>
                <h4>Notes Settings</h4>

                <div className={styles.SettingToggle}>
                  <span>Auto Save Notes</span>
                  <input
                    type="checkbox"
                    checked={settings.autoSaveNotes}
                    onChange={() =>
                      setSettings({
                        ...settings,
                        autoSaveNotes: !settings.autoSaveNotes,
                      })
                    }
                  />
                </div>
              </>
            )}

            {/* -------- ACCOUNT -------- */}
            {activeSettingsTab === "account" && (
              <>
                <h4>Account</h4>

                <p>Email: user@example.com</p>

                <button className={styles.DangerButton}>
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // FOCUS TIMER (existing)
  // ---------------------------------------------------------
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

          <p className={styles.ToolHint}>Stay focused!</p>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // STOPWATCH (existing)
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  // NOTES (existing)
  // ---------------------------------------------------------
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
                <button
                  onClick={() => deleteNote(note.id)}
                  className={styles.DeleteButton}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          {notes.length === 0 && (
            <p className={styles.ToolHint}>No notes yet</p>
          )}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // MAIN MENU
  // ---------------------------------------------------------
  return (
    <div className={styles.UserMenu}>
      <div className={styles.UserMenuItem} onClick={() => setActiveTool("settings")}>
        Settings
      </div>

      <div className={styles.UserMenuItem} onClick={onClose}>
        Help
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
        📝 Notes
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
  );
}
