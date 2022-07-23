import React from "react";
import "./ChatMain.css";
import Header from "./components/ChatMainHeader.jsx";
import Body from "./components/ChatMainBody";
import Footer from "./components/ChatMainFooter.jsx";
export default function ChatMain() {
  return (
    <div className="flex flex-col text-center h-full relative">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}
