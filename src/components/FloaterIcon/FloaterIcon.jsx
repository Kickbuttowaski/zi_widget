import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWelcomeMessage } from "../../store/reducer/widgetInfoReducer";
import WidgetIcon from "../DesignComponents/WidgetIcon";
export default function FloaterIcon({ onClick, showMSG }) {
  const welcomeMsg = useSelector((state) => getWelcomeMessage(state));
  //render based on the welcome message status (true | false)
  return showMSG && welcomeMsg.length ? (
    <div
      className="mr-8 mb-8 p-4 drop-shadow-lg flex border-b-8 border-primary rounded-xl w-full bg-white cursor-pointer floater_wrapper"
      onClick={onClick}
    >
      <p
        className="max-w-240px mr-4"
        dangerouslySetInnerHTML={{ __html: welcomeMsg }}
      />
      <WidgetIcon />
    </div>
  ) : (
    <div className="mr-8 mb-8 cursor-pointer floater_wrapper" onClick={onClick}>
      <WidgetIcon />
    </div>
  );
}

