import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/axios";
const initialState = {
  status: "idle",
  config: {},
  activeScreen: "chat_list",
};

export const widgetConfigSlice = createSlice({
  name: "widgetConfig",
  initialState,
  reducers: {
    switchScreen: (state, action) => {
      state.activeScreen = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.config = action.payload;
        state.status = "success";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { switchScreen } = widgetConfigSlice.actions;
//DATA SELECTORS
export const getWelcomeMessage = (state) => {
  return state?.widgetConfig?.popupMessage?.message || "";
};
export const getLoadingState = (state) => {
  return state.widgetConfig.status;
};
export const getBotInfo = (state) => {
  return state.widgetConfig.config.settings.bot;
};
export const getCurrentScreen = (state) => {
  return state.widgetConfig.activeScreen;
};
//API ACTION CREATORS
export const getUser = createAsyncThunk("widgetConfig/getUser", async () => {
  const response = await API.get(
    "/getuser?url=staging0.web-test.insent.ai%2Ffe-assignment"
  );
  return response.data;
});

export default widgetConfigSlice.reducer;
