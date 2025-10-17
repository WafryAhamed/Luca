// components/Sidebar/Sidebar.jsx
import styles from "./Sidebar.module.css";

export default function Sidebar({ onNewChat }) {
  const chats = [
    { id: 1, title: "React LUCA Bot Enhanced Features", date: "Today" },
    { id: 2, title: "Types of ISPs Explained", date: "Yesterday" },
    // ... your chats
  ];

  const groupedChats = chats.reduce((acc, chat) => {
    if (!acc[chat.date]) acc[chat.date] = [];
    acc[chat.date].push(chat);
    return acc;
  }, {});

  return (
    <div className={styles.Sidebar}>
      <div className={styles.SidebarScrollable}>
        <div className={styles.SidebarHeader}>
          <button className={styles.NewChatButton} onClick={onNewChat}>
            + New Chat
          </button>
        </div>
        <input
          type="text"
          placeholder="Search"
          className={styles.SearchInput}
        />
        <div className={styles.ChatListSection}>All chats</div>
        {Object.keys(groupedChats).map((date) => (
          <div key={date}>
            <div className={styles.ChatListSection}>{date}</div>
            {groupedChats[date].map((chat) => (
              <div key={chat.id} className={styles.ChatItem}>
                {chat.title}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* This stays fixed at bottom */}
      <div className={styles.UserFooter}>
        <div className={styles.UserAvatar}>W</div>
        <span>wfy ahmed</span>
      </div>
    </div>
  );
}