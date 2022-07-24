import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/axios";
import ENDPOINT from "../../data/endpoints";
import { getUserId } from "../../utils/authHeaders";
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
};

export const chatDataSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {
    appendEndConvo: (state, action) => {
      //formatting currChat with newMsg(bot name) and re-add the currChat again to start a new chat
      let newMsg = {
        attachments: [],
        lead: true,
        text: `@${action.payload}`,
        time: Date.now(),
      };
      state.currChat = [...state.currChat, newMsg, ...state.currChat];
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

export const { appendEndConvo } = chatDataSlice.actions;
//DATA SELECTORS

export const getLoadingState = (state, key = "isLoading") => {
  return state.chatData[key];
};
export const getMsgArr = (state) => {
  if (state.chatData.chatObj === null) return [];

  return [
    ...state.chatData.chatObj.prevMessages,
    ...state.chatData.chatObj.messages,
  ];
};
export const getClientmsgSocketData = (state) => {
  if (state.chatData.chatObj === null) return 0;
  let { messageTimestamp, channelId } = state.chatData.chatObj;
  return {
    channelName: channelId,
    message: { lastMessageTimeStamp: messageTimestamp },
  };
};
export const getChannelListArr = (state) => {
  return state.chatData.channelList;
};
//API ACTION CREATORS
export const getMsgs = createAsyncThunk(
  "chatData/getMsg",
  async (cid = undefined, { getState }) => {
    cid = cid === undefined ? getState().widgetConfig.config.channelId : cid;
    let formattedURL = ENDPOINT.GET_MESSAGE + cid;
    const response = await API.get(formattedURL);
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
    let formattedURL = ENDPOINT.GET_MESSAGE + cid + "/read";
    const response = await API.post(formattedURL);
    return response.data;
  }
);

export default chatDataSlice.reducer;
