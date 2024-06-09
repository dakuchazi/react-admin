// @/store/index.ts
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import layoutReducer from "./slices/layoutSlice";
import homeReducer from "./slices/homeSlice";
import noticeReducer from "./slices/noticeSlice";
import typeReducer from "./slices/typeSlice";
import tagReducer from "./slices/tagSlice";
import articleReducer from "./slices/articleSlice";
import postReducer from "./slices/postSlice";
import linkReducer from "./slices/linkSlice";
import commentReducer from "./slices/commentSlice";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<RetruenType = void> = ThunkAction<
  RetruenType,
  RootState,
  unknown,
  Action<string>
>;

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    home: homeReducer,
    notice: noticeReducer,
    type: typeReducer,
    tag: tagReducer,
    article: articleReducer,
    post: postReducer,
    link: linkReducer,
    comment: commentReducer
  },
});

// 只是加上了类型定义
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
