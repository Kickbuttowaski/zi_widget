import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pusher from "pusher-js";
import {
  getLoadingState,
  getMsgs,
  getMsgArr,
  postReadStatus,
  postDeliveredStatus,
  getClientmsgSocketData,
  appendEndConvo,
  getChatEnd,
  getSocketLoader,
  toggleSocketLoader,
} from "../../../store/reducer/chatDataReducer";
import { getSubscriptionInfo } from "../../../store/reducer/widgetInfoReducer";
import {
  setChannelRef,
  getChannelRef,
} from "../../../store/reducer/pusherReducer";
import ChatHolder from "./ChatHolder";
import { LS } from "../../../utils/authHeaders";
const USER_ID = JSON.parse(LS.get("zi_config")).userId;
const pusher = new Pusher("67bb469433cb732caa7a", {
  cluster: "mt1",
  channelAuthorization: {
    endpoint:
      "https://insentstaging.api.insent.ai/pusher/presence/auth/visitor?userid=" +
      USER_ID,
  },
});
export default function ChatMainBody() {
  const scrollRef = useRef(null);
  const prevTimestamp = useRef(null);
  const isSocketLoading = useSelector((state) => getSocketLoader(state));
  const isLoading = useSelector((state) => getLoadingState(state));
  const msgData = useSelector((state) => getMsgArr(state));
  const channelRef = useSelector((state) => getChannelRef(state));
  const socketPayload = useSelector((state) => getClientmsgSocketData(state));
  const isChatEnd = useSelector((state) => getChatEnd(state));
  const dispatch = useDispatch(useDispatch);
  const subscriptionChannel = useSelector((state) =>
    getSubscriptionInfo(state)
  );
  useEffect(() => {
    //trigger API to get the prev and new messages to be rendered
    dispatch(getMsgs());
  }, []);
  useEffect(() => {
    if (subscriptionChannel != null && !isLoading) {
      //connect pusher once /getMsg api is done
      initPusher(subscriptionChannel);
      scrollToNewMsg();
    }
  }, [isLoading]);

  useEffect(() => {
    if (
      channelRef != null &&
      msgData.length &&
      msgData[msgData.length - 1].type === "text" &&
      !isChatEnd &&
      !isSocketLoading
    ) {
      //trigger client emit, whenever the last type is text and channelref is not null
      dispatch(toggleSocketLoader(true))
      dispatch(postReadStatus());
      triggerClientEmit();
    }
  }, [msgData, channelRef, isChatEnd, isSocketLoading]);
  const initPusher = ({ channel_name, userId }) => {
    const channel = pusher.subscribe(channel_name);
    channel.bind("pusher:subscription_succeeded", () => {
      //triggers can be used only after successful subscription
      //updating channel in store
      dispatch(setChannelRef(channel));
      channel.bind("server-message", (data) => {
        dispatch(appendEndConvo(data));
        dispatch(toggleSocketLoader(false))
        dispatch(postDeliveredStatus());
      });
    });
    pusher.connection.bind("error", (err) => {
      console.log(err, "connection error");
    });
    pusher.connection.bind("failed", (err) => {
      console.log(err, "connection failed");
    });
    pusher.connection.bind("connected", (data) => {});
  };
  const triggerClientEmit = () => {
    if (prevTimestamp.current != socketPayload.message.lastMessageTimeStamp) {
      //condition added to prevent multiple socket call for same timestamp
      prevTimestamp.current = socketPayload.message.lastMessageTimeStamp;
      channelRef.trigger("client-widget-message", socketPayload);
    }
  };
  const scrollToNewMsg = () => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollIntoView({ behaviour: "smooth", block: "end" });
      }, 50);
    }
  };
  return (
    <div className="h-4/5 rounded-b-xl bg-white relative z-2 pt-4 px-4 pb-0 chatmain__headerwrapper overflow-y-auto zi_scroll">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="pb-4">
          {msgData.map((obj, i) => {
            {
              if (msgData.length - 1 == i) {
                scrollToNewMsg();
              }
              return <ChatHolder key={i} data={obj} />;
            }
          })}
          {isSocketLoading && (
            <p className="text-sm text-gray-400 text-left ml-8">loading...</p>
          )}
          <div ref={scrollRef}></div>
        </div>
      )}
    </div>
  );
}
