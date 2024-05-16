import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCardDataRequest, getTypesListRequest } from "@/utils/api";
import type { RootState } from "../index";

const initialState = {
  typeData: [],
  typeCardLoading: true,
};

// // createAsyncThunk这个API可以用来设置异步方法,我们可以通过这个API来让redux支持异步。

//获取首页分类列表的数据
export const getTypesListAsync = createAsyncThunk(
  "get/typeCardData",
  async (params, api) => {
    const res: any = await getTypesListRequest();
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
      .addCase(getTypesListAsync.rejected, (state) => {
        state.typeCardLoading = false;
      })
      .addCase(getTypesListAsync.fulfilled, (state, action) => {
        state.typeData = action.payload;
        state.typeCardLoading = false;
      });
  },
});


export const selectTypesData = (state: RootState) => {
  return state.home.typeData;
};

export const selectCardLoading = (state: RootState) => {
  return state.home.typeCardLoading;
};

export default homeSlice.reducer;
