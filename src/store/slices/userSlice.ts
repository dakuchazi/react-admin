import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { Children } from "react";

const initialState = {
  info: {
    name: "kucha",
    role: "admin",
    avatar: "https://s3.bmp.ovh/imgs/2024/06/14/441d3b27ca107c96.jpg",
  },
  routes: [
    { label: "首页", path: "/home", icon: "HomeOutlined", isShow: true },
    {
      label: "文章",
      path: "/article",
      icon: "FileWordOutlined",
      isShow: true,
      children: [
        {
          label: "新增/编辑",
          path: "/article/add",
          isShow: false,
        },
      ],
    },
    { label: "说说", path: "/post", icon: "MessageOutlined", isShow: false },
    {
      label: "留言板",
      path: "/comment",
      icon: "SignatureOutlined",
      isShow: true,
    },
    { label: "友链", path: "/link", icon: "LinkOutlined", isShow: true },
    { label: "作品", path: "/work", icon: "BulbOutlined", isShow: true },
    {
      label: "建站日志",
      path: "/log",
      icon: "SolutionOutlined",
      isShow: true,
    },
    {
      label: "关于",
      path: "/about",
      icon: "CoffeeOutlined",
      isShow: true,
      children: [
        {
          label: "新增/编辑",
          path: "/about/add",
          isShow: false,
        },
      ],
    },
    { label: "草稿箱", path: "/draft", icon: "SaveOutlined", isShow: true },
  ],
};
// // createAsyncThunk这个API可以用来设置异步方法,我们可以通过这个API来让redux支持异步。
// export const post_data_async: any = createAsyncThunk(
//   "post/data",
//   async (params, api) => {
//     // const res: any = await post_data_request(params);
//     // return res.data;
//   }
// );

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //同步修改state
    seInfo(state) {
      state.info = state.info;
    },
    setRoutes(state) {
      state.routes = state.routes;
    },
  },
});

export const selectUserInfo = (state: RootState) => {
  return state.user.info;
};

export const selectUserRoutes = (state: RootState) => {
  return state.user.routes;
};

export default userSlice.reducer;
