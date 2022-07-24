import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWelcomeMessage } from "../../store/reducer/widgetInfoReducer";
export default function FloaterIcon({ onClick, showMSG }) {
  const welcomeMsg = useSelector((state) => getWelcomeMessage(state));
  //render based on the welcome message status (true | false)
  return showMSG && welcomeMsg.length ? (
    <div
      className="mr-8 mb-8 p-4 drop-shadow-lg flex border-b-8 border-primary rounded-xl w-full bg-white cursor-pointer"
      onClick={onClick}
    >
      <p
        className="max-w-240px mr-4"
        dangerouslySetInnerHTML={{ __html: welcomeMsg }}
      />
      <Icon width={60} height={60} />
    </div>
  ) : (
    <div className="mr-8 mb-8 cursor-pointer" onClick={onClick}>
      <Icon />
    </div>
  );
}
const Icon = ({ width = 60, height = 60 }) => {
  return (
    <img
      width={width}
      height={height}
      alt="chat_icon"
      src="https://via.placeholder.com/60?text=WI"
      className="rounded-full"
      loading="lazy"
    />
  );
};
