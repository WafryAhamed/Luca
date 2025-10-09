import { useState } from "react";
import { Assistant } from "./assistants/googleai";
import { Chat } from "./components/Chat/Chat";
import Controls from "./components/Controls/Controls";
import styles from "./App.module.css";

function App() {
  const assistant = new Assistant();
  const [messages, setMessages] = useState([]);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    addMessage({ content, role: "user" });
    try {
      // Pass current messages (which now includes the new user message)
      const result = await assistant.chat(messages);
      addMessage({ content: result, role: "assistant" });
    } catch (error) {
      addMessage({
        content: "Sorry, I couldn't process your request. Please try again!",
        role: "assistant", // ✅ Changed from "system" to "assistant"
      });
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="/robot-Luca.svg" alt="LUCA Bot" />
        <h2 className={styles.Title}>LUCA</h2>
      </header>
      <div className={styles.ChatContainer}>
        <Chat messages={messages} />
      </div>
      <Controls onSend={handleContentSend} />
    </div>
  );
}

export default App;