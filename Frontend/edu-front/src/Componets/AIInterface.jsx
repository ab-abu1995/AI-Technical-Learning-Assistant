// AIInterface.jsx
const API_BASE = "http://127.0.0.1:8000";
import React, { useState, useRef, useEffect } from 'react';
import '../Css/AIInterface.css';

const AIInterface = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: 'Research Paper Analysis', messages: [{role: 'user', content: 'Analyze this data.'}, {role: 'ai', content: 'Here is the analysis.'}] },
    { id: 2, title: 'Coding Help', messages: [{role: 'user', content: 'How do I center a div?'}, {role: 'ai', content: 'Use Flexbox!'}] }
  ]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [stagedFile, setStagedFile] = useState(null);
  
  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);
  const menuRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Demo user for testing - remove this in production
      setUser({
        name: 'John Doe',
        email: 'john.doe@example.com',
        picture: null
      });
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Handle click outside for popups
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfilePopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
    setStagedFile(null);
    setInput('');
  };

  const handleLoadChat = (id) => {
    const chatToLoad = chatHistory.find(chat => chat.id === id);
    if (chatToLoad) {
      setCurrentChatId(chatToLoad.id);
      setMessages(chatToLoad.messages);
      setStagedFile(null);
      setInput('');
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setStagedFile(file);
    setIsMenuOpen(false);
    e.target.value = null;
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData
      });
  
      const data = await res.json();
      alert(data.message || data.error);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !stagedFile) return;
  
    const userMessage = { 
      role: 'user', 
      content: input, 
      fileName: stagedFile ? stagedFile.name : null 
    };
  
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
  
    setInput('');
    setStagedFile(null);
  
    let activeChatId = currentChatId;
  
    if (!activeChatId) {
      activeChatId = Date.now();
      setCurrentChatId(activeChatId);
      const newTitle = input.trim() ? input.substring(0, 20) + '...' : 'File Upload';
  
      setChatHistory(prev => [
        { id: activeChatId, title: newTitle, messages: updatedMessages },
        ...prev
      ]);
    } else {
      setChatHistory(prev => prev.map(chat => 
        chat.id === activeChatId ? { ...chat, messages: updatedMessages } : chat
      ));
    }
  
    try {
      const res = await fetch(`${API_BASE}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: input,
          style: "detailed"
        })
      });
  
      const data = await res.json();
  
      const aiResponse = { role: 'ai', content: data.answer };
  
      setMessages(prev => {
        const finalMessages = [...prev, aiResponse];
  
        setChatHistory(history => history.map(chat => 
          chat.id === activeChatId ? { ...chat, messages: finalMessages } : chat
        ));
  
        return finalMessages;
      });
  
    } catch (err) {
      console.error(err);
      alert("Error getting AI response");
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
    setShowProfilePopup(false);
  };

  const confirmLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('google_token');
    setShowLogoutModal(false);
    // Optional: Redirect to login page
    window.location.href = '/login';
  };

  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return 'JD';
  };

  return (
    <div className="ai-container">
      {/* SIDEBAR */}
      <aside className="ai-sidebar" style={{ width: isSidebarOpen ? '260px' : '0px', opacity: isSidebarOpen ? 1 : 0 }}>
        <div style={{ minWidth: '220px', padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <button onClick={handleNewChat} className="new-chat-btn">+ New Chat</button>
          <h3 className="history-title">Recent Conversations</h3>
          
          {/* Chat History List */}
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
            {chatHistory.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => handleLoadChat(chat.id)}
                className={`history-item ${currentChatId === chat.id ? 'active' : ''}`}
              >
                {chat.title}
              </div>
            ))}
          </div>

          {/* Profile Section at Bottom */}
          <div className="sidebar-profile-section" ref={profileMenuRef}>
            <button onClick={toggleProfilePopup} className="sidebar-profile-btn">
              <div className="sidebar-profile-avatar-initials">
                {getUserInitials()}
              </div>
              <span className="sidebar-profile-name">{user?.name || 'Guest User'}</span>
            </button>

            {/* Profile Popup */}
            {showProfilePopup && (
              <div className="profile-popup-sidebar">
                <div className="popup-arrow-sidebar"></div>
                <div className="popup-content-sidebar">
                  {/* Profile Icon - JD style */}
                  <div className="popup-profile-icon">
                    <div className="popup-initials-large">
                      {getUserInitials()}
                    </div>
                  </div>

                  {/* User Details */}
                  <div className="popup-details">
                    <div className="detail-row">
                      <span className="detail-label">Name:</span>
                      <span className="detail-value">{user?.name || 'Guest User'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Email:</span>
                      <span className="detail-value">{user?.email || 'guest@example.com'}</span>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button onClick={handleLogout} className="logout-btn-sidebar">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ai-main-content">
        <div className="ai-top-nav">
          <button onClick={toggleSidebar} className="toggle-btn">{isSidebarOpen ? '✕' : '☰'}</button>
          <span className="logo-text"></span>
        </div>

        <div className="messages-container">
          {messages.length === 0 && (
            <div className="welcome-screen">
              <div className="ai-logo"></div>
              <h2>Get insights from your uploaded materials.</h2>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user' ? 'user-row' : 'ai-row'}>
              <div className={`chat-bubble ${msg.role === 'user' ? 'user-bubble' : 'ai-bubble'}`}>
                <strong>{msg.role === 'user' ? 'You' : 'AI'}</strong>
                {msg.fileName && <div className="message-attachment">📎 {msg.fileName}</div>}
                {msg.content && <p style={{ marginTop: '5px' }}>{msg.content}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT AREA */}
        <div className="input-wrapper">
          {stagedFile && (
            <div className="staged-file-badge">
              <span>📄</span>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{stagedFile.name}</span>
              <button onClick={() => setStagedFile(null)} className="remove-file-btn">✕</button>
            </div>
          )}

          <div className="input-container">
            <div style={{ position: 'relative' }} ref={menuRef}>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="plus-btn">+</button>
              {isMenuOpen && (
                <div className="popup-menu">
                  <div className="menu-item" onClick={() => fileInputRef.current.click()}>📄 Upload File</div>
                  <div className="menu-item" onClick={() => photoInputRef.current.click()}>🖼️ Choose Photos</div>
                  <div className="menu-item" onClick={() => alert('Camera requested')}>📷 Take Photo</div>
                </div>
              )}
            </div>

            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileSelect} />
            <input type="file" accept="image/*" ref={photoInputRef} style={{ display: 'none' }} onChange={handleFileSelect} />

            <input 
              className="text-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message AI..."
            />
            
            <button 
              onClick={handleSend} 
              className="send-btn"
              style={{ opacity: (input || stagedFile) ? 1 : 0.3 }}
              disabled={!input && !stagedFile}
            >
              ↑
            </button>
          </div>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="logout-overlay">
          <div className="logout-modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-buttons">
              <button onClick={() => setShowLogoutModal(false)} className="cancel-btn">Cancel</button>
              <button onClick={confirmLogout} className="logout-btn">Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInterface;