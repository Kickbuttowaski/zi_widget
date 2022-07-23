import React from "react";
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
  //type check to align chat bubble position (left | right)
  return (
    <div className={chatBubbleCSS(data.lead)}>
      <div className="flex gap-4 items-center mb-4">
        {!data.lead && <ChatAvatar name={data.name} img={data.img} />}
        <p
          className={`${chatBubbleCSS(
            data.lead,
            "wing_direction"
          )} m-0 rounded-xl  px-8 py-2 bg-bubblegray-light text-bubblegray-dark`}
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
      </div>
    </div>
  );
};

const ChatButtons = ({ buttons }) => {
  // need to add id's for each button
  return (
    <div className="w-full text-right">
      {buttons.fields.map((btnText) => {
        return (
          <button
            className="text-left text-sm border-solid border border-blue-600 px-4 py-1 rounded-lg max-w-215px mr-2"
            key={btnText}
          >
            {btnText}
          </button>
        );
      })}
    </div>
  );
};
