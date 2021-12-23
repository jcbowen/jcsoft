let Notice = function () {
  let that = this
  that.config = {
    loadingText: '加载中...',
    messageDuration: 3000,
  }
}

/* 全局加载层 */
Notice.prototype.loading = function (index, text) {
  console.log(index, text)
  /*let that = this
  let loading
  if (!index) {
    loading = Loading.service({
      lock: true,
      text: text || that.config.loadingText,
      background: 'hsla(0,0%,100%,.8)',
    })
  } else {
    loading = Loading.service({
      lock: true,
      text: text || that.config.loadingText,
      spinner: 'vab-loading-type' + index,
      background: 'hsla(0,0%,100%,.8)',
    })
  }
  return loading*/
}
/* 全局多彩加载层 */
Notice.prototype.colorfullLoading = function (index, text) {
  console.log(index, text)
  /*let that = this
  let loading
  if (!index) {
    loading = Loading.service({
      lock: true,
      text: text || that.config.loadingText,
      spinner: 'dots-loader',
      background: 'hsla(0,0%,100%,.8)',
    })
  } else {
    switch (index) {
      case 1:
        index = 'dots'
        break
      case 2:
        index = 'gauge'
        break
      case 3:
        index = 'inner-circles'
        break
      case 4:
        index = 'plus'
        break
    }
    loading = Loading.service({
      lock: true,
      text: text || that.config.loadingText,
      spinner: index + '-loader',
      background: 'hsla(0,0%,100%,.8)',
    })
  }
  return loading*/
}
/* 全局Message */
Notice.prototype.message = function (message, type) {
  console.log(message, type)
  /*let that = this

  return Message({
    offset: 60,
    showClose: true,
    message: message,
    type: type,
    dangerouslyUseHTMLString: true,
    duration: that.config.messageDuration,
  })*/
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
