import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

import store from '@/store'
import router from '@/router'
import validate from 'packages/utils/validate'

let Require = function () {
    let that = this;

    that.config = {
        baseURL: '/',
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        debounce: ['doEdit'],
        invalidCode: 1001,
        noPermissionCode: 2,
        requestTimeout: 60000,
        successCode: [0],
        tokenName: 'access_token',
        loginInterception: false,
    };
}

Require.prototype.set = function ({config, util = {}, loading = null}) {
    let that = this;

    util = util || {
        extend: function (a1, a2, a3) {
            return a3 || a2 || a1;
        }
    }
    loading = util.extend({}, {
        $baseMessage: () => {
        },
        $baseLodash: {
            pickBy: ()=>{},
            identity: ''
        },
        $baseLoading: () => {
        },
    }, loading)
    that.util = util;
    that.loading = loading

}

Require.prototype.init = function () {
    let that = this;
    let loadingInstance;

    /**
     * 处理code异常
     *
     * @param {*} code
     * @param {*} msg
     */
    const handleCode = (code, msg) => {
        switch (code) {
            case that.config.invalidCode:
                Vue.prototype.$baseMessage(msg || `后端接口${code}异常`, 'error');
                store.dispatch('user/resetAccessToken').catch(() => {
                });
                if (that.config.loginInterception) location.reload()
                break
            case that.config.noPermissionCode:
                router.push({
                    path: '/401'
                }).catch(() => {
                })
                break
            default:
                Vue.prototype.$baseMessage(msg || `后端接口${code}异常`, 'error')
                break
        }
    }
    const instance = axios.create({
        baseURL,
        timeout: requestTimeout,
        headers: {
            'Content-Type': contentType,
        },
    })
    instance.interceptors.request.use(
        (config) => {
            if (store.getters['user/accessToken']) {
                config.headers[tokenName] = store.getters['user/accessToken']
            }
            //这里会过滤所有为空、0、false的key，如果不需要请自行注释
            if (config.data)
                config.data = Vue.prototype.$baseLodash.pickBy(
                    config.data,
                    Vue.prototype.$baseLodash.identity
                )
            if (
                config.data &&
                config.headers['Content-Type'] ===
                'application/x-www-form-urlencoded;charset=UTF-8'
            )
                config.data = qs.stringify(config.data)
            if (debounce.some((item) => config.url.includes(item)))
                loadingInstance = Vue.prototype.$baseLoading()
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    instance.interceptors.response.use(
        (response) => {
            if (loadingInstance) loadingInstance.close()
            const {
                data,
                config
            } = response
            const {
                code,
                msg
            } = data
            // 操作正常Code数组
            const codeVerificationArray = that.util.validate.isArray(successCode) ?
                [...successCode] :
                [...[successCode]]
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
            if (loadingInstance) loadingInstance.close()
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
                Vue.prototype.$baseMessage(message || `后端接口未知异常`, 'error')
                return Promise.reject(error)
            }
        }
    )

    return instance;
}

let require = new Require();

export default require;

