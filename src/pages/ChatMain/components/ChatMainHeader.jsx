import React from "react";
import BackIcon from "../../../assets/icons/svg/back.svg";
export default function Header() {
  return (
    <header className="flex items-center p-4 drop-shadow-md bg-white relative z-4 rounded-t-xl">
      <div>
        <img alt="back_nav" width={16} height={32} src={BackIcon} />
      </div>
      <div>
        <img
          alt="user_avatar"
          src="https://via.placeholder.com/60?text=WI"
          className="rounded-full mx-4"
        />
      </div>
      <div className="text-left">
        <h4 className="font-bold">Username</h4>
        <p className="font">you are chatting wiht</p>
      </div>
    </header>
  );
}
