import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../lib/axios";
import { setCSSVar } from "../../utils/dynamicCSS";
import { LS } from "../../utils/authHeaders";
import ENDPOINT from "../../data/endpoints";
const initialState = {
  status: "idle",
  config: {},
  activeScreen: "chat",
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
        //update local storage with channel and user ID
        let userData = {
          channelId: action.payload.channelId,
          userId: action.payload.user.id,
        };
        LS.set("zi_config", JSON.stringify(userData));
        //set CSS var values
        setCSSVar(action.payload.settings.color);

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
  return state?.widgetConfig?.config?.popupMessage?.message || "";
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
  const response = await API.get(ENDPOINT.GET_USER);

  return response.data;
});

export default widgetConfigSlice.reducer;
