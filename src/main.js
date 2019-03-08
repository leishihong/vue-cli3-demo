import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import Cookies from 'js-cookie'
// import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'
import '@/icons'

import Util from './utils'
import common from '@/utils/common' // 全局方法
import filters from '@/utils/filters' // 全局过滤器
import apis from './api/index'
import '@/utils/permission'

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// 注册过滤器
for (let key in filters) {
  Vue.filter(key, filters[key])
}
/**
 * api请求挂载vue实例
 */
Vue.prototype.$apis = apis
/**
 * 工具类对象没有选择使用混入，直接注入原型
 */
Vue.prototype.$util = Util

Vue.use(common)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    const ieVersion = this.$util.getIeVersion()
    // get skeleton dom
    const skeleton = document.querySelector('.skeleton')
    // app加载完成之后隐藏或者删除dom
    skeleton.style.opacity = '0'
    let flag = true
    if (ieVersion !== 0 && ieVersion <= 9) {
      console.log('this is IE9')
      setTimeout(() => {
        document.body.removeChild(skeleton)
      }, 0)
    } else {
      this.$util.addEvent(skeleton, 'transitionend', e => {
        if (e.target === skeleton && flag) {
          flag = false
          skeleton.style.displpay = 'none'
          setTimeout(() => {
            document.body.removeChild(skeleton)
          }, 0)
        }
      })
    }
    // 定时任务 确保删除
    setTimeout(() => {
      if (skeleton) document.body.removeChild(skeleton)
    }, 200)
  }
}).$mount('#app')
