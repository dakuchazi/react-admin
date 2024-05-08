import axios from 'axios'


const instance = axios.create({
    baseURL: '/',
    validateStatus: function (status) {
      return status < 500; //这个不写的话  默认只有200-299的状态码才会resolve，其余的都会reject
    },
    timeout: 1000,
})

//请求拦截器
instance.interceptors.request.use()



//响应拦截器
instance.interceptors.response.use()


export default instance