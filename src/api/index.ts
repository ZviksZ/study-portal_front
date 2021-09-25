import axios from "axios";
import config from "app/config";

const instance = axios.create({
  baseURL: config.apiHost,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  /* if (ACCESS_TKN.getToken()) {
    config.headers["Authorization"] = `Bearer ${ACCESS_TKN.getToken()}`;
  }*/
  return config;
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    /* if (error.response.status == 401) {
      store.dispatch(logout());
    }*/
    return Promise.reject(error);
  },
);

export default instance;
