import axios from 'axios'


const instance = axios.create({})

//请求拦截器
instance.interceptors.request.use()



//响应拦截器
instance.interceptors.response.use()


export default instance