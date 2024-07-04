import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import {
  ArticleData,
  ArticleDetailData,
  getArticleDetailRequest,
  getArticleListRequest,
} from "@/utils/api";

const initialState: {
  articleData: ArticleData;
  articleLoading: boolean;
  articleDetail: ArticleDetailData;
  articleDetailLoading: boolean;
} = {
  articleData: {
    list: [],
    total: 0,
  },
  articleLoading: true,
  articleDetail: {
    title: "",
    title2: "",
    tags: [],
    createDate: "",
    content: "",
    typeId: "",
    isDraft: false,
    _id: "",
  },
  articleDetailLoading: true,
};

export const getArticleListAsync = createAsyncThunk<ArticleData, any>(
  "post/articleData",
  async (params, api) => {
    const res = await getArticleListRequest(params);
    return res;
  }
);

export const getArticleDetailAsync = createAsyncThunk<ArticleDetailData, any>(
  "post/articleDetail",
  async (params) => {
    const res = await getArticleDetailRequest(params);
    return res;
  }
);

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    // 同步修改state
    setArticleDetail(state, action) {
      state.articleDetail = action.payload;
    },
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
      })
      .addCase(getArticleDetailAsync.pending, (state, action) => {
        state.articleDetailLoading = true;
      })
      .addCase(getArticleDetailAsync.rejected, (state, action) => {
        state.articleDetailLoading = false;
      })
      .addCase(getArticleDetailAsync.fulfilled, (state, action) => {
        state.articleDetail = action.payload;
        state.articleDetailLoading = false;
      });
  },
});

export const selectArticleData = (state: RootState) => {
  return state.article.articleData;
};

export const selectArticleLoading = (state: RootState) => {
  return state.article.articleLoading;
};

export const selectArticleDetail = (state: RootState) => {
  return state.article.articleDetail;
};

export const selectArticleDetailLoading = (state: RootState) => {
  return state.article.articleDetailLoading;
};

export const { setArticleDetail } = articleSlice.actions;

export default articleSlice.reducer;
