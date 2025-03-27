import React from "react";
import "./MessageCard.css";
import SLE from "../../assets/sle-icon.jpg";
import { FaUser } from "react-icons/fa";

const MessageCard = ({ sender, text }) => {
  return (
    <div className={`message-container ${sender}`}>
      {sender === "bot" ? (
        <>
          <div className="message-icon bot">
            <img src={SLE} alt="SLE" />
          </div>
          <div className={`message ${sender}`}>{text}</div>
        </>
      ) : (
        <>
          <div className={`message ${sender}`}>{text}</div>
          <div className="message-icon user">
            <FaUser />
          </div>
        </>
      )}
    </div>
  );
};

export default MessageCard;
