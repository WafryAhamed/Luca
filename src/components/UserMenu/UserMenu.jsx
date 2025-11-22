import { useState, useEffect } from "react";
import styles from "./UserMenu.module.css";

export default function UserMenu({ onClose }) {
  const [activeTool, setActiveTool] = useState(null);

  // Focus Timer state
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [focusSeconds, setFocusSeconds] = useState(0);
  const [isFocusActive, setIsFocusActive] = useState(false);

  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  // Notes state
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Settings state (for ChatGPT-style settings)
  const [settings, setSettings] = useState({
    language: "English",
    region: "Sri Lanka",
    theme: "Dark",
    fontSize: "Medium",
    uiDensity: "Comfortable",
    autoSaveNotes: true,

    notifications: true,
    emailAlerts: false,
    pushNotifications: false,
    soundEffects: true,

    reduceMotion: false,
    highContrast: false,
    largeText: false,

    dataSharing: false,
    analytics: true,
    activityHistory: true,

    betaFeatures: false,
    experimentalUI: false,

    integrationsEnabled: false,

    keyboardHints: true,
  });

  const [activeSettingsTab, setActiveSettingsTab] = useState("general");

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
    setNotes(notes.filter((note) => note.id !== id));
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  // 🔹 SETTINGS PANEL (ChatGPT-style)
  if (activeTool === "settings") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button
            onClick={() => setActiveTool(null)}
            className={styles.BackButton}
          >
            ←
          </button>
          <h3>Settings</h3>
        </div>

        <div className={styles.SettingsLayout}>
          {/* Left sidebar */}
          <div className={styles.SettingsSidebar}>
            {[
              ["general", "General"],
              ["appearance", "Appearance"],
              ["notifications", "Notifications"],
              ["accessibility", "Accessibility"],
              ["privacy", "Privacy & Security"],
              ["data", "Data Controls"],
              ["integrations", "Integrations"],
              ["beta", "Labs / Beta"],
              ["shortcuts", "Shortcuts"],
              ["about", "About"],
              ["account", "Account"],
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

          {/* Right content */}
          <div className={styles.SettingsContent}>
            {/* GENERAL */}
            {activeSettingsTab === "general" && (
              <>
                <h4 className={styles.SettingsSectionTitle}>General</h4>
                <p className={styles.SettingsSectionHint}>
                  Basic preferences for language, region and default behaviour.
                </p>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>Language</span>
                    <span className={styles.SettingSub}>
                      Choose your preferred interface language.
                    </span>
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
                  <div className={styles.SettingLabel}>
                    <span>Region</span>
                    <span className={styles.SettingSub}>
                      Used for date, time and content recommendations.
                    </span>
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
                    <option>Global</option>
                  </select>
                </div>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>Auto save notes</span>
                    <span className={styles.SettingSub}>
                      Automatically keep your notes between sessions.
                    </span>
                  </div>
                  <label className={styles.ToggleSwitch}>
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
                    <span className={styles.ToggleSlider}></span>
                  </label>
                </div>
              </>
            )}

            {/* APPEARANCE */}
            {activeSettingsTab === "appearance" && (
              <>
                <h4 className={styles.SettingsSectionTitle}>Appearance</h4>
                <p className={styles.SettingsSectionHint}>
                  Customize how the interface looks and feels.
                </p>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>Theme</span>
                    <span className={styles.SettingSub}>
                      Switch between light, dark or follow system.
                    </span>
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
                  <div className={styles.SettingLabel}>
                    <span>Font size</span>
                    <span className={styles.SettingSub}>
                      Adjust text size for better readability.
                    </span>
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

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>UI density</span>
                    <span className={styles.SettingSub}>
                      Choose how compact the layout should be.
                    </span>
                  </div>
                  <select
                    className={styles.SettingSelect}
                    value={settings.uiDensity}
                    onChange={(e) =>
                      setSettings({ ...settings, uiDensity: e.target.value })
                    }
                  >
                    <option>Comfortable</option>
                    <option>Compact</option>
                  </select>
                </div>
              </>
            )}

            {/* NOTIFICATIONS */}
            {activeSettingsTab === "notifications" && (
              <>
                <h4 className={styles.SettingsSectionTitle}>Notifications</h4>
                <p className={styles.SettingsSectionHint}>
                  Control reminders, timer alerts and app notifications.
                </p>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>Notifications</span>
                    <span className={styles.SettingSub}>
                      Enable or disable all in-app notifications.
                    </span>
                  </div>
                  <label className={styles.ToggleSwitch}>
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
                    <span className={styles.ToggleSlider}></span>
                  </label>
                </div>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>Push notifications</span>
                    <span className={styles.SettingSub}>
                      Allow your browser / device to send alerts.
                    </span>
                  </div>
                  <label className={styles.ToggleSwitch}>
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
                    <span className={styles.ToggleSlider}></span>
                  </label>
                </div>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>Email summaries</span>
                    <span className={styles.SettingSub}>
                      Receive occasional recap emails (if supported).
                    </span>
                  </div>
                  <label className={styles.ToggleSwitch}>
                    <input
                      type="checkbox"
                      checked={settings.emailAlerts}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          emailAlerts: !settings.emailAlerts,
                        })
                      }
                    />
                    <span className={styles.ToggleSlider}></span>
                  </label>
                </div>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>Sound effects</span>
                    <span className={styles.SettingSub}>
                      Play sounds on timer end or important actions.
                    </span>
                  </div>
                  <label className={styles.ToggleSwitch}>
                    <input
                      type="checkbox"
                      checked={settings.soundEffects}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          soundEffects: !settings.soundEffects,
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
                <h4 className={styles.SettingsSectionTitle}>Accessibility</h4>
                <p className={styles.SettingsSectionHint}>
                  Make the interface easier to see and navigate.
                </p>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>Reduce motion</span>
                    <span className={styles.SettingSub}>
                      Limit animations and transitions.
                    </span>
                  </div>
                  <label className={styles.ToggleSwitch}>
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
                    <span className={styles.ToggleSlider}></span>
                  </label>
                </div>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>High contrast</span>
                    <span className={styles.SettingSub}>
                      Increase contrast between elements.
                    </span>
                  </div>
                  <label className={styles.ToggleSwitch}>
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
                    <span className={styles.ToggleSlider}></span>
                  </label>
                </div>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>Larger text</span>
                    <span className={styles.SettingSub}>
                      Slightly increase text size across the app.
                    </span>
                  </div>
                  <label className={styles.ToggleSwitch}>
                    <input
                      type="checkbox"
                      checked={settings.largeText}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          largeText: !settings.largeText,
                        })
                      }
                    />
                    <span className={styles.ToggleSlider}></span>
                  </label>
                </div>
              </>
            )}

            {/* PRIVACY & SECURITY */}
            {activeSettingsTab === "privacy" && (
              <>
                <h4 className={styles.SettingsSectionTitle}>
                  Privacy & Security
                </h4>
                <p className={styles.SettingsSectionHint}>
                  Control how your data is stored and used.
                </p>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>Data sharing</span>
                    <span className={styles.SettingSub}>
                      Allow anonymized usage to improve the experience.
                    </span>
                  </div>
                  <label className={styles.ToggleSwitch}>
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
                    <span className={styles.ToggleSlider}></span>
                  </label>
                </div>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>Usage analytics</span>
                    <span className={styles.SettingSub}>
                      Collect aggregate statistics to improve tools.
                    </span>
                  </div>
                  <label className={styles.ToggleSwitch}>
                    <input
                      type="checkbox"
                      checked={settings.analytics}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          analytics: !settings.analytics,
                        })
                      }
                    />
                    <span className={styles.ToggleSlider}></span>
                  </label>
                </div>

                <div className={styles.DangerZone}>
                  <div className={styles.DangerTitle}>Danger zone</div>
                  <button className={styles.DangerButton}>
                    Clear all local data
                  </button>
                </div>
              </>
            )}

            {/* DATA CONTROLS */}
            {activeSettingsTab === "data" && (
              <>
                <h4 className={styles.SettingsSectionTitle}>Data Controls</h4>
                <p className={styles.SettingsSectionHint}>
                  Manage stored notes, timers and usage history locally.
                </p>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>Activity history</span>
                    <span className={styles.SettingSub}>
                      Keep track of your session usage locally.
                    </span>
                  </div>
                  <label className={styles.ToggleSwitch}>
                    <input
                      type="checkbox"
                      checked={settings.activityHistory}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          activityHistory: !settings.activityHistory,
                        })
                      }
                    />
                    <span className={styles.ToggleSlider}></span>
                  </label>
                </div>

                <button className={styles.SecondaryButton}>
                  Export my data
                </button>
              </>
            )}

            {/* INTEGRATIONS */}
            {activeSettingsTab === "integrations" && (
              <>
                <h4 className={styles.SettingsSectionTitle}>Integrations</h4>
                <p className={styles.SettingsSectionHint}>
                  Connect with external tools (future expansion).
                </p>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>Enable integrations</span>
                    <span className={styles.SettingSub}>
                      Allow connecting to other apps or services.
                    </span>
                  </div>
                  <label className={styles.ToggleSwitch}>
                    <input
                      type="checkbox"
                      checked={settings.integrationsEnabled}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          integrationsEnabled: !settings.integrationsEnabled,
                        })
                      }
                    />
                    <span className={styles.ToggleSlider}></span>
                  </label>
                </div>

                <p className={styles.SettingsSectionHint}>
                  No external integrations configured yet.
                </p>
              </>
            )}

            {/* BETA / LABS */}
            {activeSettingsTab === "beta" && (
              <>
                <h4 className={styles.SettingsSectionTitle}>
                  Labs & Beta Features
                </h4>
                <p className={styles.SettingsSectionHint}>
                  Try experimental ideas that may change or be removed.
                </p>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>Enable beta features</span>
                    <span className={styles.SettingSub}>
                      Access upcoming tools early (may be unstable).
                    </span>
                  </div>
                  <label className={styles.ToggleSwitch}>
                    <input
                      type="checkbox"
                      checked={settings.betaFeatures}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          betaFeatures: !settings.betaFeatures,
                        })
                      }
                    />
                    <span className={styles.ToggleSlider}></span>
                  </label>
                </div>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>Experimental UI</span>
                    <span className={styles.SettingSub}>
                      Try new layouts and visuals when available.
                    </span>
                  </div>
                  <label className={styles.ToggleSwitch}>
                    <input
                      type="checkbox"
                      checked={settings.experimentalUI}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          experimentalUI: !settings.experimentalUI,
                        })
                      }
                    />
                    <span className={styles.ToggleSlider}></span>
                  </label>
                </div>
              </>
            )}

            {/* KEYBOARD SHORTCUTS */}
            {activeSettingsTab === "shortcuts" && (
              <>
                <h4 className={styles.SettingsSectionTitle}>
                  Keyboard Shortcuts
                </h4>
                <p className={styles.SettingsSectionHint}>
                  Quickly access tools using the keyboard.
                </p>

                <div className={styles.SettingRow}>
                  <div className={styles.SettingLabel}>
                    <span>Show hints</span>
                    <span className={styles.SettingSub}>
                      Display shortcut hints in the interface.
                    </span>
                  </div>
                  <label className={styles.ToggleSwitch}>
                    <input
                      type="checkbox"
                      checked={settings.keyboardHints}
                      onChange={() =>
                        setSettings({
                          ...settings,
                          keyboardHints: !settings.keyboardHints,
                        })
                      }
                    />
                    <span className={styles.ToggleSlider}></span>
                  </label>
                </div>

                <div className={styles.ShortcutList}>
                  <div className={styles.ShortcutItem}>
                    <span>Open menu</span>
                    <span>Ctrl / Cmd + M</span>
                  </div>
                  <div className={styles.ShortcutItem}>
                    <span>Focus timer</span>
                    <span>Ctrl / Cmd + 1</span>
                  </div>
                  <div className={styles.ShortcutItem}>
                    <span>Stopwatch</span>
                    <span>Ctrl / Cmd + 2</span>
                  </div>
                  <div className={styles.ShortcutItem}>
                    <span>Notes</span>
                    <span>Ctrl / Cmd + 3</span>
                  </div>
                </div>
              </>
            )}

            {/* ABOUT */}
            {activeSettingsTab === "about" && (
              <>
                <h4 className={styles.SettingsSectionTitle}>About</h4>
                <p className={styles.SettingsSectionHint}>
                  Version, credits and a small reminder that you’re doing great.
                </p>

                <div className={styles.AboutBlock}>
                  <div>Study Tools Panel</div>
                  <div className={styles.AboutSub}>Version 1.0.0</div>
                  <div className={styles.AboutSub}>
                    Designed for focus, reflection and gentle productivity.
                  </div>
                </div>
              </>
            )}

            {/* ACCOUNT */}
            {activeSettingsTab === "account" && (
              <>
                <h4 className={styles.SettingsSectionTitle}>Account</h4>
                <p className={styles.SettingsSectionHint}>
                  Basic account-related actions for this device.
                </p>

                <div className={styles.AboutBlock}>
                  <div>Signed in (local user)</div>
                  <div className={styles.AboutSub}>
                    This panel currently stores everything only in your browser.
                  </div>
                </div>

                <button
                  className={styles.SecondaryButton}
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("user");
                    alert("Logged out!");
                    onClose();
                  }}
                >
                  Log out from this device
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 🔹 Focus Timer
  if (activeTool === "focus") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button
            onClick={() => setActiveTool(null)}
            className={styles.BackButton}
          >
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
          <p className={styles.ToolHint}>
            Stay focused for 25 minutes, then take a short break 🌿
          </p>
        </div>
      </div>
    );
  }

  // 🔹 Stopwatch
  if (activeTool === "stopwatch") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button
            onClick={() => setActiveTool(null)}
            className={styles.BackButton}
          >
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

  // 🔹 Notes Saver
  if (activeTool === "notes") {
    return (
      <div className={styles.ToolPanel}>
        <div className={styles.ToolHeader}>
          <button
            onClick={() => setActiveTool(null)}
            className={styles.BackButton}
          >
            ←
          </button>
          <h3>Notes Saver</h3>
        </div>
        <div className={styles.GlassCard}>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note here..."
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
            <p className={styles.ToolHint}>No notes yet — start writing!</p>
          )}
        </div>
      </div>
    );
  }

  // 🔹 Main Menu
  return (
    <div className={styles.UserMenu}>
      <div
        className={styles.UserMenuItem}
        onClick={() => setActiveTool("settings")}
      >
        ⚙️ Settings
      </div>
      <div className={styles.UserMenuItem} onClick={onClose}>
        Help
      </div>
      <div className={styles.Divider}></div>
      <div className={styles.ToolSection}>Tools</div>
      <div
        className={styles.UserMenuItem}
        onClick={() => setActiveTool("focus")}
      >
        ⏱️ Focus Timer
      </div>
      <div
        className={styles.UserMenuItem}
        onClick={() => setActiveTool("stopwatch")}
      >
        🕒 Stopwatch
      </div>
      <div
        className={styles.UserMenuItem}
        onClick={() => setActiveTool("notes")}
      >
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
  );
}
