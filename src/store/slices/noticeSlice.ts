import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { getNoticeListRequest } from "@/utils/api";

const initialState = {
  noticeDate: {
    _id: "",
    content: "",
    createDate: "",
  },

  noticeLoading: true,
};

//获取公告列表的的数据
export const getNoticeListAsync = createAsyncThunk(
  "get/noticeData",
  async (params, api) => {
    const res: any = await getNoticeListRequest();
    return res;
  }
);

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    // 同步修改state
    // setNoticeDate(state, action) {
    //   //   state.noticeDate = payload;
    //   console.log("===payload===", action.payload);
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getNoticeListAsync.rejected, (state, action) => {
        state.noticeLoading = false;
      })
      .addCase(getNoticeListAsync.fulfilled, (state, action) => {
        state.noticeDate = action.payload[0];
        state.noticeLoading = false;
      });
  },
});

export const selectNoticeData = (state: RootState) => {
  return state.notice.noticeDate;
};

export const selectNoticeLoading = (state: RootState) => {
  return state.notice.noticeLoading;
};

export default noticeSlice.reducer;
