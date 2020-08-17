import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 300000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    const token = '999999999999999'

    config.headers['Authorization'] = 'bear ' + token
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // debugger
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 1) {
      console.log("我出现了错误")
      return Promise.reject("我出现了错误")
    } else {
      return response
    }
  },
  error => {
    console.log('后台错误')
    return Promise.reject(error)
  }
)

export default service
