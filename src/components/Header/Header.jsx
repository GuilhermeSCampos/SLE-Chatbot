import React from "react";
import SLELogo from "../../assets/titleText.png";
import "./header.css";

function Header() {
  return (
    <header className="header w-screen">
      <div className="top-side-header h-[100px] border">
        <img src={SLELogo} width={280} height={60} className="title" />
      </div>
      <div className="bottom-side-header h-[50px] bg-[#12326E]">
        <nav>
          <a
            href="https://www.colegiologosofico.com.br/"
            target="_blank"
            className="bg-[#A4E237]"
          >
            HOME
          </a>
          <a
            href="https://www.colegiologosofico.com.br/"
            target="_blank"
            className="hover:bg-[#1e5a8f] easy-in-out duration-1000"
          >
            UNIDADES
          </a>
          <a
            href="https://www.colegiologosofico.com.br/noticias"
            target="_blank"
            className="hover:bg-[#1e5a8f] easy-in-out duration-1000"
          >
            NOTÍCIAS
          </a>
          <a
            href="https://www.colegiologosofico.com.br/pedagogia"
            target="_blank"
            className="hover:bg-[#1e5a8f] easy-in-out duration-1000"
          >
            PEDAGOGIA LOGOSÓFICA
          </a>
          <a
            href="https://www.colegiologosofico.com.br/artigos-pedagogicos"
            target="_blank"
            className="hover:bg-[#1e5a8f] easy-in-out duration-1000"
          >
            ARTIGOS
          </a>
          <a
            href="https://www.colegiologosofico.com.br/depoimentos"
            target="_blank"
            className="hover:bg-[#1e5a8f] easy-in-out duration-1000"
          >
            DEPOIMENTOS
          </a>
          <a
            href="https://www.colegiologosofico.com.br/fale-conosco"
            target="_blank"
            className="hover:bg-[#1e5a8f] easy-in-out duration-1000"
          >
            FALE CONOSCO
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
