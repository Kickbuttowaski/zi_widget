import axios from "axios";

const AXIOS_CONFIG = {
  baseURL: `https://insentstaging.api.insent.ai`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization:"Bearer 2LejamM1576236866754",
    channelid:"private-rZJn7zBsdTerfTtJC16585216361861658521638635"
  },
};
const axiosClient = axios.create(AXIOS_CONFIG);

export default axiosClient;
