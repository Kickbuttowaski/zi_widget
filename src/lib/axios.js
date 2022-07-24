import axios from "axios";
import { getProjectKey, getUserId } from "../utils/authHeaders";
//added hardcoded values for testing
const AXIOS_CONFIG = {
  baseURL: `https://insentstaging.api.insent.ai`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // channelid: "private-9dX8bzfTJPLxRPmv816585760723431658576075381",
    // userid: "9dX8bzfTJPLxRPmv81658576072343",
  },
};

const axiosClient = axios.create(AXIOS_CONFIG);
axiosClient.interceptors.request.use(
  function (config) {
    let projectKey = getProjectKey();
    let userIds = getUserId();

    if (projectKey === null) {
      //prevent API call if project key is missing
      throw new axios.Cancel("Project key missing");
    }
    if (userIds != null) {
      config.headers.channelid = userIds.channelId;
      config.headers.userid = userIds.userId;
    }
    config.headers.authorization = `Bearer ${projectKey}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axiosClient;
