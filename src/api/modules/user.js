import { getData } from '@/utils/get-data.js'

export default {
  // 登录
  login: params => {
    getData('/login', params, 'post')
  },
  // 获取用户信息
  getUserInfo: params => {
    getData('/userinfo')
  }
}
