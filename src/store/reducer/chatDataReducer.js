import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/axios";
import ENDPOINT from "../../data/endpoints";
const initialState = {
  status: "idle",
  isLoading: true,
  isChannelLoading: true,
  currChat: [],
  prevChat: [],
  senderInfo: {},
  channelList: [],
  activeChannelId: null,
  chatObj: null,
  socketLoader: false,
};

export const chatDataSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    restartConvo: (state, action) => {
      let toJSON = { ...state.currChat[0] };
      if ("button" in toJSON && "input" in toJSON) {
        //if button/inputs exsists overwrite without concat
        //to remove elements from UI
        state.prevChat.push(...state.currChat);
      }
      state.currChat = [
        {
          text: "@" + state.chatObj.sender.name,
          lead: true,
          img: "https://staging-uploads.insent.ai/insentstaging/logo-insentstaging-1657874092041?1657874092120",
        },
      ];
    },
    appendEndConvo: (state, action) => {
      let msgType = action.payload?.messages?.type || undefined;
      if (action.payload.end || msgType !== "text") {
        //to disable socket loader
        state.socketLoader = false;
      }
      //appending new message to the curr array and merge prev + curr arr
      state.prevChat.push(...state.currChat);
      state.currChat = action.payload.messages;
      state.chatObj = action.payload;
    },
    updateReply: (state, action) => {
      //state.prevChat.push(...state.currChat);
      //updating user response as current message
      //will remove button from ui
      state.socketLoader = true;
      state.currChat = [action.payload];
    },
    toggleSocketLoader: (state, action) => {
      state.socketLoader = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getMsgs.pending, (state, action) => {
        state.isLoading = true;
        state.currChat = [];
        state.prevChat = [];
      })
      .addCase(getMsgs.fulfilled, (state, action) => {
        state.chatObj = action.payload;
        state.senderInfo = action.payload.sender;
        state.currChat = action.payload.messages || [];
        state.prevChat = action.payload.prevMessages || [];
        state.activeChannelId = action.payload.channelId;
        state.user_id = action.payload.user_id;
        state.isLoading = false;
      })
      .addCase(getMsgs.rejected, (state, action) => {
        state.chatObj = null;
        state.senderInfo = null;
        state.isLoading = false;
      })
      .addCase(getChannelList.pending, (state, action) => {
        state.isChannelLoading = true;
        state.channelList = [];
      })
      .addCase(getChannelList.fulfilled, (state, action) => {
        state.channelList = action.payload;
        state.isChannelLoading = false;
      })
      .addCase(getChannelList.rejected, (state, action) => {
        state.isChannelLoading = false;
      });
  },
});

export const { appendEndConvo, updateReply, restartConvo, toggleSocketLoader } =
  chatDataSlice.actions;
//DATA SELECTORS

export const getLoadingState = (state, key = "isLoading") => {
  return state.chatData[key];
};
export const getMsgArr = (state) => {
  if (state.chatData.chatObj === null) return [];

  return [...state.chatData.prevChat, ...state.chatData.currChat];
};
export const getClientmsgSocketData = (state) => {
  if (state.chatData.chatObj === null) return 0;
  let { messageTimestamp, channelId } = state.chatData.chatObj;
  return {
    channelName: channelId,
    message: { lastMessageTimeStamp: messageTimestamp },
    senderId: state.chatData.user_id,
  };
};
export const getChannelListArr = (state) => {
  return state.chatData.channelList;
};
export const getChatEnd = (state) => {
  if (state.chatData.chatObj === null) return false;
  return state.chatData.chatObj.end;
};
export const getSocketLoader = (state) => {
  return state.chatData.socketLoader;
};
//API ACTION CREATORS
export const getMsgs = createAsyncThunk(
  "chatData/getMsg",
  async (cid = undefined, { getState }) => {
    cid = cid === undefined ? getState().widgetConfig.config.channelId : cid;
    let uid = getState().widgetConfig.config.user.id;
    let formattedURL = ENDPOINT.GET_MESSAGE + cid;
    const response = await API.get(formattedURL);
    response.data["user_id"] = uid;
    return response.data;
  }
);
export const getChannelList = createAsyncThunk(
  "chatData/getChannelList",
  async () => {
    const response = await API.get(ENDPOINT.GET_CHANNELS_LIST);
    return response.data;
  }
);
export const postReadStatus = createAsyncThunk(
  "chatData/read",
  async (undefined, { getState }) => {
    let cid = getState().widgetConfig.config.channelId;
    let isUnread = getState().chatData.chatObj.unread;
    if (isUnread) {
      let formattedURL = ENDPOINT.GET_MESSAGE + cid + "/read";
      const response = await API.post(formattedURL);
      return response.data;
    }
  }
);
export const postDeliveredStatus = createAsyncThunk(
  "chatData/delivered",
  async (undefined, { getState }) => {
    let cid = getState().widgetConfig.config.channelId;

    let formattedURL = ENDPOINT.GET_MESSAGE + cid + "/delivered";
    const response = await API.post(formattedURL);
    return response.data;
  }
);

export default chatDataSlice.reducer;
