import { useState } from "react";
import styles from "./UserMenu.module.css";

import FocusTimer from "./FocusTimer.jsx";
import Pomodoro from "./Pomodoro.jsx";
import Stopwatch from "./Stopwatch.jsx";
import Tasks from "./Tasks.jsx";
import Notebook from "./Notebook.jsx";
import MoodAssistant from "./MoodAssistant.jsx";
import FutureYou from "./FutureYou.jsx";
import Toolbar from "./Toolbar.jsx";
import SettingsPanel from "./Settings.jsx";

export default function UserMenu({ onClose }) {
  const [activeTool, setActiveTool] = useState(null);
  const [activeSettingsTab, setActiveSettingsTab] = useState("general");

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

  const [currentMood, setCurrentMood] = useState("calm");
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [quickNoteDraft, setQuickNoteDraft] = useState("");

  const handleOpenTool = (toolKey) => {
    setActiveTool(toolKey);
  };

  const handleBackToMenu = () => {
    setActiveTool(null);
  };

  const moodLabelMap = {
    motivated: "Motivated",
    calm: "Calm",
    tired: "Tired",
    stressed: "Stressed",
    bored: "Bored",
  };

  const renderTool = () => {
    if (activeTool === "settings") {
      return (
        <SettingsPanel
          settings={settings}
          setSettings={setSettings}
          activeSettingsTab={activeSettingsTab}
          setActiveSettingsTab={setActiveSettingsTab}
          onBack={handleBackToMenu}
        />
      );
    }

    if (activeTool === "focus") {
      return <FocusTimer onBack={handleBackToMenu} />;
    }

    if (activeTool === "stopwatch") {
      return <Stopwatch onBack={handleBackToMenu} />;
    }

    if (activeTool === "pomodoro") {
      return (
        <Pomodoro
          onBack={handleBackToMenu}
          onEnableFocusMode={() => setIsFocusMode(true)}
        />
      );
    }

    if (activeTool === "tasks") {
      return <Tasks onBack={handleBackToMenu} />;
    }

    if (activeTool === "notebook") {
      return (
        <Notebook
          onBack={handleBackToMenu}
          autoSaveNotes={settings.autoSaveNotes}
          quickNoteDraft={quickNoteDraft}
          setQuickNoteDraft={setQuickNoteDraft}
        />
      );
    }

    if (activeTool === "mood") {
      return (
        <MoodAssistant
          onBack={handleBackToMenu}
          currentMood={currentMood}
          setCurrentMood={setCurrentMood}
          onEnableFocusMode={() => setIsFocusMode(true)}
        />
      );
    }

    if (activeTool === "futureYou") {
      return <FutureYou onBack={handleBackToMenu} />;
    }

    // MAIN MENU (existing flow, extended with new tools)
    return (
      <div className={styles.UserMenu}>
        <div
          className={styles.UserMenuItem}
          onClick={() => handleOpenTool("settings")}
        >
          Settings
          {currentMood && (
            <span className={styles.MoodBadgeChip}>
              {moodLabelMap[currentMood] || "Calm"}
            </span>
          )}
        </div>

        <div className={styles.UserMenuItem} onClick={onClose}>
          Help
        </div>

        <div className={styles.Divider}></div>

        <div className={styles.ToolSection}>Tools</div>

        <div
          className={styles.UserMenuItem}
          onClick={() => handleOpenTool("focus")}
        >
          ⏱️ Focus Timer
        </div>

        <div
          className={styles.UserMenuItem}
          onClick={() => handleOpenTool("stopwatch")}
        >
          🕒 Stopwatch
        </div>

        <div
          className={styles.UserMenuItem}
          onClick={() => handleOpenTool("pomodoro")}
        >
          ⏳ Pomodoro Mode
        </div>

        <div
          className={styles.UserMenuItem}
          onClick={() => handleOpenTool("tasks")}
        >
          ✅ Task Checklist
        </div>

        <div
          className={styles.UserMenuItem}
          onClick={() => handleOpenTool("notebook")}
        >
          📝 Notebook & Notes
        </div>

        <div
          className={styles.UserMenuItem}
          onClick={() => handleOpenTool("mood")}
        >
          💚 Mood Assistant
        </div>

        <div
          className={styles.UserMenuItem}
          onClick={() => handleOpenTool("futureYou")}
        >
          🌟 Future-You Messages
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
  };

  return (
    <>
      {/* Focus Mode Overlay */}
      <div
        className={`${styles.FocusOverlay} ${
          isFocusMode ? styles.FocusOverlayActive : ""
        }`}
      >
        {isFocusMode && (
          <div className={styles.FocusOverlayInner}>
            <div className={styles.FocusOverlayTitle}>Focus Mode On</div>
            <div className={styles.FocusOverlayText}>
              Distractions dimmed. Put your phone away, breathe, and give this
              session your full attention. You’ve got this. 💜
            </div>
            <button
              className={styles.FocusOverlayButton}
              onClick={() => setIsFocusMode(false)}
            >
              Exit Focus Mode
            </button>
          </div>
        )}
      </div>

      {/* Mini Floating Toolbar (always available) */}
      <Toolbar
        onOpenFocus={() => handleOpenTool("focus")}
        onOpenStopwatch={() => handleOpenTool("stopwatch")}
        onOpenNotebook={() => handleOpenTool("notebook")}
        onQuickNote={() => {
          setQuickNoteDraft("");
          handleOpenTool("notebook");
        }}
      />

      {/* Main menu / tools */}
      {renderTool()}
    </>
  );
}
