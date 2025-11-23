// UserMenu.jsx
import { useState, useEffect } from "react";
import FloatingToolWindow from "./FloatingToolWindow";
import styles from "./UserMenu.module.css";

export default function UserMenu({ onClose }) {
  const [openTools, setOpenTools] = useState([]); // Persistent across menu visibility

  // Menu visibility (only affects the launcher panel)
  const [isMenuVisible, setIsMenuVisible] = useState(true);

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

  // Settings & Help
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

  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [activeHelpTab, setActiveHelpTab] = useState("help");

  // Focus Timer Effect
  useEffect(() => {
    let interval = null;
    if (isFocusActive) {
      interval = setInterval(() => {
        if (focusSeconds > 0) {
          setFocusSeconds((prev) => prev - 1);
        } else if (focusMinutes > 0) {
          setFocusMinutes((prev) => prev - 1);
          setFocusSeconds(59);
        } else {
          setIsFocusActive(false);
          alert("🎉 Focus session ended!");
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFocusActive, focusMinutes, focusSeconds]);

  // Stopwatch Effect
  useEffect(() => {
    let interval = null;
    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStopwatchRunning]);

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), text: newNote }]);
      setNewNote("");
    }
  };

  const deleteNote = (id) => setNotes(notes.filter((note) => note.id !== id));

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const openTool = (toolKey) => {
    if (!openTools.includes(toolKey)) {
      setOpenTools((prev) => [...prev, toolKey]);
    }
  };

  const closeTool = (toolKey) => {
    setOpenTools((prev) => prev.filter((t) => t !== toolKey));
  };

  // Only the menu panel is conditionally shown
  return (
    <>
      {/* ✅ MAIN MENU PANEL (can be hidden) */}
      {isMenuVisible && (
        <div className={styles.UserMenu}>
          <div className={styles.ToolSectionLabelRow}>
            <div className={styles.ToolSection}>User Menu</div>
            <button
              className={styles.MenuCloseBtn}
              onClick={() => setIsMenuVisible(false)}
            >
              ✕
            </button>
          </div>

          <div
            className={styles.UserMenuItem}
            onClick={() => setIsSettingsOpen(true)}
          >
            ⚙️ Settings
          </div>

          <div className={styles.UserMenuItem} onClick={() => setIsHelpOpen(true)}>
            ❓ Help
          </div>

          <div className={styles.Divider}></div>

          <div className={styles.ToolSection}>Tools</div>

          <div className={styles.UserMenuItem} onClick={() => openTool("focus")}>
            ⏱️ Focus Timer
          </div>
          <div className={styles.UserMenuItem} onClick={() => openTool("stopwatch")}>
            🕒 Stopwatch
          </div>
          <div className={styles.UserMenuItem} onClick={() => openTool("notes")}>
            📝 Notes Saver
          </div>

          <div className={styles.Divider}></div>

          <div
            className={`${styles.UserMenuItem} ${styles.LogoutItem}`}
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("user");
              alert("Logged out!");
              onClose(); // This closes the entire menu system (e.g., from App)
            }}
          >
            Logout
          </div>
        </div>
      )}

      {/* ✅ FLOATING TOOLS: Rendered REGARDLESS of menu visibility */}
      {openTools.includes("focus") && (
        <FloatingToolWindow
          tool="Focus Timer"
          onClose={() => closeTool("focus")}
        >
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
        </FloatingToolWindow>
      )}

      {openTools.includes("stopwatch") && (
        <FloatingToolWindow
          tool="Stopwatch"
          onClose={() => closeTool("stopwatch")}
        >
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
        </FloatingToolWindow>
      )}

      {openTools.includes("notes") && (
        <FloatingToolWindow
          tool="Notes Saver"
          onClose={() => closeTool("notes")}
        >
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
        </FloatingToolWindow>
      )}

      {/* Settings Modal with FULL content */}
      {isSettingsOpen && (
        <div
          className={styles.SettingsOverlay}
          onClick={() => setIsSettingsOpen(false)}
        >
          <div
            className={styles.SettingsModal}
            onClick={(e) => e.stopPropagation()}
          >
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
                    <div className={styles.SettingRow}>
                      <div className={styles.SettingText}>
                        <span>Region</span>
                        <small>Set your location for local content</small>
                      </div>
                      <select
                        className={styles.SettingSelect}
                        value={settings.region}
                        onChange={(e) =>
                          setSettings({ ...settings, region: e.target.value })
                        }
                      >
                        <option>Sri Lanka</option>
                        <option>India</option>
                        <option>United States</option>
                      </select>
                    </div>
                    <div className={styles.SettingRow}>
                      <div className={styles.SettingText}>
                        <span>Font Size</span>
                        <small>Adjust text readability</small>
                      </div>
                      <select
                        className={styles.SettingSelect}
                        value={settings.fontSize}
                        onChange={(e) =>
                          setSettings({ ...settings, fontSize: e.target.value })
                        }
                      >
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                      </select>
                    </div>
                  </>
                )}

                {/* APPEARANCE */}
                {activeSettingsTab === "appearance" && (
                  <>
                    <h4>Appearance</h4>
                    <div className={styles.SettingRow}>
                      <div className={styles.SettingText}>
                        <span>Theme</span>
                        <small>Choose your visual style</small>
                      </div>
                      <select
                        className={styles.SettingSelect}
                        value={settings.theme}
                        onChange={(e) =>
                          setSettings({ ...settings, theme: e.target.value })
                        }
                      >
                        <option>Dark</option>
                        <option>Light</option>
                        <option>System</option>
                      </select>
                    </div>
                    <div className={styles.SettingRow}>
                      <div className={styles.SettingText}>
                        <span>Auto-save Notes</span>
                        <small>Save notes automatically</small>
                      </div>
                      <label className={styles.ToggleWrapper}>
                        <input
                          type="checkbox"
                          checked={settings.autoSaveNotes}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              autoSaveNotes: e.target.checked,
                            })
                          }
                        />
                        <span className={styles.ToggleSlider}></span>
                      </label>
                    </div>
                  </>
                )}

                {/* NOTIFICATIONS */}
                {activeSettingsTab === "notifications" && (
                  <>
                    <h4>Notifications</h4>
                    <div className={styles.SettingRow}>
                      <div className={styles.SettingText}>
                        <span>Enable Notifications</span>
                        <small>Get alerts for timers and reminders</small>
                      </div>
                      <label className={styles.ToggleWrapper}>
                        <input
                          type="checkbox"
                          checked={settings.notifications}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              notifications: e.target.checked,
                            })
                          }
                        />
                        <span className={styles.ToggleSlider}></span>
                      </label>
                    </div>
                    <div className={styles.SettingRow}>
                      <div className={styles.SettingText}>
                        <span>Push Alerts</span>
                        <small>Browser notifications</small>
                      </div>
                      <label className={styles.ToggleWrapper}>
                        <input
                          type="checkbox"
                          checked={settings.pushAlerts}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              pushAlerts: e.target.checked,
                            })
                          }
                        />
                        <span className={styles.ToggleSlider}></span>
                      </label>
                    </div>
                    <div className={styles.SettingRow}>
                      <div className={styles.SettingText}>
                        <span>Sound Alerts</span>
                        <small>Hear when focus session ends</small>
                      </div>
                      <label className={styles.ToggleWrapper}>
                        <input
                          type="checkbox"
                          checked={settings.soundAlerts}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              soundAlerts: e.target.checked,
                            })
                          }
                        />
                        <span className={styles.ToggleSlider}></span>
                      </label>
                    </div>
                  </>
                )}

                {/* ACCESSIBILITY */}
                {activeSettingsTab === "accessibility" && (
                  <>
                    <h4>Accessibility</h4>
                    <div className={styles.SettingRow}>
                      <div className={styles.SettingText}>
                        <span>Reduce Motion</span>
                        <small>Minimize animations and transitions</small>
                      </div>
                      <label className={styles.ToggleWrapper}>
                        <input
                          type="checkbox"
                          checked={settings.reduceMotion}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              reduceMotion: e.target.checked,
                            })
                          }
                        />
                        <span className={styles.ToggleSlider}></span>
                      </label>
                    </div>
                    <div className={styles.SettingRow}>
                      <div className={styles.SettingText}>
                        <span>High Contrast</span>
                        <small>Improve text visibility</small>
                      </div>
                      <label className={styles.ToggleWrapper}>
                        <input
                          type="checkbox"
                          checked={settings.highContrast}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              highContrast: e.target.checked,
                            })
                          }
                        />
                        <span className={styles.ToggleSlider}></span>
                      </label>
                    </div>
                  </>
                )}

                {/* PRIVACY */}
                {activeSettingsTab === "privacy" && (
                  <>
                    <h4>Privacy</h4>
                    <div className={styles.SettingRow}>
                      <div className={styles.SettingText}>
                        <span>Share Usage Data</span>
                        <small>Help improve LUCA anonymously</small>
                      </div>
                      <label className={styles.ToggleWrapper}>
                        <input
                          type="checkbox"
                          checked={settings.dataSharing}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              dataSharing: e.target.checked,
                            })
                          }
                        />
                        <span className={styles.ToggleSlider}></span>
                      </label>
                    </div>
                    <button className={styles.DangerButton} onClick={() => {
                      if (confirm("Clear all local data? This cannot be undone.")) {
                        localStorage.clear();
                        alert("All data cleared. Refresh to apply.");
                      }
                    }}>
                      🔒 Clear Local Data
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {isHelpOpen && (
        <div
          className={styles.HelpOverlay}
          onClick={() => setIsHelpOpen(false)}
        >
          <div
            className={styles.HelpModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.HelpHeader}>
              <div>
                <h3>Help Center</h3>
                <p>Your guide to using LUCA</p>
              </div>
              <button
                className={styles.HelpCloseBtn}
                onClick={() => setIsHelpOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className={styles.HelpBody}>
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

              <div className={styles.HelpContent}>
                {activeHelpTab === "help" && (
                  <>
                    <h4>Welcome to LUCA</h4>
                    <p className={styles.HelpParagraph}>
                      <strong>Stop stressing. Start understanding.</strong>
                      <br />
                      Tired of re-reading the same things? LUCA simplifies
                      every concept so you learn once and remember forever.
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
                      Thousands of students are using LUCA to feel confident,
                      calm and in control — even before exams.
                    </p>
                  </>
                )}

                {activeHelpTab === "terms" && (
                  <h4>Terms & Policies</h4>
                )}

                {activeHelpTab === "bug" && (
                  <>
                    <h4>Report a Bug</h4>
                    <textarea
                      className={styles.HelpTextarea}
                      placeholder="Describe the issue..."
                    ></textarea>
                    <button className={styles.HelpSubmitBtn}>
                      Submit Report
                    </button>
                  </>
                )}

                {activeHelpTab === "download" && (
                  <>
                    <h4>Download LUCA</h4>
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