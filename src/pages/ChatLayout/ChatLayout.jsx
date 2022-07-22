import React from "react";

import CloseIcon from "../../assets/icons/svg/close.svg";
import "./ChatLayout.css";

import ChatMain from "../ChatMain/ChatMain";
export default function ChatLayout({ closeChat }) {
  return (
    <>
      <div className="flex justify-end mr-6 cursor-pointer" onClick={closeChat}>
        <img width={20} height={20} alt="close_icon" src={CloseIcon} />
      </div>
      <div className="shadow-lg rounded-md p-2 chatlayout__wrapper">
        <ChatMain />
      </div>
      <div className="text-center">FOOTER</div>
    </>
  );
}
