// 导入组件，组件必须声明 name
import JcEditor from './src/history'

JcEditor.install = function (Vue) {
    // 为组件提供 install 安装方法，供按需引入
    Vue.component(JcEditor.name, JcEditor)
}

export default JcEditor
