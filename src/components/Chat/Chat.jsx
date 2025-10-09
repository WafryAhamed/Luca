import styles from "./Chat.module.css";

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Hello! How can I assist you right now?",
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export function Chat({ messages }) {
  return (
    <div className={styles.Chat}>
      {[WELCOME_MESSAGE, ...messages].map(({ role, content, time }, index) => (
        <div key={index} className={`${styles.Message} ${styles[role]}`}>
          <div className={styles.Bubble}>{content}</div>
          <span className={styles.Time}>{time}</span>
        </div>
      ))}
    </div>
  );
}
