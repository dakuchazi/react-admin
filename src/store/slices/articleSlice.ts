import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";

const initialState = {
  noticeDate: "",
  typeCardLoading: true,
};

const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    // 同步修改state
    // setNoticeDate(state, payload) {
    //   //   state.noticeDate = payload;
    //   console.log("===payload===", payload);
    // },
  },

  //extraReducers字段可以让slice处理在其他地方定义的action
  //pengding rejected 可以用来处理等待和失败
  //   extraReducers: (builder) => {
  //     builder;
  //   },
});

export const selectNoticeData = (state: RootState) => {
  return state.notice.noticeDate;
};

export default noticeSlice.reducer;
