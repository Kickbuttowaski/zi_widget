import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChannelRef } from "../../../store/reducer/pusherReducer";
import { getBotInfo } from "../../../store/reducer/widgetInfoReducer";
import {
  getClientmsgSocketData,
  postDeliveredStatus,
  postReadStatus,
} from "../../../store/reducer/chatDataReducer";
import { epochToReadable } from "../../../utils/timeFormatter";
import { chatBubbleCSS } from "../../../utils/dynamicCSS";
export default function ChatHolder({ data }) {
  const renderChat = () => {
    //based on msg type return components
    if ("text" in data) {
      return <TextData data={data} />;
    } else if ("buttons" in data) {
      return <ChatButtons buttons={data.buttons} />;
    } else if ("newSession" in data) {
      return <TimeStamp time={data.time} />;
    }
  };
  return renderChat();
}

const ChatAvatar = ({ name = "", img }) => {
  return (
    <img
      loading="lazy"
      style={{ width: "29px", height: "29px" }}
      className="rounded-full border-2 border-primary"
      title={name}
      src={img}
      alt="usr_avatar"
    />
  );
};
const TimeStamp = ({ time }) => {
  return (
    <div className="text-xs text-gray-400 italic text-center mb-2">
      {epochToReadable(time)}
    </div>
  );
};
const TextData = ({ data }) => {
  const botData = useSelector((state) => getBotInfo(state));
  //type check to align chat bubble position (left | right)
  return (
    <div className={chatBubbleCSS(data.lead)}>
      <div className="flex gap-4 items-center mb-4">
        {!data.lead && (
          <ChatAvatar name={data.name || ""} img={data.img || botData.img} />
        )}
        <p
          className={`${chatBubbleCSS(
            data.lead,
            "wing_direction"
          )} m-0 rounded-xl  px-8 py-2`}
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
      </div>
    </div>
  );
};

const ChatButtons = ({ buttons }) => {
  // need to add id's for each button
  const dispatch = useDispatch();
  const channelRef = useSelector((state) => getChannelRef(state));
  const socketData = useSelector((state) => getClientmsgSocketData(state));
  const handleClick = (e) => {
    let dataKey = e.target.getAttribute("data-key");

    if (dataKey) {
      let dataLabel = e.target.getAttribute("data-label");
      let formattedPayload = { ...socketData };
      formattedPayload["message"][dataKey] = [dataLabel];
      console.log(formattedPayload, "formattedPayload");
      channelRef.trigger("client-widget-message", formattedPayload);
    }
  };
  return (
    <div className="w-full text-right" onClick={handleClick}>
      {buttons.fields.map((btnText) => {
        return (
          <button
            className="text-left text-sm border-solid border border-blue-600 px-4 py-1 rounded-lg max-w-215px mr-2"
            key={btnText}
            data-key={buttons.key}
            data-label={btnText}
          >
            {btnText}
          </button>
        );
      })}
    </div>
  );
};
