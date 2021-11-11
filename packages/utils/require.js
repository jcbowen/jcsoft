// import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import * as lodash from 'lodash'

import router from '@/router'
import util from 'jcsoft/packages/utils'

let Require = function () {
    let that = this;

    that.config = {
        baseURL: '/',
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        debounce: ['edit'],
        invalidCode: 1001,
        noPermissionCode: 2,
        requestTimeout: 60000,
        successCode: [0],
        tokenName: 'access_token',
        loginInterception: false,
    };

    that.method = {
        getAccessToken: null,
        resetAccessToken: null,
    };

    that.on = {}
}

/**
 * 配置修改
 *
 * @param config
 */
Require.prototype.config = function (config = {}) {
    this.config = util.extend(this.config, config);
}

Require.prototype.method = function (method = {}) {
    this.method = util.extend(this.method, method);
}

/**
 * 初始化 axios
 *
 * @param {Function} getAccessToken
 * @param {Function} resetAccessToken
 * @returns {AxiosInstance}
 */
Require.prototype.init = function ({getAccessToken, resetAccessToken}) {
    let that = this;
    // let loadingInstance;

    that.method = util.extend(that.method, {
        getAccessToken,
        resetAccessToken
    })

    /**
     * 处理code异常
     *
     * @param {*} code
     * @param {*} msg
     */
    const handleCode = (code, msg) => {
        switch (code) {
            case that.config.invalidCode:
                // Vue.prototype.$baseMessage(msg || `后端接口${code}异常`, 'error');
                util.hint(msg || `后端接口${code}异常`)
                if (typeof that.method.resetAccessToken === 'function') {
                    that.method.resetAccessToken.call()
                }
                if (that.config.loginInterception) location.reload()
                break
            case that.config.noPermissionCode:
                router.push({
                    path: '/401'
                }).catch(() => {
                })
                break
            default:
                util.hint(msg || `后端接口${code}异常`)
                // Vue.prototype.$baseMessage(msg || `后端接口${code}异常`, 'error')
                break
        }
    }

    const instance = axios.create({
        baseURL: that.config.baseURL,
        timeout: requestTimeout,
        headers: {
            'Content-Type': contentType,
        },
    })
    instance.interceptors.request.use(
        (config) => {
            if (typeof that.method.getAccessToken === 'function') {
                config.headers[that.config.tokenName] = that.method.getAccessToken.call()
            }
            //这里会过滤所有为空、0、false的key，如果不需要请自行注释
            if (config.data)
                config.data = lodash.pickBy(
                    config.data,
                    lodash.identity
                )
            if (
                config.data &&
                config.headers['Content-Type'] ===
                'application/x-www-form-urlencoded;charset=UTF-8'
            )
                config.data = qs.stringify(config.data)
            if (that.config.debounce.some((item) => config.url.includes(item)))
                // loadingInstance = Vue.prototype.$baseLoading()
                return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    instance.interceptors.response.use(
        (response) => {
            // if (loadingInstance) loadingInstance.close()
            const {
                data,
                config
            } = response
            const {
                code,
                msg
            } = data
            // 操作正常Code数组
            const codeVerificationArray = util.validate.isArray(that.config.successCode) ?
                [...that.config.successCode] :
                [...[that.config.successCode]]
            // 是否操作正常
            if (codeVerificationArray.includes(code)) {
                return data
            } else {
                handleCode(code, msg)
                return Promise.reject(
                    'vue-admin-beautiful请求异常拦截:' +
                    JSON.stringify({
                        url: config.url,
                        code,
                        msg
                    }) || 'Error'
                )
            }
        },
        (error) => {
            // if (loadingInstance) loadingInstance.close()
            const {
                response,
                message
            } = error
            if (error.response && error.response.data) {
                const {
                    status,
                    data
                } = response
                handleCode(status, data.msg || message)
                return Promise.reject(error)
            } else {
                let {
                    message
                } = error
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
                // Vue.prototype.$baseMessage(message || `后端接口未知异常`, 'error')
                util.hint(message || `后端接口未知异常`)
                return Promise.reject(error)
            }
        }
    )

    return instance;
}

let require = new Require();

export default require;

