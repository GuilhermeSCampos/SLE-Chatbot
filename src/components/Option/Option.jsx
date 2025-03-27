import React from "react";
import "./Option.css";

const Option = ({ text, onClick }) => {
  return (
    <button className="option-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Option;
