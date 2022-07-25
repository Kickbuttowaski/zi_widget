import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChannelRef } from "../../../store/reducer/pusherReducer";
import { getBotInfo } from "../../../store/reducer/widgetInfoReducer";
import {
  getClientmsgSocketData,
  updateReply,
} from "../../../store/reducer/chatDataReducer";
import { epochToReadable } from "../../../utils/timeFormatter";
import { chatBubbleCSS } from "../../../utils/dynamicCSS";
import { validateInput } from "../../../utils/validation";
export default function ChatHolder({ data }) {
  const renderChat = () => {
    //based on msg type return components
    if ("text" in data) {
      return <TextData data={data} />;
    } else if ("buttons" in data) {
      return <ChatButtons buttons={data.buttons} />;
    } else if ("newSession" in data) {
      return <TimeStamp time={data.time} />;
    } else if ("input" in data) {
      return <ChatInput data={data.input} />;
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
const ChatInput = ({ data }) => {
  const [isDisabled, setDisabled] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const channelRef = useSelector((state) => getChannelRef(state));
  const socketData = useSelector((state) => getClientmsgSocketData(state));
  let inputAttr = data[0];
  const handleSubmit = (e) => {
    let ele = document.getElementById("zi_input");
    let dataKey = ele.getAttribute("data-key");
    let dataValue = ele.value;
    if (ele && dataKey) {
      if (validateInput(dataValue,dataKey)) {
        let formattedPayload = { ...socketData };
        formattedPayload["message"][dataKey] = dataValue;
        channelRef.trigger("client-widget-message", formattedPayload);
        ele.removeAttribute("id");
        setDisabled(true);
        setError(null);
      } else {
        setError(`please enter a valid ${dataKey}`);
      }
    }
  };
  return (
    <div className={chatBubbleCSS(false)}>
      <div className="flex gap-4 items-center mb-4 ml-10 w-full">
        <div
          className={`${chatBubbleCSS(
            false,
            "wing_direction"
          )} m-0 rounded-xl  px-8 py-2  w-4/5`}
        >
          <p className="font-bold text-md text-left">{inputAttr.name}</p>
          {error != null && <p className="text-red-400 text-sm text-left">{error}</p>}
          <div className="flex h-10 bg-white border-gray-600 rounded-md pl-4">
            <input
              placeholder={`Enter your ${inputAttr.name.toLowerCase()}`}
              type={inputAttr.type}
              name={inputAttr.name}
              className="h-10 border w-full outline-none border-none"
              data-key={inputAttr.key}
              id="zi_input"
            />
            {!isDisabled && (
              <button
                onClick={handleSubmit}
                className="outline-none border-none bg-primary pr-2 pl-2 rounded-tr-md rounded-br-md text-white"
              >
                send
              </button>
            )}
          </div>
        </div>
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
      dispatch(
        updateReply({
          key: dataKey,
          text: dataLabel,
          lead: true,
          img: "https://staging-uploads.insent.ai/insentstaging/logo-insentstaging-1657874092041?1657874092120",
        })
      );
      let formattedPayload = { ...socketData };
      formattedPayload["message"][dataKey] = [dataLabel];
      //dispatch(postReadStatus());
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
