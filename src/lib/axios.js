import axios from "axios";

//added hardcoded values for testing
const AXIOS_CONFIG = {
  baseURL: `https://insentstaging.api.insent.ai`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization:"Bearer 2LejamM1576236866754",
    channelid:"private-9dX8bzfTJPLxRPmv816585760723431658576075381",
    userid: "9dX8bzfTJPLxRPmv81658576072343"
  },
};
const axiosClient = axios.create(AXIOS_CONFIG);

export default axiosClient;
