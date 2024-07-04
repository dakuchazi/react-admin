import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { findUserRequest } from "@/utils/api";

const initialState = {
  info: {
    name: "",
    role: "",
    avatar: "",
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
    { label: "说说", path: "/post", icon: "MessageOutlined", isShow: true },
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
  avatarLoading: true,
};
// // createAsyncThunk这个API可以用来设置异步方法,我们可以通过这个API来让redux支持异步。
export const getUserInfoAsync: any = createAsyncThunk<
  any,
  { username: string }
>("post/findUser", async (params, api) => {
  const res: any = await findUserRequest(params);
  return res;
});

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

  //extraReducers字段可以让slice处理在其他地方定义的action
  //pengding rejected 可以用来处理等待和失败
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfoAsync.pending, (state) => {
        state.avatarLoading = true;
      })
      .addCase(getUserInfoAsync.rejected, (state) => {
        state.avatarLoading = false;
      })
      .addCase(getUserInfoAsync.fulfilled, (state, action) => {
        state.avatarLoading = false;
        state.info = action.payload;
      });
  },
});

export const selectUserInfo = (state: RootState) => {
  return state.user.info;
};

export const selectUserRoutes = (state: RootState) => {
  return state.user.routes;
};

export const selectAvatarLoading = (state: RootState) => {
  return state.user.avatarLoading;
};

export default userSlice.reducer;
