import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChannelList,
  getLoadingState,
  getChannelListArr,
} from "../../../store/reducer/chatDataReducer";
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
  console.log(channelList,'channelList')
  return (
    <div className="h-full border-b-8 border-orange-400 rounded-b-xl bg-white relative z-2 pt-1 px-8 chatlist__headerwrapper">
      <p className="text-left">your conversations</p>
      {isLoading ? <div>Loading...</div> : channelList.map((obj)=><ListItem data={obj}/>)}
    </div>
  );
}
