import styles from './chat.module.css';
export function Chat({ messages }) {
  return (
    <div className ={styles.Chat}>
      {messages.map(({ role, content }, index) => (
        <div key={index} className={style.messages}  data-role={role}>
          {content}
        </div>
      ))}
    </div>
  );
}
