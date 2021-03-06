import axios from 'axios'
import store from '@/store'
import Promise from 'es6-promise'
import { Message } from 'element-ui'

Promise.polyfill()

// axios 配置
axios.defaults.timeout = 10000
axios.defaults.withCredentials = false
axios.defaults.async = true
axios.defaults.crossDomain = true
// // 创建axios 实例
// const service = axios.create({
//   baseURL: process.env.BASE_API, // api的base_url
//   timeout: 10000 // 请求超时时间
// })

// request 拦截器
axios.interceptors.request.use(
  config => {
    // 这里可以自定义一些config 配置

    // loading + 1
    store.dispatch('SetLoading', true)

    return config
  },
  error => {
    //  这里处理一些请求出错的情况

    // loading 清 0
    setTimeout(function () {
      store.dispatch('SetLoading', 0)
    }, 300)

    return Promise.reject(error)
  }
)

// response 拦截器
axios.interceptors.response.use(
  response => {
    const res = response.data
    // 这里处理一些response 正常放回时的逻辑

    // 比如， 如果code 非 200 统一提示错误，当然你仍可以更详细的区分
    if (res.code !== 200) {
      Message({
        message: '全局错误提示演示：' + res.msg,
        type: 'error',
        duration: 5000
      })
    }

    // loading - 1
    store.dispatch('SetLoading', false)

    return res
  },
  error => {
    // 这里处理一些response 出错时的逻辑

    // loading - 1
    store.dispatch('SetLoading', false)

    return Promise.reject(error)
  }
)

export default axios
