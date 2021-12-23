import * as lodash from 'lodash'
import store from '../store'

// 在全局加载时，将lodash也放到工具包中
let modules = {
  lodash: lodash,
}
// 仅在本地开发时将状态机放到工具包中，便于调试，生产环境不建议暴露工具包的状态机
if (process.env.NODE_ENV === 'development') modules['store'] = store

const files = require.context('./modules', false, /\.js$/)
files.keys().forEach((key) => {
  modules[key.replace(/(modules|\/|\.|js)/g, '')] = files(key).default
})
export default modules
