import React from "react";
import BackIcon from "../../../assets/icons/svg/back.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  getBotInfo
} from "../../../store/reducer/widgetInfoReducer";
export default function Header() {
  const botData = useSelector(state=>getBotInfo(state))
  console.log(botData,'botData')
  return (
    <header className="flex items-center p-4 drop-shadow-md bg-white relative z-4 rounded-t-xl">
      <div>
        <img alt="back_nav" width={16} height={32} src={BackIcon} />
      </div>
      <div>
        <img
          alt="user_avatar"
          width={50}
          height={50}
          src={botData.img}
          className="rounded-full mx-4 border-4 border-primary"
        />
      </div>
      <div className="text-left">
        <h4 className="font-bold">{botData.company || "Company"}</h4>
        <p className="font text-xs">You are chatting with {botData.name || ""}</p>
      </div>
    </header>
  );
}
