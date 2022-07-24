import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getUser,
  getLoadingState,
  switchScreen,
} from "../../store/reducer/widgetInfoReducer";
import FloaterIcon from "../FloaterIcon/FloaterIcon";
//import ChatLayout from "../../pages/ChatLayout/ChatLayout";
const ChatLayout = React.lazy(() =>
  import("../../pages/ChatLayout/ChatLayout")
);
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
    //trigger POSTMESSAGE to inform iframe about chat status
    window.parent.postMessage({ isIconOpen: isIconOpen }, "*");
    dispatch(switchScreen("chat"));
    setIcon((flag) => !flag);
  };
  return loadingStatus !== "success" ? (
    <div>Loading...</div>
  ) : (
    <div>
      {isIconOpen ? (
        <Suspense fallback={<div>loading...</div>}>
          <ChatLayout closeChat={toggleIcon} />
        </Suspense>
      ) : (
        <FloaterIcon showMSG={!isFirstClickMade.current} onClick={toggleIcon} />
      )}
    </div>
  );
}
