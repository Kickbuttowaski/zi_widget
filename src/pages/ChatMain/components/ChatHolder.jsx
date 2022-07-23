import React from "react";
import { epochToReadable } from "../../../utils/timeFormatter";
export default function ChatHolder({ data }) {
  //type check to align msg position
  const renderChat = () => {
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
      className="rounded-full border-2 border-emerald-400"
      title={name}
      src={img}
      alt="usr_avatar"
    />
  );
};
const TimeStamp = ({ time }) => {
  return (
    <div className="text-sm text-center mb-2">{epochToReadable(time)}</div>
  );
};
const TextData = ({ data }) => {
  const isBotCSSParent = !data.lead ? "flex w-full justify-start" : "flex w-full justify-end";
  return (
    <div className={isBotCSSParent}>
      <div className="flex gap-4 items-center mb-4">
        {!data.lead && <ChatAvatar name={data.name} img={data.img} />}
        <p
          className="m-0 rounded-md rounded-bl-sm px-8 py-2 bg-slate-200"
          dangerouslySetInnerHTML={{ __html: data.text }}
        />
      </div>
    </div>
  );
};

const ChatButtons = ({ buttons }) => {
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
