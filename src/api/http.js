import axios from "axios";
import router from "@/router";
import { getToken, clearToken } from "@/api/auth";

const apiService = axios.create({
  baseURL: process.env.VUE_APP_API_HOST
});

apiService.interceptors.request.use(
  config => {
    config.headers["X-Source"] = "1d58f014-3903-484e-99be-3948126f9da9";
    config.headers["X-Version"] = process.env.VUE_APP_VERSION;
    config.headers["X-Device"] = window.navigator.userAgent;
    config.headers["Content-Type"] = "application/json";
    config.headers["X-Authorization"] = getToken();
    return config;
  },
  err => {
    Promise.reject(err);
  }
);

apiService.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.status === -3) {
      clearToken();
      router.replace("/login");
      throw "认证错误";
    } else if (res.status === -2) {
      throw "服务器错误";
    } else if (res.status === -1) {
      throw "客户端错误";
    }

    return res;
  },
  err => {
    console.log("接口错误");
    console.error(err);
    return Promise.reject("接口错误");
  }
);

export default apiService;
