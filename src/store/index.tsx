// @/store/index.ts
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import layoutReducer from "./slices/layoutSlice";
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
        layout: layoutReducer
    },
});


// 只是加上了类型定义
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector