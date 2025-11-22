import styles from "./UserMenu.module.css";

const MOOD_CONFIG = {
  motivated: {
    label: "🟩 Motivated",
    message:
      "You’re on fire today. Stack your hardest tasks first while this energy is high.",
    tip: "Try a 45-minute deep focus block followed by a strong 10-minute break.",
  },
  calm: {
    label: "🟦 Calm",
    message:
      "Nice, you’re in a steady state. Perfect for consistent, distraction-free studying.",
    tip: "Use a classic 25/5 Pomodoro and keep notifications silent.",
  },
  tired: {
    label: "🟨 Tired",
    message:
      "You’re low on energy — and that’s okay. Let’s choose lighter tasks and shorter focus blocks.",
    tip: "Try 15 minutes of gentle focus + a short walk or stretch break.",
  },
  stressed: {
    label: "🟥 Stressed",
    message:
      "Your brain is overloaded. Don’t push harder – let’s work smarter and slower.",
    tip: "Do a 10-minute focus sprint on one tiny task, then breathe and step away.",
  },
  bored: {
    label: "🟪 Bored",
    message:
      "Boredom = your brain begging for novelty. Let’s change the way you study, not just what.",
    tip: "Switch subjects, use active recall, or turn reading into mini quizzes.",
  },
};

const MOOD_KEYS = Object.keys(MOOD_CONFIG);

export default function MoodAssistant({
  onBack,
  currentMood,
  setCurrentMood,
  onEnableFocusMode,
}) {
  const selected = MOOD_CONFIG[currentMood] || MOOD_CONFIG.calm;

  return (
    <div className={styles.ToolPanel}>
      <div className={styles.ToolHeader}>
        <button onClick={onBack} className={styles.BackButton}>
          ←
        </button>
        <h3>Mood Assistant</h3>
      </div>

      <div className={styles.GlassCard}>
        <p className={styles.ToolHint}>
          How are you feeling right now? I’ll adapt your study vibe.
        </p>

        <div className={styles.MoodGrid}>
          {MOOD_KEYS.map((key) => {
            const mood = MOOD_CONFIG[key];
            const isActive = key === currentMood;
            return (
              <button
                key={key}
                className={`${styles.MoodBadge} ${
                  isActive ? styles.MoodBadgeActive : ""
                }`}
                onClick={() => setCurrentMood(key)}
              >
                <span>{mood.label}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.MoodMessage}>
          {selected.message}
          <div className={styles.MoodSub}>{selected.tip}</div>
        </div>

        <div className={styles.ToolButtons}>
          <button
            className={styles.ToolButton}
            onClick={onEnableFocusMode}
          >
            Turn On Focus Mode
          </button>
        </div>
      </div>
    </div>
  );
}
