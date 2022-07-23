import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/axios";
import ENDPOINT from "../../data/endpoints";
const initialState = {
  status: "idle",
  isLoading:true,
  currChat: [],
  prevChat:[],
  senderInfo:{}
};

export const chatDataSlice = createSlice({
  name: "chatData",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMsgs.pending, (state, action) => {
        state.currChat =[];
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
      });
  },
});

//export const {} = chatDataSlice.actions;
//DATA SELECTORS

export const getLoadingState = (state) => {
  return state.chatData.isLoading;
};
export const getMsgArr = (state)=>{
  return [...state.chatData.prevChat,...state.chatData.currChat]
}
//API ACTION CREATORS
export const getMsgs = createAsyncThunk("chatData/getMsg", async () => {
  const response = await API.get(ENDPOINT.GET_MESSAGE);
  return response.data;
});

export default chatDataSlice.reducer;
