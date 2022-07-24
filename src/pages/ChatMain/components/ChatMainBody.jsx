import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pusher from "pusher-js";
import {
  getLoadingState,
  getMsgs,
  getMsgArr,
  postReadStatus,
  getClientmsgSocketData,
} from "../../../store/reducer/chatDataReducer";
import { getSubscriptionInfo } from "../../../store/reducer/widgetInfoReducer";
import ChatHolder from "./ChatHolder";
import { LS } from "../../../utils/authHeaders";
const USER_ID = JSON.parse(LS.get("zi_config")).userId
const pusher = new Pusher("67bb469433cb732caa7a", {
  cluster: "mt1",
  channelAuthorization: {
    endpoint:
      "https://insentstaging.api.insent.ai/pusher/presence/auth/visitor?userid=" +
      USER_ID,
  },
});
export default function ChatMainBody() {
  const isLoading = useSelector((state) => getLoadingState(state));
  const msgData = useSelector((state) => getMsgArr(state));
  const socketPayload = useSelector((state) => getClientmsgSocketData(state));
  const dispatch = useDispatch(useDispatch);
  const subscriptionChannel = useSelector((state) =>
    getSubscriptionInfo(state)
  );
  useEffect(() => {
    //trigger API to get the prev and new messages to be rendered
    dispatch(getMsgs());
  }, []);
  useEffect(() => {
    if (subscriptionChannel !=null && !isLoading) {
      //dispatch(postReadStatus());
      console.log("CONNECT")
      initPusher(subscriptionChannel);
    }
  }, [subscriptionChannel, isLoading]);
  const initPusher = ({ channel_name, userId }) => {
    const channel = pusher.subscribe(channel_name);
    channel.bind("pusher:subscription_succeeded", () => {
      //triggers can be used only after successful subscription
      // socketPayload['senderId'] = USER_ID
      // channel.trigger("client-widget-message", socketPayload);
    })
    pusher.connection.bind("error", (err) => {
      console.log(err, "connection error");
    });
    pusher.connection.bind("failed", (err) => {
      console.log(err, "connection failed");
    });
    pusher.connection.bind("connected", (data) => {
      console.log("Pusher connected", channel_name);    
      channel.bind("server-message", (data) => {
        console.log(data, "server-message");
      });
    });
  };
  return (
    <div className="h-4/5 rounded-b-xl bg-white relative z-2 py-4 px-4 chatmain__headerwrapper overflow-y-auto">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {msgData.map((obj, i) => {
            return <ChatHolder key={i} data={obj} />;
          })}
        </div>
      )}
    </div>
  );
}
