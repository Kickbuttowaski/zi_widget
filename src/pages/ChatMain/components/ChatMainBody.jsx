import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLoadingState,
  getMsgs,
  getMsgArr,
} from "../../../store/reducer/chatDataReducer";
import ChatHolder from "./ChatHolder";
export default function ChatMainBody() {
  const isLoading = useSelector((state) => getLoadingState(state));
  const msgData = useSelector((state) => getMsgArr(state));
  const dispatch = useDispatch(useDispatch);
  useEffect(() => {
    //trigger API to get the prev and new messages to be rendered
    dispatch(getMsgs());
  }, []);
  return (
    <div className="h-4/5 rounded-b-xl bg-white relative z-2 py-4 px-8 chatmain__headerwrapper overflow-y-auto">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {msgData.map((obj,i) => {
            return <ChatHolder key={i} data={obj} />;
          })}
        </div>
      )}
    </div>
  );
}
