import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar.jsx';
import Footer from '../components/Footer.jsx';
import chats from '../assets/data/messagesData.js';
import { FaUserCircle, FaUsers, FaPaperclip, FaCamera, FaSearch } from 'react-icons/fa';
import '../airzon.css';

const MessagesPage = () => {
 

  const vendor = location.state?.vendor;
const initialIndex = vendor
  ? chats.findIndex(c => c.name === vendor || c.org === vendor)
  : 0;

const [activeIndex, setActiveIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  return (
    <>
      <TopNavBar />
      <div className="messages-root">
        {/* Sidebar */}
        <div className="chat-sidebar">

          <div className="chat-searchbar-wrap">
            <input
              type="text"
              className="chat-searchbar"
              placeholder="Write here keywords, description, cities..."
            />
            <span className="chat-searchbar-icon">
              <FaSearch size={18} />
            </span>
          </div>
          <div className="chat-list-scroll">
            {chats.map((chat, index) => (
              <div
                className={
                  `chat-item` +
                  (index === activeIndex ? " chat-item-active" : "") +
                  (chat.unread > 0 ? " chat-item-unread" : "")
                }
                onClick={() => setActiveIndex(index)}
                key={index}
              >
                <div className="chat-avatar">
                  {chat.group ? <FaUsers size={28} color="#fff" /> : <FaUserCircle size={28} color="#fff" />}
                </div>
                <div className="chat-main">
                  <div className="chat-title-row">
                    <span className="chat-name">{chat.name}</span>
                    <span className="chat-org">{chat.org}</span>
                  </div>
                  <div className="chat-message-preview">{chat.msg}</div>
                </div>
                <div className="chat-side">
                  <div className="chat-time">{chat.time}</div>
                  {chat.unread > 0 && (
                    <span className="chat-unread-badge">{chat.unread}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Chat thread */}
        <div className="chat-thread-placeholder">
          {chats[activeIndex] ? (
            <div className="chat-thread">
              <div className="chat-thread-header">
                <strong>{chats[activeIndex].name}</strong>{" "}
                <span style={{ color: "#58b9a2" }}>{chats[activeIndex].org}</span>
              </div>
              <div className="chat-thread-body">
                {chats[activeIndex].messages && chats[activeIndex].messages.length > 0 ? (
                  chats[activeIndex].messages.map((msg, idx) => (
                    <div key={idx} className={`chat-bubble${msg.self ? " chat-bubble-self" : ""}`}>
                      <div className="chat-bubble-text">{msg.text}</div>
                      <div className="chat-bubble-time">{msg.time}</div>
                    </div>
                  ))
                ) : (
                  <div className="chat-thread-empty-message">
                    <span>No messages yet.<br />Start the conversation!</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="chat-thread-empty">No chat selected</div>
          )}
          <div className="chat-thread-input">
                <input type="text" placeholder="Type a message" />
                <button aria-label="Attach file"><FaPaperclip /></button>
                <button aria-label="Send photo"><FaCamera /></button>
              </div>
        </div>
        
      </div>
      <Footer />
    </>
  );
};

export default MessagesPage;