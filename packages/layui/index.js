// 导入组件，组件必须声明 name
// import util from '../utils'

const LayuiModules = require.context('./modules', true, /\.vue$/)
let layui = []
LayuiModules.keys().forEach((key) => {
  layui.push(LayuiModules(key).default)
})

export default layui
