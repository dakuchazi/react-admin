import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { PostData, getPostListRequest } from "@/utils/api";

const initialState: {
  postData: PostData;
  postLoading: boolean;
} = {
  postData: {
    list: [],
    total: 0,
  },
  postLoading: true,
};

export const getPostListAsync = createAsyncThunk<PostData, any>(
  "post/postData",
  async (params, api) => {
    const res = await getPostListRequest(params);
    return res;
  }
);

const postSlice = createSlice({
  name: "post",
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
      .addCase(getPostListAsync.pending, (state, action) => {
        state.postLoading = true;
      })
      .addCase(getPostListAsync.rejected, (state, action) => {
        state.postLoading = false;
      })
      .addCase(getPostListAsync.fulfilled, (state, action) => {
        state.postData = action.payload;
        state.postLoading = false;
      });
  },
});

export const selectPostData = (state: RootState) => {
  return state.post.postData;
};

export const selectPostLoading = (state: RootState) => {
  return state.post.postLoading;
};

export default postSlice.reducer;
