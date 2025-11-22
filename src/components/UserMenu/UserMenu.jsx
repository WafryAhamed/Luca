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
import DraggableWindow from "./DraggableWindow.jsx";

export default function UserMenu({ onClose }) {
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

  const [windowState, setWindowState] = useState({
    settings: { open: false, minimized: false },
    focus: { open: false, minimized: false },
    stopwatch: { open: false, minimized: false },
    pomodoro: { open: false, minimized: false },
    tasks: { open: false, minimized: false },
    notebook: { open: false, minimized: false },
    mood: { open: false, minimized: false },
    futureYou: { open: false, minimized: false },
  });

  const [topWindowId, setTopWindowId] = useState(null);

  const moodLabelMap = {
    motivated: "Motivated",
    calm: "Calm",
    tired: "Tired",
    stressed: "Stressed",
    bored: "Bored",
  };

  const openWindow = (key) => {
    setWindowState((prev) => ({
      ...prev,
      [key]: { open: true, minimized: false },
    }));
    setTopWindowId(key);
  };

  const closeWindow = (key) => {
    setWindowState((prev) => ({
      ...prev,
      [key]: { ...prev[key], open: false },
    }));
  };

  const toggleMinimizeWindow = (key) => {
    setWindowState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        minimized: !prev[key].minimized,
      },
    }));
  };

  const handleFocusWindow = (key) => {
    setTopWindowId(key);
  };

  const handleEnableFocusMode = () => {
    setIsFocusMode(true);
  };

  const renderMainMenu = () => {
    return (
      <div className={styles.UserMenu}>
        <div
          className={styles.UserMenuItem}
          onClick={() => openWindow("settings")}
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
          onClick={() => openWindow("focus")}
        >
          ⏱️ Focus Timer
        </div>

        <div
          className={styles.UserMenuItem}
          onClick={() => openWindow("stopwatch")}
        >
          🕒 Stopwatch
        </div>

        <div
          className={styles.UserMenuItem}
          onClick={() => openWindow("pomodoro")}
        >
          ⏳ Pomodoro Mode
        </div>

        <div
          className={styles.UserMenuItem}
          onClick={() => openWindow("tasks")}
        >
          ✅ Task Checklist
        </div>

        <div
          className={styles.UserMenuItem}
          onClick={() => openWindow("notebook")}
        >
          📝 Notebook & Notes
        </div>

        <div
          className={styles.UserMenuItem}
          onClick={() => openWindow("mood")}
        >
          💚 Mood Assistant
        </div>

        <div
          className={styles.UserMenuItem}
          onClick={() => openWindow("futureYou")}
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

      {/* Pinned bottom toolbar (widgets style) */}
      <Toolbar
        onOpenFocus={() => openWindow("focus")}
        onOpenStopwatch={() => openWindow("stopwatch")}
        onOpenNotebook={() => openWindow("notebook")}
        onQuickNote={() => {
          setQuickNoteDraft("");
          openWindow("notebook");
        }}
      />

      {/* Left / base main menu */}
      {renderMainMenu()}

      {/* Floating windows layer */}
      <div className={styles.WindowLayer}>
        {/* Settings */}
        {windowState.settings.open && (
          <DraggableWindow
            title="Settings"
            initialX={30}
            initialY={60}
            isMinimized={windowState.settings.minimized}
            isOnTop={topWindowId === "settings"}
            onClose={() => closeWindow("settings")}
            onToggleMinimize={() => toggleMinimizeWindow("settings")}
            onFocus={() => handleFocusWindow("settings")}
          >
            <SettingsPanel
              settings={settings}
              setSettings={setSettings}
              activeSettingsTab={activeSettingsTab}
              setActiveSettingsTab={setActiveSettingsTab}
              onBack={() => closeWindow("settings")}
            />
          </DraggableWindow>
        )}

        {/* Focus Timer */}
        {windowState.focus.open && (
          <DraggableWindow
            title="Focus Timer"
            initialX={40}
            initialY={140}
            isMinimized={windowState.focus.minimized}
            isOnTop={topWindowId === "focus"}
            onClose={() => closeWindow("focus")}
            onToggleMinimize={() => toggleMinimizeWindow("focus")}
            onFocus={() => handleFocusWindow("focus")}
          >
            <FocusTimer onBack={() => closeWindow("focus")} />
          </DraggableWindow>
        )}

        {/* Stopwatch */}
        {windowState.stopwatch.open && (
          <DraggableWindow
            title="Stopwatch"
            initialX={60}
            initialY={200}
            isMinimized={windowState.stopwatch.minimized}
            isOnTop={topWindowId === "stopwatch"}
            onClose={() => closeWindow("stopwatch")}
            onToggleMinimize={() => toggleMinimizeWindow("stopwatch")}
            onFocus={() => handleFocusWindow("stopwatch")}
          >
            <Stopwatch onBack={() => closeWindow("stopwatch")} />
          </DraggableWindow>
        )}

        {/* Pomodoro */}
        {windowState.pomodoro.open && (
          <DraggableWindow
            title="Pomodoro Mode"
            initialX={80}
            initialY={110}
            isMinimized={windowState.pomodoro.minimized}
            isOnTop={topWindowId === "pomodoro"}
            onClose={() => closeWindow("pomodoro")}
            onToggleMinimize={() => toggleMinimizeWindow("pomodoro")}
            onFocus={() => handleFocusWindow("pomodoro")}
          >
            <Pomodoro
              onBack={() => closeWindow("pomodoro")}
              onEnableFocusMode={handleEnableFocusMode}
            />
          </DraggableWindow>
        )}

        {/* Tasks */}
        {windowState.tasks.open && (
          <DraggableWindow
            title="Task Checklist"
            initialX={90}
            initialY={180}
            isMinimized={windowState.tasks.minimized}
            isOnTop={topWindowId === "tasks"}
            onClose={() => closeWindow("tasks")}
            onToggleMinimize={() => toggleMinimizeWindow("tasks")}
            onFocus={() => handleFocusWindow("tasks")}
          >
            <Tasks onBack={() => closeWindow("tasks")} />
          </DraggableWindow>
        )}

        {/* Notebook */}
        {windowState.notebook.open && (
          <DraggableWindow
            title="Notebook & Notes"
            initialX={50}
            initialY={90}
            isMinimized={windowState.notebook.minimized}
            isOnTop={topWindowId === "notebook"}
            onClose={() => closeWindow("notebook")}
            onToggleMinimize={() => toggleMinimizeWindow("notebook")}
            onFocus={() => handleFocusWindow("notebook")}
          >
            <Notebook
              onBack={() => closeWindow("notebook")}
              autoSaveNotes={settings.autoSaveNotes}
              quickNoteDraft={quickNoteDraft}
              setQuickNoteDraft={setQuickNoteDraft}
            />
          </DraggableWindow>
        )}

        {/* Mood Assistant */}
        {windowState.mood.open && (
          <DraggableWindow
            title="Mood Assistant"
            initialX={70}
            initialY={230}
            isMinimized={windowState.mood.minimized}
            isOnTop={topWindowId === "mood"}
            onClose={() => closeWindow("mood")}
            onToggleMinimize={() => toggleMinimizeWindow("mood")}
            onFocus={() => handleFocusWindow("mood")}
          >
            <MoodAssistant
              onBack={() => closeWindow("mood")}
              currentMood={currentMood}
              setCurrentMood={setCurrentMood}
              onEnableFocusMode={handleEnableFocusMode}
            />
          </DraggableWindow>
        )}

        {/* Future You */}
        {windowState.futureYou.open && (
          <DraggableWindow
            title="Future-You Messages"
            initialX={40}
            initialY={260}
            isMinimized={windowState.futureYou.minimized}
            isOnTop={topWindowId === "futureYou"}
            onClose={() => closeWindow("futureYou")}
            onToggleMinimize={() => toggleMinimizeWindow("futureYou")}
            onFocus={() => handleFocusWindow("futureYou")}
          >
            <FutureYou onBack={() => closeWindow("futureYou")} />
          </DraggableWindow>
        )}
      </div>
    </>
  );
}
