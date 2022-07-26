import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChannelList,
  getLoadingState,
  getChannelListArr,
  getMsgs,
} from "../../../store/reducer/chatDataReducer";
import { switchScreen } from "../../../store/reducer/widgetInfoReducer";
import ListItem from "./ListItem.jsx";
export default function ChatListBody() {
  const isLoading = useSelector((state) =>
    getLoadingState(state, "isChannelLoading")
  );
  const channelList = useSelector((state) => getChannelListArr(state));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChannelList());
  }, []);
  const handleChatClick = (ev) => {
    let ele = ev.target.closest("section");
    if (ele && ele.getAttribute("data-cid")) {
      //trigger API and switch to chat screen
      dispatch(getMsgs(ele.getAttribute("data-cid")));
      dispatch(switchScreen("chat"));
    }
  };
  return (
    <div className="h-full border-b-8 border-primary rounded-b-xl pt-1 px-8 chatlist__headerwrapper overflow-y-auto zi_scroll">
      <p className="text-left text-primary_text mb-2 text-xs">
        your conversations
      </p>
      {isLoading ? (
        <div>Loading...</div>
      ) : channelList.length ? (
        <div onClick={handleChatClick}>
          {channelList.map((obj) => (
            <ListItem key={obj.cid} data={obj} />
          ))}
        </div>
      ) : (
        <div className="text-primary_text text-md text-center">
          No active conversations
        </div>
      )}
    </div>
  );
}
