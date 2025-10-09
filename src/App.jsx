import { useState, useEffect, useRef } from "react";
import { Assistant } from "./assistants/googleai";
import { Chat } from "./components/Chat/Chat";
import Controls from "./components/Controls/Controls";
import styles from "./App.module.css";

function App() {
  const assistant = new Assistant();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function addMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  async function handleContentSend(content) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    addMessage({ content, role: "user", time: timestamp });
    setIsTyping(true);

    try {
      const result = await assistant.chat([...messages, { content, role: "user" }]);
      const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setIsTyping(false);
      addMessage({ content: result, role: "assistant", time: responseTime });
    } catch (error) {
      setIsTyping(false);
      addMessage({
        content: "Sorry, I couldn't process your request. Please try again!",
        role: "assistant",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
        {isTyping && (
          <div className={styles.TypingIndicator}>
            <div className={styles.Dot}></div>
            <div className={styles.Dot}></div>
            <div className={styles.Dot}></div>
            <span>LUCA is thinking...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <Controls onSend={handleContentSend} />
    </div>
  );
}

export default App;
