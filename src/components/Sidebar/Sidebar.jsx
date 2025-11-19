// Updated JSX for the sidebar
import React, { useState, useEffect } from 'react';

const Sidebar = ({ isOpen, toggleSidebar, onNewChat }) => {
  const [chats, setChats] = useState([]);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  // Load chats from localStorage
  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    setChats(savedChats);
  }, []);

  // Update chats when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedChats = JSON.parse(localStorage.getItem('chatHistory') || '[]');
      setChats(savedChats);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const startEditing = (id, title) => {
    setEditingChatId(id);
    setEditTitle(title);
  };

  const saveEdit = (id) => {
    if (editTitle.trim()) {
      const updatedChats = chats.map(chat => 
        chat.id === id ? { ...chat, title: editTitle.trim() } : chat
      );
      setChats(updatedChats);
      localStorage.setItem('chatHistory', JSON.stringify(updatedChats));
    }
    setEditingChatId(null);
  };

  const deleteChat = (id) => {
    const updatedChats = chats.filter(chat => chat.id !== id);
    setChats(updatedChats);
    localStorage.setItem('chatHistory', JSON.stringify(updatedChats));
  };

  return (
    <div className={`Sidebar ${isOpen ? 'open' : ''}`}>
      <div className="SidebarHeader">
        <button className="NewChatButton" onClick={onNewChat}>
          + New Chat
        </button>
        <button className="CloseButton" onClick={toggleSidebar} />
      </div>

      <div className="SidebarScrollable">
        {/* Saved Sessions Section */}
        <div className="NavSection">
          <div className="SectionHeader">
            Saved Sessions
          </div>
          <div className="SectionContent">
            {chats.length === 0 ? (
              <div className="EmptyText">No saved chats</div>
            ) : (
              chats.map((chat) => (
                <div key={chat.id} className="ChatItem">
                  <div className="ChatItemInner">
                    {editingChatId === chat.id ? (
                      <>
                        <input
                          type="text"
                          className="ChatTitleInput"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onBlur={() => saveEdit(chat.id)}
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit(chat.id)}
                          autoFocus
                        />
                        <div className="ChatActions">
                          <button
                            className="IconButton"
                            onClick={() => saveEdit(chat.id)}
                          >
                            ✓
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="ChatTitle"
                          onClick={() => startEditing(chat.id, chat.title)}
                        >
                          {chat.title}
                        </div>
                        <div className="ChatActions">
                          <button
                            className="IconButton"
                            onClick={() => startEditing(chat.id, chat.title)}
                          >
                            ✎
                          </button>
                          <button
                            className="IconButton"
                            onClick={() => deleteChat(chat.id)}
                          >
                            🗑
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="NavSection">
          <button className="NavItem">Settings</button>
        </div>
      </div>

      {/* User Footer */}
      <div className="UserFooter">
        <div className="UserAvatar">W</div>
        <span>Wafry Ahamed</span>
      </div>
    </div>
  );
};

export default Sidebar;