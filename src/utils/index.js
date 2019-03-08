// 浏览器兼容storage
let supportStorage = function () {
  let flag = false
  if (!window.storage) {
    throw new Error('浏览器不支持localStorage')
  } else {
    flag = true
  }
  return flag
}
// 工具类
class Util {
  /**
   * 替换字符串中所有得字符串
   * @param {*全局替换字符串} str
   * @param {*目标字符串} targetStr
   * @param {*要替换得新字符串} newStr
   */
  replaceStr (str, targetStr, newStr) {
    str = Util.isString(str) ? str : str.toString()
    let reRegExp = new RegExp(targetStr, 'g')
    return str.replace(reRegExp, newStr)
  }
  /**
   *
   * @param {*storage名} name
   * @param {*storage值} value
   * @param {*类型 session/local} type
   */
  setStorage (name, value, type = 'local') {
    let storage
    if (supportStorage) {
      let _value = JSON.stringify(value)
      if (type === 'local') {
        storage = window.localStorage
      } else {
        storage = window.sessionStorage
      }

      storage.setItem(name, _value)
    }
  }
  getStorage = (name, type = 'local') => {
    let storage
    if (type === 'local') {
      storage = window.localStorage
    } else {
      storage = window.sessionStorage
    }
    return JSON.parse(storage.getItem(name))
  }
  removeStorage = (name, type = 'local') => {
    let storage
    if (type === 'local') {
      storage = window.localStorage
    } else {
      storage = window.sessionStorage
    }
    return storage.removeItem(name)
  }
  clearStorage = (type = 'local') => {
    let storage
    if (type === 'local') {
      storage = window.localStorage
    } else {
      storage = window.sessionStorage
    }
    return storage.clear()
  }
  /**
   * 获取IE历览器版本 火狐获取可能有点儿问题
   * 返回number类型当前大浏览器的大版本号
   */
  getIeVersion () {
    const browser = navigator.appName
    const bVersion = navigator.appVersion
    const version = bVersion.split(';')
    const trim_version = version[1] ? version[1].replace(/[ ]/g, '') : ''
    if (browser === 'Microsoft Internet Explorer') {
      return parseInt(trim_version.substr(4, 1))
    } else {
      return 0
    }
  }
  /**
   * 绑定事件
   * @param {*} element
   * @param {*} eType
   * @param {*} handle
   * @param {*} bol
   */
  addEvent (element, eType, handle, bol = true) {
    if (element.addEventListener) {
      element.addEventListener(eType, handle, bol)
    } else if (element.attachEvent) {
      element.attachEvent(eType, handle, bol)
    } else {
      element['on' + eType] = null
    }
  }
  // 格式化时间
  parseTime (time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value]
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return timeStr
  }
}

/**
 * 函数防抖动
 * @param {*执行函数} fn
 * @param {*时间间隔} wait
 */
Util._debance = function (fn, wait) {
  let timer = null
  return function () {
    let _this = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      fn.apply(_this, args)
    }, wait)
  }
}
/**
 * 节流函数
 * @param {*要执行的函数} fn
 * @param {*等待时间} wait
 */
Util._throttle = function (fn, wait) {
  let _lastTime = null
  return function () {
    let _nowTime = new Date()
    if (_nowTime - _lastTime > wait || !_lastTime) {
      fn()
      _lastTime = _nowTime
    }
  }
}

export default new Util()
