import React from "react";
import "./footer.css";
import { FaCaretRight } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className="footer bg-[#0a162a]">
        <div className="footer-box">
          <h2>Sistema Logosófico de Educação</h2>
          <ul>
            <div>
              <FaCaretRight color="gray" />
              <li>Principal</li>
            </div>
            <div>
              <FaCaretRight color="gray" />
              <li>Notícias</li>
            </div>
            <div>
              <FaCaretRight color="gray" />
              <li>Pedagogia</li>
            </div>
            <div>
              <FaCaretRight color="gray" />
              <li>Artigos Pedagógicos</li>
            </div>
            <div>
              <FaCaretRight color="gray" />
              <li>Depoimentos</li>
            </div>
            <div>
              <FaCaretRight color="gray" />
              <li>Fale Conosco</li>
            </div>
            <div>
              <FaCaretRight color="gray" />
              <li>Conheça a Logosofia</li>
            </div>
            <div>
              <FaCaretRight color="gray" />
              <li>Política de Privacidade</li>
            </div>
          </ul>
        </div>
        <div className="footer-box">
          <h2>Escolas do Brasil</h2>
          <ul>
            <div>
              <FaCaretRight color="gray" />
              <li>Unidade Belo Horizonte - Cidade Nova</li>
            </div>
            <div>
              <FaCaretRight color="gray" />
              <li>Unidade Belo Horizonte - Funcionários</li>
            </div>
            <div>
              <FaCaretRight color="gray" />
              <li>Unidade Brasília</li>
            </div>
            <div>
              <FaCaretRight color="gray" />
              <li>Unidade Chapecó</li>
            </div>
            <div>
              <FaCaretRight color="gray" />
              <li>Unidade Florianópolis</li>
            </div>
            <div>
              <FaCaretRight color="gray" />
              <li>Unidade Goiânia</li>
            </div>
            <div>
              <FaCaretRight color="gray" />
              <li>Unidade Rio de Janeiro</li>
            </div>
            <div>
              <FaCaretRight color="gray" />
              <li>Unidade Vila da Serra</li>
            </div>
          </ul>
        </div>
        <div className="footer-box">
          <h2>Escolas na Argentina e Uruguai</h2>
          <ul>
            <li>
              Colegio González Pecotche - Colegio Secundario Buenos Aires,
              Argentina
            </li>
            <li>
              Colegio González Pecotche - Escuela Primaria Buenos Aires,
              Argentina
            </li>
            <li>
              Colegio González Pecotche - Jardín Maternal Buenos Aires,
              Argentina
            </li>
            <li>Colegio Logosófico González Pecotche Paraná, Argentina</li>
            <li>
              Escuela Primaria Logosófica 11 de Agosto Montevideo, Uruguai
            </li>
            <li>Liceo Carlos Bernardo González Pecotche Montevideo, Uruguai</li>
          </ul>
        </div>
      </div>
      <div className="lower-footer bg-[#152c52]">
        <p className="copy">Copyright @ 2025 Sistema Logosófico de Educação</p>
        <p className="zero">by Zero31</p>
      </div>
    </div>
  );
};

export default Footer;
