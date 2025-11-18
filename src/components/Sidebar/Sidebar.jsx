import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";

export default function Sidebar({ onNewChat, isOpen: initialOpen = true }) {
  // -----------------------------
  // 🗂 Chat History (localStorage)
  // -----------------------------
  const [chats, setChats] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("chatHistory", JSON.stringify(chats));
  }, [chats]);

  // Add new chat
  const addChat = () => {
    const newChat = {
      id: Date.now(),
      title: `New Chat ${chats.length + 1}`,
      date: new Date().toISOString(),
    };
    setChats((prev) => [newChat, ...prev]);
    onNewChat?.();
  };

  // -----------------------------
  // 🔍 Real-time Search
  // -----------------------------
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // -----------------------------
  // ✏️ Rename + 🗑 Delete Chat
  // -----------------------------
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingChatTitle, setEditingChatTitle] = useState("");

  const startEditingChat = (chat) => {
    setEditingChatId(chat.id);
    setEditingChatTitle(chat.title);
  };

  const saveEditingChat = () => {
    if (!editingChatTitle.trim()) return;
    setChats((prev) =>
      prev.map((c) =>
        c.id === editingChatId ? { ...c, title: editingChatTitle.trim() } : c
      )
    );
    setEditingChatId(null);
    setEditingChatTitle("");
  };

  const cancelEditingChat = () => {
    setEditingChatId(null);
    setEditingChatTitle("");
  };

  const deleteChat = (id) => {
    setChats((prev) => prev.filter((c) => c.id !== id));
  };

  // -----------------------------
  // 🕒 Date Formatting + Grouping
  // -----------------------------
  const formatDate = (iso) => {
    const date = new Date(iso);
    const today = new Date();

    const isToday = date.toDateString() === today.toDateString();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const groupedChats = filteredChats.reduce((acc, chat) => {
    const formatted = formatDate(chat.date);
    if (!acc[formatted]) acc[formatted] = [];
    acc[formatted].push(chat);
    return acc;
  }, {});

  // -----------------------------
  // 🔖 Saved Sessions (static)
  // -----------------------------
  const savedSessions = [
    { id: 101, title: "Algebra Revision Sheet" },
    { id: 102, title: "Biology Exam Notes" },
    { id: 103, title: "Essay: Climate Change" },
  ];

  // -----------------------------
  // 📚 Notes Saver (localStorage)
  // -----------------------------
  const [notes, setNotes] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("notesSaver");
    return saved ? JSON.parse(saved) : [];
  });

  const [noteText, setNoteText] = useState("");
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("notesSaver", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!noteText.trim()) return;
    const newNote = {
      id: Date.now(),
      text: noteText.trim(),
      date: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setNoteText("");
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const startEditingNote = (note) => {
    setEditingNoteId(note.id);
    setEditingNoteText(note.text);
  };

  const saveEditingNote = () => {
    if (!editingNoteText.trim()) return;
    setNotes((prev) =>
      prev.map((n) =>
        n.id === editingNoteId ? { ...n, text: editingNoteText.trim() } : n
      )
    );
    setEditingNoteId(null);
    setEditingNoteText("");
  };

  const cancelEditingNote = () => {
    setEditingNoteId(null);
    setEditingNoteText("");
  };

  // -----------------------------
  // ⚙️ Settings Modal + Theme
  // -----------------------------
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const getSystemTheme = () => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  const [themePreference, setThemePreference] = useState(() => {
    if (typeof window === "undefined") return "system";
    return localStorage.getItem("themePreference") || "system";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    if (media.addEventListener) {
      media.addEventListener("change", handler);
    } else {
      media.addListener(handler); // older browsers
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", handler);
      } else {
        media.removeListener(handler);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("themePreference", themePreference);
  }, [themePreference]);

  const effectiveTheme =
    themePreference === "system" ? systemTheme : themePreference;

  const sidebarThemeClass =
    effectiveTheme === "dark" ? styles.SidebarDark : styles.SidebarLight;

  const handleThemeChange = (value) => {
    setThemePreference(value);
  };

  const resetChats = () => {
    setChats([]);
  };

  const resetNotes = () => {
    setNotes([]);
  };

  const clearAllData = () => {
    if (typeof window === "undefined") return;
    localStorage.clear();
    setChats([]);
    setNotes([]);
    setThemePreference("system");
  };

  // -----------------------------
  // ⏹ Expand/Collapse Sections
  // -----------------------------
  const [expanded, setExpanded] = useState({
    history: true,
    saved: true,
    tools: false,
  });

  const toggle = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // -----------------------------
  // 📱 Mobile Sidebar Open/Close
  // -----------------------------
  const [isOpen, setIsOpen] = useState(initialOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // -----------------------------
  // JSX
  // -----------------------------
  return (
    <>
      {/* Hamburger Button */}
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
      <div
        className={`${styles.Sidebar} ${isOpen ? styles.open : ""} ${sidebarThemeClass}`}
      >
        {/* Close Button */}
        <button
          className={styles.CloseButton}
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          ‹
        </button>

        <div className={styles.SidebarScrollable}>
          {/* New Chat Button */}
          <div className={styles.SidebarHeader}>
            <button className={styles.NewChatButton} onClick={addChat}>
              + New Chat
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search"
            className={styles.SearchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

                {Object.keys(groupedChats).length === 0 && (
                  <div className={styles.EmptyText}>
                    No chats yet. Start one with <strong>+ New Chat</strong>.
                  </div>
                )}

                {Object.keys(groupedChats).map((date) => (
                  <div key={date}>
                    <div className={styles.ChatListSection}>{date}</div>
                    {groupedChats[date].map((chat) => (
                      <div key={chat.id} className={styles.ChatItem}>
                        {editingChatId === chat.id ? (
                          <div className={styles.ChatItemInner}>
                            <input
                              className={styles.ChatTitleInput}
                              value={editingChatTitle}
                              onChange={(e) =>
                                setEditingChatTitle(e.target.value)
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") saveEditingChat();
                                if (e.key === "Escape") cancelEditingChat();
                              }}
                              autoFocus
                            />
                            <div className={styles.ChatActions}>
                              <button
                                className={styles.IconButton}
                                onClick={saveEditingChat}
                                title="Save"
                              >
                                ✔
                              </button>
                              <button
                                className={styles.IconButton}
                                onClick={cancelEditingChat}
                                title="Cancel"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className={styles.ChatItemInner}>
                            <div className={styles.ChatTitle}>
                              {chat.title}
                            </div>
                            <div className={styles.ChatActions}>
                              <button
                                className={styles.IconButton}
                                onClick={() => startEditingChat(chat)}
                                title="Rename chat"
                              >
                                ✏️
                              </button>
                              <button
                                className={styles.IconButton}
                                onClick={() => deleteChat(chat.id)}
                                title="Delete chat"
                              >
                                🗑
                              </button>
                            </div>
                          </div>
                        )}
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

                {/* Notes Saver toggle */}
                <div
                  className={styles.ToolItem}
                  onClick={() => setNotesExpanded((prev) => !prev)}
                >
                  Notes Saver {notesExpanded ? "▲" : "▼"}
                </div>

                {notesExpanded && (
                  <div className={styles.NotesPanel}>
                    <textarea
                      className={styles.NotesTextarea}
                      placeholder="Write your note here..."
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                    />
                    <button className={styles.AddNoteButton} onClick={addNote}>
                      Add Note
                    </button>

                    {notes.length === 0 ? (
                      <div className={styles.EmptyText}>
                        No notes yet. Add your first note.
                      </div>
                    ) : (
                      <div className={styles.NotesList}>
                        {notes.map((note) => (
                          <div key={note.id} className={styles.NoteItem}>
                            {editingNoteId === note.id ? (
                              <div className={styles.NoteItemInner}>
                                <textarea
                                  className={styles.NoteTextareaInline}
                                  value={editingNoteText}
                                  onChange={(e) =>
                                    setEditingNoteText(e.target.value)
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                      e.preventDefault();
                                      saveEditingNote();
                                    }
                                    if (e.key === "Escape") {
                                      cancelEditingNote();
                                    }
                                  }}
                                  autoFocus
                                />
                                <div className={styles.NoteActions}>
                                  <button
                                    className={styles.IconButton}
                                    onClick={saveEditingNote}
                                    title="Save note"
                                  >
                                    ✔
                                  </button>
                                  <button
                                    className={styles.IconButton}
                                    onClick={cancelEditingNote}
                                    title="Cancel edit"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className={styles.NoteItemInner}>
                                <div className={styles.NoteText}>
                                  {note.text}
                                </div>
                                <div className={styles.NoteActions}>
                                  <button
                                    className={styles.IconButton}
                                    onClick={() => startEditingNote(note)}
                                    title="Edit note"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    className={styles.IconButton}
                                    onClick={() => deleteNote(note.id)}
                                    title="Delete note"
                                  >
                                    🗑
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className={styles.ToolItem}>Homework Helper</div>
                <div className={styles.ToolItem}>File Manager</div>
              </div>
            )}
          </div>

          {/* Settings (opens modal) */}
          <div
            className={styles.NavItem}
            onClick={() => setIsSettingsOpen(true)}
          >
            ⚙️ Settings
          </div>
        </div>

        {/* Footer */}
        <div className={styles.UserFooter}>
          <div className={styles.UserAvatar}>W</div>
          <span>wfy ahmed</span>
        </div>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className={styles.ModalOverlay}>
          <div className={styles.Modal}>
            <div className={styles.ModalHeader}>
              <h2 className={styles.ModalTitle}>Settings</h2>
              <button
                className={styles.ModalClose}
                onClick={() => setIsSettingsOpen(false)}
                aria-label="Close settings"
              >
                ✕
              </button>
            </div>

            {/* Theme */}
            <div className={styles.ModalSection}>
              <h3>Theme</h3>
              <div className={styles.ThemeOptions}>
                <button
                  className={`${styles.ThemeOptionButton} ${
                    themePreference === "light" ? styles.ThemeOptionActive : ""
                  }`}
                  onClick={() => handleThemeChange("light")}
                >
                  Light
                </button>
                <button
                  className={`${styles.ThemeOptionButton} ${
                    themePreference === "dark" ? styles.ThemeOptionActive : ""
                  }`}
                  onClick={() => handleThemeChange("dark")}
                >
                  Dark
                </button>
                <button
                  className={`${styles.ThemeOptionButton} ${
                    themePreference === "system" ? styles.ThemeOptionActive : ""
                  }`}
                  onClick={() => handleThemeChange("system")}
                >
                  System (Auto)
                </button>
              </div>
              <p className={styles.HelperText}>
                System mode follows your device appearance.
              </p>
            </div>

            {/* Data controls */}
            <div className={styles.ModalSection}>
              <h3>Data</h3>
              <div className={styles.ButtonRow}>
                <button
                  className={styles.SecondaryButton}
                  onClick={resetChats}
                >
                  Reset chats
                </button>
                <button
                  className={styles.SecondaryButton}
                  onClick={resetNotes}
                >
                  Reset notes
                </button>
              </div>
              <button
                className={styles.DangerButton}
                onClick={clearAllData}
              >
                Clear all app data
              </button>
              <p className={styles.HelperText}>
                This will remove chats, notes and settings stored on this
                device.
              </p>
            </div>

            {/* About */}
            <div className={styles.ModalSection}>
              <h3>About</h3>
              <p className={styles.HelperText}>
                LUCA Study Assistant · v1.0.0
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
