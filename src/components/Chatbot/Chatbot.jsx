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
import { IoReloadOutline } from "react-icons/io5";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isInitialMessageSent, setIsInitialMessageSent] = useState(false);
  const [userType, setUserType] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const setInitialMessages = () => {
    setMessages([]);

    setTimeout(() => {
      setIsTyping(true);
    }, 300);

    setTimeout(() => {
      setMessages([
        {
          text: "Olá! Você é aluno ou responsável?",
          sender: "bot",
          type: "message",
        },
      ]);
      setIsInitialMessageSent(true);
      setIsTyping(false);
    }, 1500);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sou Aluno",
          sender: "bot",
          type: "option",
        },
        {
          text: "Sou responsável",
          sender: "bot",
          type: "option",
        },
      ]);
    }, 2000);
  };

  const resetChatFull = () => {
    setInitialMessages();
  };

  useEffect(() => {
    if (isOpen && !isInitialMessageSent) {
      setInitialMessages();
    }

    scrollToBottom(); // Garantir que o scroll vai até o final
  }, [isOpen, isInitialMessageSent]);

  useEffect(() => {
    scrollToBottom(); // Rolar sempre que uma nova mensagem ou opções forem adicionadas
  }, [messages]);

  const resetChat = () => {
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Olá! Quem está falando?", sender: "bot", type: "message" },
        { text: "Escolha uma opção abaixo:", sender: "bot", type: "message" },
        { text: "Aluno", sender: "bot", type: "option" },
        { text: "Responsável", sender: "bot", type: "option" },
      ]);
    }, 1000);

    setUserType(null);
    setInput("");
  };

  const handleUserInput = (text) => {
    if (text.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text, sender: "user", type: "message" },
    ]);
    setInput("");
    setIsTyping(true);

    const typingTime = Math.floor(Math.random() * 1000) + 1000;
    const result = fuse.search(text);

    const getUserOptions = (userType) => {
      return intents
        .filter((option) => option.type?.includes(userType))
        .map((option) => ({
          text: option.text,
          sender: "bot",
          type: "option",
        }));
    };

    const sendMessagesWithDelay = (
      messagesToSend,
      userTypeForOptions = null
    ) => {
      let totalDelay = 0;

      messagesToSend.forEach((msg, index) => {
        totalDelay += index === 0 ? 0 : 700;

        setTimeout(() => {
          setIsTyping(false);
          setMessages((prevMessages) => [...prevMessages, msg]);

          if (userTypeForOptions && index === messagesToSend.length - 1) {
            setTimeout(() => {
              setMessages((prevMessages) => [
                ...prevMessages,
                ...getUserOptions(userTypeForOptions),
              ]);
            }, 800);
          }
        }, totalDelay);
      });
    };

    if (text === "Menu Principal") {
      resetChat();
      return;
    }

    if (result.length > 0) {
      const detectedIntent = result[0].item.category;
      const response = result[0].item.response;

      if (detectedIntent === "aluno" || detectedIntent === "responsavel") {
        setUserType(detectedIntent);

        setTimeout(() => {
          setIsTyping(false);
          sendMessagesWithDelay(
            [
              {
                text:
                  detectedIntent === "aluno"
                    ? "Ótimo! Como posso te ajudar nos seus estudos?"
                    : "Entendido! Como posso auxiliar você com informações da escola?",
                sender: "bot",
                type: "message",
              },
              {
                text: "Escolha uma opção abaixo:",
                sender: "bot",
                type: "message",
              },
            ],
            detectedIntent
          );
        }, typingTime);
      } else {
        setTimeout(() => {
          setIsTyping(false);
          sendMessagesWithDelay(
            [
              {
                text: `Aqui estão informações sobre ${detectedIntent}!`,
                sender: "bot",
                type: "message",
              },
              {
                text: response,
                sender: "bot",
                type: "message",
              },
            ],
            userType
          );
        }, typingTime);
      }
    } else {
      setTimeout(() => {
        setIsTyping(false);
        sendMessagesWithDelay([
          {
            text: "Desculpe, não entendi. Pode reformular?",
            sender: "bot",
            type: "message",
          },
        ]);
      }, typingTime);
    }
  };

  return (
    <div className="chatbot-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chatbot-header">
              <h3>Assistente Virtual</h3>
              <div className="header-buttons">
                <button className="reset-btn" onClick={resetChatFull}>
                  <IoReloadOutline />
                </button>
                <button className="close-btn" onClick={() => setIsOpen(false)}>
                  <IoMdClose />
                </button>
              </div>
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
                    {msg.type === "message" ? (
                      <MessageCard sender={msg.sender} text={msg.text} />
                    ) : (
                      <Option
                        key={index}
                        text={msg.text}
                        onClick={() => handleUserInput(msg.text)}
                      />
                    )}
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
          </motion.div>
        )}
      </AnimatePresence>

      <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
        <motion.div
          key={isOpen ? "down" : "chat"} // Assegura que o Framer Motion reinicie a animação entre os ícones
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }} // Defina o tempo de duração da animação
        >
          {isOpen ? (
            <FaAngleDown size={24} />
          ) : (
            <IoChatbubbleEllipsesOutline size={32} />
          )}
        </motion.div>
      </button>
    </div>
  );
};

export default Chatbot;
