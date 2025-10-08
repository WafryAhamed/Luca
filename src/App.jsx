
import { useState } from 'react';
import Chat from './components/chat/chat';
import styles from './App.module.css';


function App() {
  const[messages, setMessages] = useState([]);
  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/robot-Luca.svg" />
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;