import axios from 'axios'
import qs from 'qs'

import util from './base'
import notice from './notice'
import validate from './validate'

let Require = function () {
  let that = this

  that.requireConfig = {
    baseURL: '/',
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    debounce: ['add', 'edit', 'save', 'delete'],
    invalidCode: 1001,
    noPermissionCode: 2,
    requestTimeout: 60000,
    successCode: [0],
    tokenName: 'access_token',
    loginInterception: false,
  }

  that.AccessTokenMethod = {
    getAccessToken: null,
    resetAccessToken: null,
  }

  that.on = {
    noPermission: () => {},
  }
}

/**
 * 配置修改
 *
 * @param config
 */
Require.prototype.config = function (config = {}) {
  let that = this
  that.requireConfig = util.extend(true, that.requireConfig, config)
}

/**
 * 写入token方面的方法
 *
 * @param {Function} getAccessToken
 * @param {Function} resetAccessToken
 */
Require.prototype.tokenMethod = function ({
  getAccessToken,
  resetAccessToken,
}) {
  let that = this
  that.AccessTokenMethod.getAccessToken = getAccessToken || null
  that.AccessTokenMethod.resetAccessToken = resetAccessToken || null
}

/**
 * 初始化 axios
 *
 * @returns {AxiosInstance}
 */
Require.prototype.init = function () {
  let that = this
  let loadingInstance

  /**
   * 处理code异常
   *
   * @param {*} code
   * @param {*} msg
   */
  const handleCode = (code, msg) => {
    switch (code) {
      case that.requireConfig.invalidCode:
        notice.message(msg || `后端接口${code}异常`, 'error')
        util.hint(msg || `后端接口${code}异常`)
        if (typeof that.AccessTokenMethod.resetAccessToken === 'function') {
          that.AccessTokenMethod.resetAccessToken.call()
        }
        if (that.requireConfig.loginInterception) location.reload()
        break
      case that.requireConfig.noPermissionCode:
        that.on.noPermission()
        break
      default:
        util.hint(msg || `后端接口${code}异常`)
        notice.message(msg || `后端接口${code}异常`, 'error')
        break
    }
  }

  const instance = axios.create({
    baseURL: that.requireConfig.baseURL,
    timeout: that.requireConfig.requestTimeout,
    headers: {
      'Content-Type': that.requireConfig.contentType,
    },
  })
  instance.interceptors.request.use(
    (config) => {
      if (typeof that.AccessTokenMethod.getAccessToken === 'function') {
        config.headers[that.requireConfig.tokenName] =
          that.AccessTokenMethod.getAccessToken.call()
      }
      //这里会过滤所有为空、0、false的key，如果不需要请自行注释
      if (config.data) config.data = util._.pickBy(config.data, util._.identity)
      if (
        config.data &&
        config.headers['Content-Type'] ===
          'application/x-www-form-urlencoded;charset=UTF-8'
      )
        config.data = qs.stringify(config.data)
      if (that.requireConfig.debounce.some((item) => config.url.includes(item)))
        loadingInstance = notice.loading()
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  instance.interceptors.response.use(
    (response) => {
      if (loadingInstance) loadingInstance.close()
      const { data, config } = response
      const { code, msg } = data
      // 操作正常Code数组
      const codeVerificationArray = validate.isArray(
        that.requireConfig.successCode
      )
        ? [...that.requireConfig.successCode]
        : [...[that.requireConfig.successCode]]
      // 是否操作正常
      if (codeVerificationArray.includes(code)) {
        return data
      } else {
        handleCode(code, msg)
        return Promise.reject(
          '请求异常拦截:' +
            JSON.stringify({
              url: config.url,
              code,
              msg,
            }) || 'Error'
        )
      }
    },
    (error) => {
      if (loadingInstance) loadingInstance.close()
      const { response, message } = error
      if (error.response && error.response.data) {
        const { status, data } = response
        handleCode(status, data.msg || message)
        return Promise.reject(error)
      } else {
        let { message } = error
        if (message === 'Network Error') {
          message = '后端接口连接异常'
        }
        if (message.includes('timeout')) {
          message = '后端接口请求超时'
        }
        if (message.includes('Request failed with status code')) {
          const code = message.substr(message.length - 3)
          message = '后端接口' + code + '异常'
        }
        notice.message(message || `后端接口未知异常`, 'error')
        util.hint(message || `后端接口未知异常`)
        return Promise.reject(error)
      }
    }
  )

  return instance
}

let require = new Require()

export default require
