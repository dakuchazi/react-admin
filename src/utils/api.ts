import axios from "./axios";

// 与后台约定的业务数据规范
type AxiosData<T = any> = {
  message: string;
  code: string,
  data: T,
}

//响应拦截器返回来的res的type
type AxiosRes<T = AxiosData> = {
  config: Object,
  data: T,
  headers: any,
  request: any,
  status: number,
  statusText: string
}



//获取首页4个卡片的数据 /api/home/getCardData
export type CardData = {
  title: string,
  total: number | null
}
export const getCardDataRequest = () => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData<CardData[]> = await axios.get("/api/home/getCardData");
    resovle(res.data);
  }) as Promise<CardData[]>
};

//获取所有的分类列表 /api/types/getTypeList
export const getTypesListRequest = () => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.get("/api/types/getTypeList");
    resovle(res.data);
  });
};

//删除分类 /api/types/deleteType
export const deleteTypeRequest = (parmas: { _id: string }) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/types/deleteType", parmas);
    resovle(res)
  }) as Promise<AxiosData>
};

//添加分类 /api/types/deleteType
export const addTypeRequest = (parmas: { name: string }) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/types/addType", parmas);
    resovle(res)
  }) as Promise<AxiosData>
};

//更新分类 /api/types/updateType
export const updateTypeRequest = (parmas: { name: string, _id: string }) => {
  return new Promise(async (resovle, reject) => {
    const res: AxiosData = await axios.post("/api/types/updateType", parmas);
    resovle(res)
  }) as Promise<AxiosData>
};