import widgetInfoReducer from "./reducer/widgetInfoReducer";
import chatDataReducer from "./reducer/chatDataReducer";
import pusherReducer from "./reducer/pusherReducer";
const combineReducers = {
  widgetConfig: widgetInfoReducer,
  chatData:chatDataReducer,
  pusher:pusherReducer
};

export default combineReducers
