// 封装axios请求模块
import axios from 'axios'
import store from '../store/index'
const request = axios.create({
  // 基础路径
  baseURL: 'http://ttapi.research.itcast.cn/'
})
export default request
/**
 * 请求拦截模块
 */
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const user = store.state.user
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
/**
 * 响应拦截模块
 */
