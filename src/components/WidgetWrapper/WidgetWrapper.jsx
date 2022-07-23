import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getUser,
  getWelcomeMessage,
  getLoadingState,
} from "../../store/reducer/widgetInfo";
import FloaterIcon from "../FloaterIcon/FloaterIcon";
import ChatLayout from "../../pages/ChatLayout/ChatLayout";
export default function WidgetWrapper() {
  const loadingStatus = useSelector((state) => getLoadingState(state));
  const popupMessage = useSelector((state) => getWelcomeMessage(state));
  const dispatch = useDispatch();
  useEffect(() => {
    //trigger widget config API
    dispatch(getUser());
  }, []);
  console.log(popupMessage, "popupMessage");
  const [isIconOpen, setIcon] = useState(false);
  const toggleIcon = () => setIcon((flag) => !flag);
  return loadingStatus !== "success" ? (
    <div>Loading...</div>
  ) : (
    <div>
      {isIconOpen ? (
        <ChatLayout closeChat={toggleIcon} />
      ) : (
        <FloaterIcon onClick={toggleIcon} />
      )}
    </div>
  );
}
