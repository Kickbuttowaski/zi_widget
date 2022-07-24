import React from "react";
import "./ChatLayout.css";
import CloseIcon from "../../assets/icons/svg/close.svg";

import ChatMain from "../ChatMain";
import ChatList from "../ChatList";
import { getCurrentScreen } from "../../store/reducer/widgetInfoReducer";
import { useSelector } from "react-redux/es/exports";

export default function ChatLayout({ closeChat }) {
  const activeScreen = useSelector((state) => getCurrentScreen(state));
  return (
    <>
      <div className="flex justify-end mr-6 cursor-pointer" onClick={closeChat}>
        <img width={20} height={20} alt="close_icon" src={CloseIcon} />
      </div>
      <div className="shadow-lg rounded-md chatlayout__wrapper">
        {activeScreen === "chat" ? <ChatMain /> : <ChatList />}
      </div>
      <div className="text-center">Powered by ZI</div>
    </>
  );
}
