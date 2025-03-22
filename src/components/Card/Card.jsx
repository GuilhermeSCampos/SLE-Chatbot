import React from "react";
import "./card.css";

function Card({ img, title, description }) {
  return (
    <div className="card">
      <div className="image-container">
        <img
          src={img}
          alt={title}
          href="
      tibia.com"
        />
        <div className="triangle"></div> {/* Triângulo adicionado aqui */}
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <div className="buttons">
        <button className="card-btn-access bg-[#A4E237] hover:bg-[#6d8a24] ease-in-out duration-900">
          Acessar
        </button>
        <button className="card-btn-cct bg-[#12326E] hover:bg-[#346dcc] ease-in-out duration-900">
          Contato
        </button>
      </div>
    </div>
  );
}

export default Card;
