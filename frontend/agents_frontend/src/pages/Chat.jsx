// src/Chat.jsx
import React, { useState } from "react";

const Chat = ({ conversationData, sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="message-display">
        {conversationData.map((entry, index) => (
          <div
            key={index}
            className={entry.fromUser ? "user-message" : "agent-message"}
          >
            {entry.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
