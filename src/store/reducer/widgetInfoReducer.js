import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/axios";
const initialState = {
  status: "idle",
  config: {},
};

export const widgetConfigSlice = createSlice({
  name: "widgetConfig",
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
        state.status = "pending";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.config = action.payload.config;
        state.status = "success";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { increment, decrement, incrementByAmount } = widgetConfigSlice.actions;
//DATA SELECTORS
export const getWelcomeMessage = (state) => {
  return state?.widgetConfig?.popupMessage?.message || "";
};
export const getLoadingState = (state) => {
  return state.widgetConfig.status;
};
//API ACTION CREATORS
export const getUser = createAsyncThunk("widgetConfig/getUser", async () => {
  const response = await API.get(
    "/getuser?url=staging0.web-test.insent.ai%2Ffe-assignment"
  );
  return response.data;
});

export default widgetConfigSlice.reducer;
