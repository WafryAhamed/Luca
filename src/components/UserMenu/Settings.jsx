import styles from "./UserMenu.module.css";

export default function SettingsPanel({
  settings,
  setSettings,
  activeSettingsTab,
  setActiveSettingsTab,
  onBack,
}) {
  return (
    <div className={styles.ToolPanel}>
      {/* Header */}
      <div className={styles.ToolHeader}>
        <button onClick={onBack} className={styles.BackButton}>
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

              <button className={styles.DangerButton}>Export My Data</button>

              <button className={styles.DangerButton}>Delete All Data</button>
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

              <button className={styles.DangerButton}>Log Out</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
