import React, { useState } from "react";
import FloaterIcon from "../FloaterIcon/FloaterIcon";
import ChatLayout from "../../pages/ChatLayout/ChatLayout";
export default function WidgetWrapper() {
  const [isIconOpen, setIcon] = useState(false);
  const toggleIcon = () => setIcon((flag) => !flag);
  return (
    <div>
      {isIconOpen ? <ChatLayout closeChat={toggleIcon}/> : <FloaterIcon onClick={toggleIcon} />}
    </div>
  );
}
