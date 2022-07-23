import React from "react";

import CloseIcon from "../../assets/icons/svg/close.svg";
import "./ChatLayout.css";

import ChatMain from "../ChatMain";
import ChatList from "../ChatList";
export default function ChatLayout({ closeChat }) {
  return (
    <>
      <div className="flex justify-end mr-6 cursor-pointer" onClick={closeChat}>
        <img width={20} height={20} alt="close_icon" src={CloseIcon} />
      </div>
      <div className="shadow-lg rounded-md chatlayout__wrapper">
        <ChatList />
      </div>
      <div className="text-center">Powered by ZI</div>
    </>
  );
}
