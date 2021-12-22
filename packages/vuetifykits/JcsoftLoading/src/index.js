import Vue from 'vue'
import JLoading from './js'

const LoadingConstructor = Vue.extend(JLoading)

let nId = 1
let instance
let instances = []

const JcsoftLoading = (opt) => {
  if (typeof opt === 'string') {
    opt = {
      text: opt,
    }
  }
  let id = 'jcsoftLoading-' + nId++

  instance = new LoadingConstructor({
    data: opt,
  }) // 实例化一个带有content内容的Loading

  instance.id = id
  instance.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
  document.body.appendChild(instance.$el) // 将dom插入body
  instance.visible = true
  instance.dom = instance.$el
  instance.dom.style.zIndex = nId + 1001 // 后插入的Loading组件z-index加一，保证能盖在之前的上面
  instances.push(instance)

  return instance
}

export default JcsoftLoading
