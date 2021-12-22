// 导入组件，组件必须声明 name
import LayuiCode from './modules/code'

const layui = [LayuiCode]

export default layui

/*const Layui = require.context('./modules', true, /\.vue$/)
console.log(321, layui)
console.log(321, Layui)
console.log(
  123,
  Layui.keys().map((item) => {
    console.log(item)
    return layui[item]
  })
)*/
// export default Layui.keys().map(Layui)
