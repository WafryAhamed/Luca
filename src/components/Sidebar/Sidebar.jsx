import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar({ onNewChat, isOpen: initialOpen = true }) {
  // Simulated data
  const chats = [
    { id: 1, title: "React LUCA Bot Enhanced Features", date: "Today" },
    { id: 2, title: "Types of ISPs Explained", date: "Yesterday" },
    { id: 3, title: "Quadratic Equations Solved", date: "Yesterday" },
    { id: 4, title: "Photosynthesis Summary", date: "Oct 18" },
  ];

  const savedSessions = [
    { id: 101, title: "Algebra Revision Sheet" },
    { id: 102, title: "Biology Exam Notes" },
    { id: 103, title: "Essay: Climate Change" },
  ];

  const groupedChats = chats.reduce((acc, chat) => {
    if (!acc[chat.date]) acc[chat.date] = [];
    acc[chat.date].push(chat);
    return acc;
  }, {});

  const [expanded, setExpanded] = useState({
    history: true,
    saved: true,
    tools: false,
  });

  const toggle = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Mobile sidebar state
  const [isOpen, setIsOpen] = useState(initialOpen);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false); // closed by default on mobile
      } else {
        setIsOpen(true); // always open on desktop
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* ☰ Hamburger menu button (visible only when sidebar closed) */}
      <button
        className={`${styles.MenuButton} ${isOpen ? styles.hidden : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <div className={styles.HamburgerIcon}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Sidebar */}
      <div className={`${styles.Sidebar} ${isOpen ? styles.open : ""}`}>
        {/* ‹ Chevron close button */}
        <button
          className={styles.CloseButton}
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          ‹
        </button>

        <div className={styles.SidebarScrollable}>
          {/* New Chat */}
          <div className={styles.SidebarHeader}>
            <button className={styles.NewChatButton} onClick={onNewChat}>
              + New Chat
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search"
            className={styles.SearchInput}
          />

          {/* History */}
          <div className={styles.NavSection}>
            <button
              className={styles.SectionHeader}
              onClick={() => toggle("history")}
              aria-expanded={expanded.history}
            >
              <span>💬 History</span>
              <span>{expanded.history ? "▲" : "▼"}</span>
            </button>
            {expanded.history && (
              <div className={styles.SectionContent}>
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
            )}
          </div>

          {/* Saved Sessions */}
          <div className={styles.NavSection}>
            <button
              className={styles.SectionHeader}
              onClick={() => toggle("saved")}
              aria-expanded={expanded.saved}
            >
              <span>🔖 Saved Sessions</span>
              <span>{expanded.saved ? "▲" : "▼"}</span>
            </button>
            {expanded.saved && (
              <div className={styles.SectionContent}>
                {savedSessions.map((s) => (
                  <div key={s.id} className={styles.ChatItem}>
                    {s.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Study Tools */}
          <div className={styles.NavSection}>
            <button
              className={styles.SectionHeader}
              onClick={() => toggle("tools")}
              aria-expanded={expanded.tools}
            >
              <span>📚 Study Tools</span>
              <span>{expanded.tools ? "▲" : "▼"}</span>
            </button>
            {expanded.tools && (
              <div className={styles.SectionContent}>
                <div className={styles.ToolItem}>Focus Timer</div>
                <div className={styles.ToolItem}>Notes Saver</div>
                <div className={styles.ToolItem}>Homework Helper</div>
                <div className={styles.ToolItem}>File Manager</div>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className={styles.NavItem}>⚙️ Settings</div>
        </div>

        {/* Footer */}
        <div className={styles.UserFooter}>
          <div className={styles.UserAvatar}>W</div>
          <span>wfy ahmed</span>
        </div>
      </div>
    </>
  );
}
