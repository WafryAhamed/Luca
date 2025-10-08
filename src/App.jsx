import { useState } from 'react';
import Chat from './components/Chat/Chat';
import styles from './App.module.css';

// Define MESSAGES *before* using it
const MESSAGES = [
  {
    role: "user",
    content: "Hello, who are you?"
  },
  {
    role: "LUCA",
    content: "I'm LUCA, your AI assistant!"
  },
  {
    role: "user",
    content: "What can you do?"
  },
  {
    role: "LUCA",
    content: "I can help answer questions, explain concepts, and chat with you!"
  },
  {
    role: "user",
    content: "That's cool!"
  },
  {
    role: "LUCA",
    content: "Thanks! How can I assist you today?"
  }
];

function App() {
  const [messages, setMessages] = useState(MESSAGES); // No extra array wrapper

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/robot-Luca.svg" alt="LUCA Bot" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;