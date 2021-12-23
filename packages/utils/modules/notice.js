import store from '../../store'
import validate from './validate'
import util from './base'

let Notice = function () {
  let that = this
  that.index = 0
  that.config = {
    loadingText: '加载中...',
    messageDuration: 3000,
  }
  that.cache = {}
}

/**
 * 全局加载层
 * @param {Number} typeIndex
 * @param {Object|String} opt
 */
Notice.prototype.load = function (typeIndex = 0, opt = {}) {
  let that = this
  if (!validate.isEmpty(opt)) {
    switch (typeof opt) {
      case 'string':
      case 'number':
        opt = {
          text: opt,
        }
        break
      case 'object':
        opt.text = opt.text || that.config.loadingText
        break
      default:
        util.hint('notice.load 参数错误')
    }
  } else {
    opt = {
      text: that.config.loadingText,
    }
  }
  opt = util.extend(opt, {
    typeIndex: typeIndex,
  })
  store.dispatch('notice/openLoading', opt).then(() => {})

  that.index++
  // 返回关闭loading的方法
  return {
    close: () => {
      that.loadClose()
    },
  }
}

/**
 * 关闭全局加载层
 */
Notice.prototype.loadClose = function () {
  store.dispatch('notice/closeLoading').then(() => {})
}

/* 全局Message */
Notice.prototype.message = function (message, type) {
  let that = this

  that.index++
  store.dispatch('notice/showMessage', {
    message: message,
    type: type,
    index: that.index,
  })
}

/* 全局Alert */
Notice.prototype.alert = function (content, title, callback) {
  console.log(content, title, callback)
  /*return MessageBox.alert(content, title || '温馨提示', {
    confirmButtonText: '确定',
    dangerouslyUseHTMLString: true,
    callback: (action) => {
      if (callback) {
        callback()
      }
    },
  })*/
}

/* 全局Confirm */
Notice.prototype.confirm = function (content, title, callback1, callback2) {
  console.log(content, title, callback1, callback2)
  /*return MessageBox.confirm(content, title || '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    closeOnClickModal: false,
    type: 'warning',
  })
    .then(() => {
      if (callback1) {
        callback1()
      }
    })
    .catch(() => {
      if (callback2) {
        callback2()
      }
    })*/
}

/* 全局Notification */
Notice.prototype.notify = function (message, title, type, position) {
  console.log(message, title, type, position)
  /*let that = this
  return Notification({
    title: title,
    message: message,
    position: position || 'top-right',
    type: type || 'success',
    duration: that.config.messageDuration,
  })*/
}

let notice = new Notice()

export default notice
