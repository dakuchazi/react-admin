import axios from "./axios"



//获取首页4个卡片的数据
export const getCardDataRequest = ()=>{
    return new Promise((resovle,reject)=>{
        const res = axios.get('/api/articles/getCount')
        resovle(res)
    })
}