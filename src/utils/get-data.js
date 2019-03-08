import axios from './http.js'
export const getData = (url = '', data = {}, type = 'GET') => {
  type = type.toUpperCase()
  if (type === 'GET') {
    let dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + encodeURI(dataStr) + '&t=' + new Date().getTime()
    }
  }
  if (url.indexOf('?') < 0) {
    url = encodeURI(url) + '?t=' + new Date().getTime()
  }
  return axios({
    method: type,
    baseURL: process.env.BASE_API,
    url: url,
    data: data
  })
}
