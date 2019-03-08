const files = require.context('./modules/', true, /\.js/)
const modules = {}

// 中划线 -> 驼峰
function camelize (str) {
  return `${str}`.replace(/-\D/g, match => match.charAt(1).toUpperCase())
}

files.keys().forEach(key => {
  if (key === './index.js') return

  const moduleName = camelize(key.replace(/(^\.\/|\.js$)/g, ''))
  modules[moduleName] = files(key).default
})

export default modules
