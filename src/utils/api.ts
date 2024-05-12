import axios from "./axios";

//获取首页4个卡片的数据 /api/home/getCardData
export const getCardDataRequest = () => {
  return new Promise((resovle, reject) => {
    const res = axios.get("/api/home/getCardData");
    resovle(res);
  });
};

//获取所有的分类列表 /api/types/getAllList
export const getTypesListRequest = () => {
  return new Promise((resovle, reject) => {
    const res = axios.get("/api/types/getAllList");
    resovle(res);
  });
};
