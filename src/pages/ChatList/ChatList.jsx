import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/ChatListHeader.jsx";
import Footer from "./components/ChatListFooter.jsx";
import ListItem from "./components/ListItem.jsx";
import "./ChatList.css";
export default function ChatList() {
  return (
    <div className="flex flex-col text-center h-full relative">
      <Header />
      <div className="h-4/5 rounded-b-xl bg-white relative z-2 pt-1 px-8 chatlist__headerwrapper">
        <p className="text-left">your conversations</p>
        <ListItem />
      </div>
      <Footer />
    </div>
  );
}
