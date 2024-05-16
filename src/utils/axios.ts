import axios from 'axios'




const instance = axios.create({
  baseURL: '/',
  // validateStatus: function (status) {
  // return status < 500; //这个不写的话  默认只有200-299的状态码才会resolve，其余的都会reject
  // },
  timeout: 3000,
})

//请求拦截器
instance.interceptors.request.use(
  function (request) {



    console.log('===拦截器request===', request);
    return request
  },
)



//响应拦截器
instance.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      //401是未登录的code
      // if (response.data.code === '401') {

      // }
    }

    console.log('===拦截器response===', response);
    return response.data
  },
)





export default instance