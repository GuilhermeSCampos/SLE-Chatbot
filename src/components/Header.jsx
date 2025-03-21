import React from "react";
import SLELogo from "../assets/titleText.png";

function Header() {
  return (
    <div className="header w-screen">
      <div className="top-side-header h-[100px] border">
        <img src={SLELogo} width={280} height={60} className="title" />
      </div>
      <div className="bottom-side-header h-[50px] bg-[#12326E]"></div>
    </div>
  );
}

export default Header;
