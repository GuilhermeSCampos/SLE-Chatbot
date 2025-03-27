import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdClose, IoMdSend } from "react-icons/io";
import MessageCard from "../MessageCard/MessageCard";
import Option from "../Option/Option";
import { ThreeDot } from "react-loading-indicators";
import { div } from "framer-motion/client";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isInitialMessageSent, setIsInitialMessageSent] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isInitialMessageSent) {
      setIsTyping(true);

      setTimeout(() => {
        setMessages([{ text: "Olá! Como posso ajudar?", sender: "bot" }]);
        setIsInitialMessageSent(true);
        setIsTyping(false);
      }, 2500);
    }

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isInitialMessageSent]);

  const initialOptions = [
    { text: "Ver meus pedidos", value: "pedidos" },
    { text: "Falar com atendente", value: "atendente" },
    { text: "Dúvidas frequentes", value: "faq" },
  ];

  const handleOptionClick = (optionValue) => {
    sendMessage(optionValue);
  };

  const sendMessage = (text) => {
    if (text.trim() === "") return;

    setMessages([...messages, { text, sender: "user" }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
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
          {isTyping && (
            <div className="dots">
              <ThreeDot
                variant="bounce"
                color="#0c1320"
                style={{ fontSize: "6px" }}
                textColor="#0f1a22"
              />
            </div>
          )}
          {isInitialMessageSent && messages.length === 1 && (
            <div className="options-container">
              {initialOptions.map((option, index) => (
                <Option
                  key={index}
                  text={option.text}
                  onClick={() => handleOptionClick(option.text)}
                />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input-container">
          <input
            className="chatbot-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
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
