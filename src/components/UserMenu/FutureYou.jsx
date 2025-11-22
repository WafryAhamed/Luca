import { useEffect, useState } from "react";
import styles from "./UserMenu.module.css";

const STORAGE_KEY = "study_tools_future_you";

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}

function getYesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function FutureYou({ onBack }) {
  const [messages, setMessages] = useState({});
  const [todayMessage, setTodayMessage] = useState("");
  const [yesterdayMessage, setYesterdayMessage] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setMessages(parsed || {});
        const yKey = getYesterdayKey();
        if (parsed[yKey]) {
          setYesterdayMessage(parsed[yKey]);
        }
      }
    } catch (err) {
      console.error("Failed to load FutureYou messages", err);
    }
  }, []);

  const saveTodayMessage = () => {
    const trimmed = todayMessage.trim();
    if (!trimmed) return;
    const key = getTodayKey();
    const updated = { ...messages, [key]: trimmed };
    setMessages(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save FutureYou message", err);
    }
    alert("Saved! Future you will see this tomorrow 💜");
    setTodayMessage("");
  };

  return (
    <div className={styles.ToolPanel}>
      <div className={styles.ToolHeader}>
        <button onClick={onBack} className={styles.BackButton}>
          ←
        </button>
        <h3>Future-You Messages</h3>
      </div>

      <div className={`${styles.GlassCard} ${styles.FutureCard}`}>
        {yesterdayMessage ? (
          <div className={styles.FuturePrev}>
            <div className={styles.FuturePrevLabel}>
              Yesterday, you wrote:
            </div>
            <div>{yesterdayMessage}</div>
          </div>
        ) : (
          <p className={styles.ToolHint}>
            When you write a message today, tomorrow&apos;s you will see it
            here.
          </p>
        )}

        <textarea
          className={`${styles.ToolTextarea} ${styles.FutureInput}`}
          value={todayMessage}
          onChange={(e) => setTodayMessage(e.target.value)}
          placeholder='Write something kind for "Future You"...'
        />

        <button className={styles.ToolButton} onClick={saveTodayMessage}>
          Save Message for Future Me
        </button>
      </div>
    </div>
  );
}
