import React from "react";
import Header from "./components/ChatListHeader.jsx";
import Body from "./components/ChatListBody.jsx";
import WaveSVG from "../../components/DesignComponents/WaveSvg.jsx";
import "./ChatList.css";
export default function ChatList() {
  return (
    <div className="flex flex-col text-center h-full relative z-2 ">
      <Header />
      <Body />
      <WaveSVG />
    </div>
  );
}
