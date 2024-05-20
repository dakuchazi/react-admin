import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCountDataRequest } from "@/utils/api";
import type { RootState } from "../index";

const initialState = {
  countData: [
    { title: "文章数", total: null },
    { title: "说说数", total: null },
    { title: "留言数", total: null },
    { title: "友链数", total: null },
    { title: "日志数", total: null },
  ],
  countDataLoading: true,
};

// // createAsyncThunk这个API可以用来设置异步方法,我们可以通过这个API来让redux支持异步。

//获取首页分类列表的数据
export const getCountDataAsync = createAsyncThunk(
  "get/countData",
  async (params, api) => {
    const res: any = await getCountDataRequest();
    return res;
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    //同步修改state
    // setCollapsed(state) {
    //     state.collapsed = !state.collapsed;
    // },
  },

  //extraReducers字段可以让slice处理在其他地方定义的action
  //pengding rejected 可以用来处理等待和失败
  extraReducers: (builder) => {
    builder
      .addCase(getCountDataAsync.rejected, (state) => {
        state.countDataLoading = false;
      })
      .addCase(getCountDataAsync.fulfilled, (state, action) => {
        state.countData = action.payload;
        state.countDataLoading = false;
      });
  },
});

export const selectCountData = (state: RootState) => {
  return state.home.countData;
};

export const selectCountLoading = (state: RootState) => {
  return state.home.countDataLoading;
};

export default homeSlice.reducer;
