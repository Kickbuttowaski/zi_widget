import React from "react";
import Header from "./components/ChatListHeader.jsx";
import Body from "./components/ChatListBody.jsx"
import Footer from "./components/ChatListFooter.jsx";

import "./ChatList.css";
export default function ChatList() {
  return (
    <div className="flex flex-col text-center h-full relative">
      <Header />
      <Body/>
      {/* <Footer /> */}
    </div>
  );
}
