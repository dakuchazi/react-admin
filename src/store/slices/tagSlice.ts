import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTagListRequest } from "@/utils/api";
import type { RootState } from "../index";

const initialState = {
  tagData: [],
  tagLoading: true,
};

// // createAsyncThunk这个API可以用来设置异步方法,我们可以通过这个API来让redux支持异步。

//获取首页分类列表的数据
export const getTagListAsync = createAsyncThunk(
  "get/tagData",
  async (params, api) => {
    const res: any = await getTagListRequest();
    return res;
  }
);

const tagSlice = createSlice({
  name: "tag",
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
      .addCase(getTagListAsync.pending, (state) => {
        state.tagLoading = true;
      })
      .addCase(getTagListAsync.rejected, (state) => {
        state.tagLoading = false;
      })
      .addCase(getTagListAsync.fulfilled, (state, action) => {
        state.tagData = action.payload;
        state.tagLoading = false;
      });
  },
});

export const selectTagData = (state: RootState) => {
  return state.tag.tagData;
};

export const selectTagLoading = (state: RootState) => {
  return state.tag.tagLoading;
};

export default tagSlice.reducer;
