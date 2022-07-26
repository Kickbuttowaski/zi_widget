import React from "react";
import { useSelector } from "react-redux";
import { getBotInfo } from "../../../store/reducer/widgetInfoReducer";
export default function Header() {
  const botData = useSelector((state) => getBotInfo(state));
  return (
    <header className="flex flex-col items-start p-4 text-primary_text rounded-t-xl">
      <img
        loading="lazy"
        alt="user_avatar"
        height={60}
        width={60}
        src={botData.img}
        className="rounded-full mx-4 border-2 border-primary"
      />
      <div className="ml-4 mt-2 text-left">
        <p className="text-2xl">Hi, we are {botData.company || "Company"}</p>
        <p className="text-md">{botData.description}</p>
      </div>
    </header>
  );
}
