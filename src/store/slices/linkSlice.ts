import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { LinkData, getLinkListRequest } from "@/utils/api";

const initialState: {
  linkData: LinkData;
  linkLoading: boolean;
} = {
  linkData: {
    list: [],
    total: 0,
  },
  linkLoading: true,
};

export const getLinkListAsync = createAsyncThunk<LinkData, any>(
  "post/LinkData",
  async (params, api) => {
    const res = await getLinkListRequest(params);
    return res;
  }
);

const linkSlice = createSlice({
  name: "link",
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
  extraReducers: (builder) => {
    builder
      .addCase(getLinkListAsync.pending, (state, action) => {
        state.linkLoading = true;
      })
      .addCase(getLinkListAsync.rejected, (state, action) => {
        state.linkLoading = false;
      })
      .addCase(getLinkListAsync.fulfilled, (state, action) => {
        state.linkData = action.payload;
        state.linkLoading = false;
      });
  },
});

export const selectLinkData = (state: RootState) => {
  return state.link.linkData;
};

export const selectLinkLoading = (state: RootState) => {
  return state.link.linkLoading;
};

export default linkSlice.reducer;
