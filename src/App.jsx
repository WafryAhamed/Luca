import { useState } from 'react';
import Chat from './components/Chat/Chat';
import Controls from './components/Controls/Controls';
import styles from './App.module.css';


/*const MESSAGES = [
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
]; */

function App() {
  const [messages, setMessages] = useState([]);

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/robot-Luca.svg" alt="LUCA Bot" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls />
    </div>
  );
}

export default App;