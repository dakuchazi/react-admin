import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { ArticleData, getArticleListRequest } from "@/utils/api";

const initialState: {
  articleData: ArticleData;
  articleLoading: boolean;
} = {
  articleData: {
    list: [],
    total: 0,
  },
  articleLoading: true,
};

export const getArticleListAsync = createAsyncThunk<ArticleData, any>(
  "post/articleData",
  async (params, api) => {
    const res = await getArticleListRequest(params);
    return res;
  }
);

const articleSlice = createSlice({
  name: "article",
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
      .addCase(getArticleListAsync.pending, (state, action) => {
        state.articleLoading = true;
      })
      .addCase(getArticleListAsync.rejected, (state, action) => {
        state.articleLoading = false;
      })
      .addCase(getArticleListAsync.fulfilled, (state, action) => {
        state.articleData = action.payload;
        state.articleLoading = false;
      });
  },
});

export const selectArticleData = (state: RootState) => {
  return state.article.articleData;
};

export const selectArticleLoading = (state: RootState) => {
  return state.article.articleLoading;
};

export default articleSlice.reducer;
