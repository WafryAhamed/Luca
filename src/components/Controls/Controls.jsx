import { useState } from 'react'; 
import styles from './Controls.module.css';

export default function Controls({ onSend }) {
  const [content, setContent] = useState("");
  
  function handleContentChange(event) {
    setContent(event.target.value);
  }

  // ✅ Renamed: this function SENDS the message
  function handleSend() { 
    if (content.trim().length > 0) {
      onSend(content);
      setContent("");
    }
  }

  // ✅ Renamed: this handles Enter key
  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend(); // ✅ calls the send function
    }
  }

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <textarea
          className={styles.TextArea}
          placeholder="Talk with Luca"
          value={content}
          onChange={handleContentChange} 
          onKeyDown={handleKeyDown}  // ✅ use key handler here
        />
      </div>
      <button
        className={styles.Button}
        onClick={handleSend}  // ✅ use send function here
        type="button"
      >
        <SendIcon />
      </button>
    </div>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#5f6368"
    >
      <path d="M120-120v-720l720 360-720 360Z" />
    </svg>
  );
}