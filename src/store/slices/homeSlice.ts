import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCardDataRequest } from "@/utils/api";
import type { RootState } from "../index";

const initialState = {
  countCardData: [
    { title: "文章数", total: 0 },
    { title: "说说数", total: 0 },
    { title: "留言数", total: 0 },
    { title: "友链数", total: 0 },
    { title: "日志数", total: 0 },
  ],
  countCardLoading: false,
  typeData: [],
  typeCardLoading: false,
};

// // createAsyncThunk这个API可以用来设置异步方法,我们可以通过这个API来让redux支持异步。
//获取首页卡片的数据
export const getCardDataAsync = createAsyncThunk(
  "get/countCardData",
  async (params, api) => {
    const res: any = await getCardDataRequest();
    return res;
  }
);

//获取首页分类列表的数据
export const getTypesListRequest = createAsyncThunk(
  "get/typeCardData",
  async (params, api) => {
    const res: any = await getCardDataRequest();
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
      .addCase(getCardDataAsync.pending, (state) => {
        state.countCardLoading = true;
      })
      .addCase(getCardDataAsync.rejected, (state) => {
        state.countCardLoading = false;
      })
      .addCase(getCardDataAsync.fulfilled, (state, action) => {
        state.countCardData = action.payload;
        state.countCardLoading = false;
      })

      .addCase(getTypesListRequest.pending, (state) => {
        state.typeCardLoading = true;
      })
      .addCase(getTypesListRequest.rejected, (state) => {
        state.typeCardLoading = false;
      })
      .addCase(getTypesListRequest.fulfilled, (state, action) => {
        state.typeData = action.payload;
        state.typeCardLoading = false;
      });
  },
});

export const selectCardData = (state: RootState) => {
  return state.home.countCardData;
};
export const selectTypesData = (state: RootState) => {
  return state.home.typeData;
};
export const selectCountCardLoading = (state: RootState) => {
  return state.home.countCardLoading;
};
export const selectCardLoading = (state: RootState) => {
  return state.home.typeCardLoading;
};

export default homeSlice.reducer;
