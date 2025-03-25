import React from "react";
import cardsData from "./cardsData.json";
import "./cards.css";
import Card from "../Card/Card";

function Cards() {
  return (
    <main className="main">
      <section className="box-title">
        <h1>Unidades</h1> <h3>(Brasil)</h3>
      </section>
      <section className="cards">
        {cardsData.map((card) => (
          <Card
            key={card.cidade}
            img={card.img}
            description={card.descricao}
            title={card.cidade}
          />
        ))}
      </section>
    </main>
  );
}

export default Cards;
