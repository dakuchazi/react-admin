import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { getCardDataRequest } from "@/utils/api";

const initialState = {
   articleCount:'0',
   commentCount:'0',
   linkCount:'0',
   logCount:'0',
   postCount:'0'
}
// // createAsyncThunk这个API可以用来设置异步方法,我们可以通过这个API来让redux支持异步。

//获取首页卡片的数据
export const getCardDataAsync: any = createAsyncThunk(
    "get/CardData",
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
                console.log('异步请求正在进行中!')
            })
            .addCase(getCardDataAsync.rejected, (state) => {
                console.log('异步请求失败!')
            })
            .addCase(getCardDataAsync.fulfilled, (state, action) => {
                console.log('===getCardDataAsync===',action);
                
            })

    },
});




export default homeSlice.reducer;
