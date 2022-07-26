import React from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { getBotInfo } from "../../../store/reducer/widgetInfoReducer";
import {
  getClientmsgSocketData,
  restartConvo,
} from "../../../store/reducer/chatDataReducer";
import { getChannelRef } from "../../../store/reducer/pusherReducer";

export default function Footer() {
  const dispatch = useDispatch();
  const botData = useSelector((state) => getBotInfo(state));
  const channelRef = useSelector((state) => getChannelRef(state));
  const socketData = useSelector((state) => getClientmsgSocketData(state));
  const handleRestart = () => {
    dispatch(restartConvo(botData.name));
    socketData["message"]["text"] = '@'+botData.name;
    delete  socketData["message"]["lastMessageTimeStamp"]
    channelRef.trigger("client-widget-message", socketData);
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
