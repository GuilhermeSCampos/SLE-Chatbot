import React, { useState } from "react";
import "./Chatbot.css";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdClose, IoMdSend } from "react-icons/io";
import MessageCard from "../MessageCard/MessageCard";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Olá! Como posso ajudar?", sender: "bot" },
  ]);

  const sendMessage = (text) => {
    if (text.trim() === "") return;

    setMessages([...messages, { text, sender: "user" }]);
    setInput("");

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Entendi! Vou te ajudar com isso.", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <h3>Assistente Virtual</h3>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <IoMdClose />
          </button>
        </div>
        <div className="chatbot-content">
          {messages.map((msg, index) => (
            <MessageCard key={index} sender={msg.sender} text={msg.text} />
          ))}
        </div>
        <div className="chatbot-input-container">
          <input
            className="chatbot-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
          />
          <button
            className="chatbot-input-btn"
            onClick={() => sendMessage(input)}
            style={{
              opacity: input.length > 0 ? 1 : 0,
              pointerEvents: input.length > 0 ? "auto" : "none",
            }}
          >
            <IoMdSend size={24} color="black" />
          </button>
        </div>
      </div>
      <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <FaAngleDown size={24} />
        ) : (
          <IoChatbubbleEllipsesOutline size={32} />
        )}
      </button>
    </div>
  );
};

export default Chatbot;
