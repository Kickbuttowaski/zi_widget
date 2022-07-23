import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUser, getLoadingState,switchScreen } from "../../store/reducer/widgetInfoReducer";
import FloaterIcon from "../FloaterIcon/FloaterIcon";
import ChatLayout from "../../pages/ChatLayout/ChatLayout";
export default function WidgetWrapper() {
  const isFirstClickMade = useRef(false);
  const loadingStatus = useSelector((state) => getLoadingState(state));
  const dispatch = useDispatch();
  useEffect(() => {
    //trigger widget config API
    //to set intial configuration data for the chat
    dispatch(getUser());
  }, []);
  const [isIconOpen, setIcon] = useState(false);
  const toggleIcon = () => {
    if (!isFirstClickMade.current) {
      isFirstClickMade.current = true;
    }
    dispatch(switchScreen("chat"))
    setIcon((flag) => !flag);
  };
  console.log(loadingStatus,"loadingStatus")
  return loadingStatus !== "success" ? (
    <div>Loading...</div>
  ) : (
    <div>
      {isIconOpen ? (
        <ChatLayout closeChat={toggleIcon} />
      ) : (
        <FloaterIcon showMSG={!isFirstClickMade.current} onClick={toggleIcon} />
      )}
    </div>
  );
}
