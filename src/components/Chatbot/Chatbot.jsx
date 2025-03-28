import React, { useState, useRef, useEffect } from "react";
import { intents, fuse } from "./fuseIntents";
import "./Chatbot.css";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdClose, IoMdSend } from "react-icons/io";
import MessageCard from "../MessageCard/MessageCard";
import Option from "../Option/Option";
import { ThreeDot } from "react-loading-indicators";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isInitialMessageSent, setIsInitialMessageSent] = useState(false);
  const [userType, setUserType] = useState(null);
  const [showOptions, setShowOptions] = useState(false);

  const messagesEndRef = useRef(null);

  // Função para rolar até o final
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isInitialMessageSent) {
      setIsTyping(true);

      setTimeout(() => {
        setMessages([
          { text: "Olá! Você é aluno ou responsável?", sender: "bot" },
        ]);
        setIsInitialMessageSent(true);
        setIsTyping(false);
      }, 1500);
    }

    scrollToBottom(); // Garantir que o scroll vai até o final
  }, [isInitialMessageSent]);

  useEffect(() => {
    scrollToBottom(); // Rolar sempre que uma nova mensagem ou opções forem adicionadas
  }, [messages, showOptions]); // Dependências de mensagens e opções

  const handleUserInput = (text) => {
    if (text.trim() === "") return;

    setMessages([...messages, { text, sender: "user" }]);
    setInput("");
    setIsTyping(true);
    setShowOptions(false);

    // Gera tempos aleatórios dentro de um intervalo adequado
    const typingTime = Math.floor(Math.random() * 1000) + 1000; // Entre 1s e 2s
    const showOptionsTime =
      typingTime + Math.floor(Math.random() * 1000) + 1000; // Maior que typingTime

    const result = fuse.search(text);

    if (result.length > 0) {
      const detectedIntent = result[0].item.category;
      const response = result[0].item.response;

      if (detectedIntent === "aluno" || detectedIntent === "responsavel") {
        setUserType(detectedIntent);

        setTimeout(() => {
          setIsTyping(false);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text:
                detectedIntent === "aluno"
                  ? "Ótimo! Como posso te ajudar nos seus estudos?"
                  : "Entendido! Como posso auxiliar você com informações da escola?",
              sender: "bot",
            },
          ]);
        }, typingTime);

        setTimeout(() => {
          setShowOptions(true);
        }, showOptionsTime);
      } else {
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: `Aqui estão informações sobre ${detectedIntent}!`,
              sender: "bot",
            },
            {
              text: response,
              sender: "bot",
            },
          ]);
        }, typingTime);

        setTimeout(() => {
          setShowOptions(true);
        }, showOptionsTime);
      }
    } else {
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Desculpe, não entendi. Pode reformular?", sender: "bot" },
        ]);
      }, typingTime);
    }
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
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <MessageCard sender={msg.sender} text={msg.text} />
              </motion.div>
            ))}
          </AnimatePresence>

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

          <AnimatePresence>
            {isInitialMessageSent && userType === null && (
              <motion.div
                className="options-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Option
                  text="Sou aluno"
                  onClick={() => handleUserInput("Sou aluno")}
                />
                <Option
                  text="Sou responsável"
                  onClick={() => handleUserInput("Sou responsável")}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {userType && showOptions && (
              <motion.div
                className="options-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {intents
                  .filter((option) => option.type?.includes(userType))
                  .map((option, index) => (
                    <Option
                      key={index}
                      text={option.text}
                      onClick={() => handleUserInput(option.text)}
                    />
                  ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input-container">
          <input
            className="chatbot-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUserInput(input)}
            placeholder="Digite sua mensagem..."
          />
          <button
            className="chatbot-input-btn"
            onClick={() => handleUserInput(input)}
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
