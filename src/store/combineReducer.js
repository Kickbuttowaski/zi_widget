import widgetInfoReducer from "./reducer/widgetInfoReducer";
import chatDataReducer from "./reducer/chatDataReducer";
const combineReducers = {
  widgetConfig: widgetInfoReducer,
  chatData:chatDataReducer
};

export default combineReducers
