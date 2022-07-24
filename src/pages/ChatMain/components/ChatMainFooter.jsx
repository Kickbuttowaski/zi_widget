import React from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getBotInfo } from "../../../store/reducer/widgetInfoReducer";
import { appendEndConvo,postReadStatus } from "../../../store/reducer/chatDataReducer";
export default function Footer() {
  const dispatch = useDispatch();
  const botData = useSelector((state) => getBotInfo(state));
  const handleRestart = () => {
    dispatch(appendEndConvo(botData.name));
    dispatch(postReadStatus())
  };
  return (
    <div
      onClick={handleRestart}
      className="absolute bottom-0 rounded-b-xl z-1 text-center bg-primary text-primary_text text-white min-h-100px pt-16 w-full cursor-pointer"
    >
      Restart conversation
    </div>
  );
}
