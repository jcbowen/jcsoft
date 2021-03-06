// import xSpreadsheet from "./xspreadsheet";
import utils from './utils'
import layui from './layui'
import vuetifyKits from './vuetifykits'
import global from './global/global'
import JcsoftEditor from './editor'
import JcsoftDraggable from 'vuedraggable'
JcsoftDraggable.name = 'JcsoftDraggable'

export function jcsoft() {}

// 存储组件列表（不支持直接注册为组件使用的，不在此处进行注册）
const components = [
  // xSpreadsheet,
  global,
  ...layui,
  ...vuetifyKits,
  JcsoftEditor,
  JcsoftDraggable,
]
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return

  // 遍历注册全局组件
  components.forEach((component) => {
    Vue.component(component.name, component)

    if (component.name === 'JcsoftLoading') {
      Vue.prototype.$jcLoad = component
    }
  })

  Vue.prototype.$jcUtils = utils
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表

  // xSpreadsheet,
  global,
  ...layui,
  ...vuetifyKits,
  JcsoftEditor,
  JcsoftDraggable,
}
