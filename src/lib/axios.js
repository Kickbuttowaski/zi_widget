import axios from "axios";

const AXIOS_CONFIG = {
  baseURL: `https://api.example.com`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
const axiosClient = axios.create(AXIOS_CONFIG);

export default axiosClient;
