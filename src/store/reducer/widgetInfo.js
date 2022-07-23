import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/axios";
const initialState = {
  status: 'idle',
  config: {},
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = 'pending';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.config = action.payload;
        state.isLoading = 'success';
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = 'failed';
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
//DATA SELECTORS
export const getWelcomeMessage = (state)=>{
    return state?.widgetInfo?.config?.popupMessage?.message || ''
}
export const getLoadingState = (state)=>{
    return state.widgetInfo.status
}
//API ACTION CREATORS
export const getUser = createAsyncThunk("widgetInfo/getUser", async () => {
  const response = await API.get(
    "/getuser?url=staging0.web-test.insent.ai%2Ffe-assignment"
  );
  return response.data;
});

export default counterSlice.reducer;
