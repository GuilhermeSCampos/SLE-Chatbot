import React, { useState } from "react";
import "./Chatbot.css";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chatbot-container">
      <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <h3>Assistente Virtual</h3>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            ×
          </button>
        </div>
        <div className="chatbot-content">
          <p>Olá! Como posso ajudar?</p>
        </div>
      </div>

      <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
        <IoChatbubbleEllipsesOutline size={32} />
      </button>
    </div>
  );
};

export default Chatbot;
