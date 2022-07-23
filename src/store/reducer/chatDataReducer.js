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
};

export const chatDataSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMsgs.pending, (state, action) => {
        state.currChat = [];
        state.prevChat = [];
      })
      .addCase(getMsgs.fulfilled, (state, action) => {
        state.senderInfo = action.payload.sender;
        state.currChat = action.payload.messages;
        state.prevChat = action.payload.prevMessages;
        state.isLoading = false;
      })
      .addCase(getMsgs.rejected, (state, action) => {
        state.senderInfo = null;
        state.isLoading = false;
      })
      .addCase(getChannelList.pending, (state, action) => {
        state.channelList = [];
      })
      .addCase(getChannelList.fulfilled, (state, action) => {
        state.channelList = action.payload
        state.isChannelLoading = false;
      })
      .addCase(getChannelList.rejected, (state, action) => {
        state.isChannelLoading = false;
      });
  },
});

//export const {} = chatDataSlice.actions;
//DATA SELECTORS

export const getLoadingState = (state, key = "isLoading") => {
  return state.chatData[key];
};
export const getMsgArr = (state) => {
  return [...state.chatData.prevChat, ...state.chatData.currChat];
};
export const getChannelListArr = (state) => {
  return state.chatData.channelList;
};
//API ACTION CREATORS
export const getMsgs = createAsyncThunk("chatData/getMsg", async () => {
  const response = await API.get(ENDPOINT.GET_MESSAGE);
  return response.data;
});
export const getChannelList = createAsyncThunk(
  "chatData/getChannelList",
  async () => {
    const response = await API.get(ENDPOINT.GET_CHANNELS_LIST);
    return response.data;
  }
);

export default chatDataSlice.reducer;
