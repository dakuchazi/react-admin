import axios from "axios";
import EventBus from "./event";
const isDevelopment = process.env.NODE_ENV === "development";

const instance = axios.create({
  baseURL: isDevelopment ? "" : process.env.REACT_APP_API_URL, // 本地开发时使用相对路径，生产环境中使用环境变量
  validateStatus: function (status) {
    return status < 500; //这个不写的话  默认只有200-299的状态码才会resolve，其余的都会reject
  },
  timeout: 3000,
});

//请求拦截器
instance.interceptors.request.use(function (request) {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  console.log("===拦截器request===", request);
  return request;
});

//响应拦截器
instance.interceptors.response.use((response) => {
  console.log("===拦截器response===", response);
  if (response.data.code === "200") {
    return response.data;
  }
  if (response.data.code === 401) {
    EventBus.emit("global_bad_request", "出错了，请重新登录");
    EventBus.emit("global_not_login");
  }
  if (response.data.code === 400 || response.data.code === 403) {
    EventBus.emit("global_bad_request", response.data.message);
    return response.data;
  }
});

export default instance;
