import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";

const initialState = {
    data: {}
};

// // createAsyncThunk这个API可以用来设置异步方法,我们可以通过这个API来让redux支持异步。
export const post_data_async: any = createAsyncThunk(
    "post/data",
    async (params, api) => {
        // const res: any = await post_data_request(params);
        // return res.data;
    }
);

const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        //同步修改state
        set_data(state, actions) {
            state.data = actions.payload;
        },
    },
    //extraReducers字段可以让slice处理在其他地方定义的action
    //pengding rejected 可以用来处理等待和失败
    extraReducers: (builder) => {
        builder
            .addCase(post_data_async.pending, (state) => {
                console.log('异步请求正在进行中!')
            })
            .addCase(post_data_async.rejected, (state) => {
                console.log('异步请求失败!')
            })
            .addCase(post_data_async.fulfilled, (state, action) => {
                state.data = action.payload;
            })

    },
});

export const { set_data } = layoutSlice.actions;

export const select_data = (state: RootState) => {
    return state.layout.data;
};
export default layoutSlice.reducer;