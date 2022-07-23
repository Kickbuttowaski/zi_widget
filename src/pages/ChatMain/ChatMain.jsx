import React from "react";
import "./ChatMain.css"
import Header from "./components/ChatMainHeader.jsx";
import Footer from "./components/ChatMainFooter.jsx";
export default function ChatMain() {
  return (
    <div className="flex flex-col text-center h-full relative">
      <Header />
      <div className="h-4/5 rounded-b-xl bg-white relative z-2 pt-1 chatmain__headerwrapper">BODY</div>
      <Footer />
    </div>
  );
}
