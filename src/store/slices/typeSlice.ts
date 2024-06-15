import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTypeListRequest } from "@/utils/api";
import type { RootState } from "../index";

const initialState = {
  typeData: [],
  typeLoading: true,
};

// // createAsyncThunk这个API可以用来设置异步方法,我们可以通过这个API来让redux支持异步。

//获取首页分类列表的数据
export const getTypeListAsync = createAsyncThunk(
  "get/typeData",
  async (params, api) => {
    const res: any = await getTypeListRequest();
    return res;
  }
);

const typeSlice = createSlice({
  name: "type",
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
      .addCase(getTypeListAsync.pending, (state) => {
        state.typeLoading = true;
      })
      .addCase(getTypeListAsync.rejected, (state) => {
        state.typeLoading = false;
      })
      .addCase(getTypeListAsync.fulfilled, (state, action) => {
        state.typeData = action.payload;
        state.typeLoading = false;
      });
  },
});

export const selectTypeData = (state: RootState) => {
  return state.type.typeData;
};

export const selectTypeLoading = (state: RootState) => {
  return state.type.typeLoading;
};

export default typeSlice.reducer;
