import store from '../../store'
import util from './base'

let Notice = function () {
  let that = this
  that.index = 0
  that.config = {
    loadingText: '正在加载中...',
    messageDuration: 2000,
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
  let ind = that.index++

  let defaultOpt = {
    index: ind,
    text: that.config.loadingText,
    time: that.config.messageDuration,
    typeIndex: typeIndex,
  }

  opt =
    typeof opt === 'string' || typeof opt === 'number'
      ? util.extend(true, defaultOpt, {
          text: opt,
        })
      : util.extend(true, defaultOpt, opt)

  store.dispatch('notice/openLoading', opt).then(() => {})

  let timeout = util.intval(opt.time)
  if (timeout > 0) {
    setTimeout(() => {
      that.loadClose()
    }, timeout)
  }

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

/**
 * 全局message
 * @param {string} message 消息
 * @param {string|Object} option 字符串代表类型，对象代表参数
 */
Notice.prototype.message = function (message, option = {}) {
  let that = this
  let ind = that.index++
  let defaultOpt = {
    message: message,
    index: ind,
    time: that.config.messageDuration,
  }

  option =
    typeof option === 'string'
      ? util.extend(true, defaultOpt, {
          type: option,
        })
      : util.extend(true, defaultOpt, option)

  store.dispatch('notice/showMessage', option).then(() => {})

  let timeout = util.intval(option.time)
  if (timeout > 0) {
    setTimeout(() => {
      store.dispatch('notice/closeMessage', ind).then(() => {})
    }, timeout)
  }
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

let notice = new Notice()

export default notice
