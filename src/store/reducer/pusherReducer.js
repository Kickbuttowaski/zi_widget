import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/axios";

import ENDPOINT from "../../data/endpoints";
const initialState = {
  channel: null,
};

export const pusherSlice = createSlice({
  name: "pusher",
  initialState,
  reducers: {
    setChannelRef: (state, action) => {
      state.channel = action.payload;
    },
  },
});

export const { setChannelRef } = pusherSlice.actions;
//DATA SELECTORS

export const getChannelRef = (state) => {
  return state.pusher.channel;
};
//API ACTION CREATORS
export const getUser = createAsyncThunk("widgetConfig/getUser", async () => {
  const response = await API.get(ENDPOINT.GET_USER);
  return response.data;
});

export default pusherSlice.reducer;
