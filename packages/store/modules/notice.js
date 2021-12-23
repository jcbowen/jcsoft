/**
 * @description 异常捕获的状态拦截，请勿修改
 */
import util from '../../utils/modules/base'
import validate from '../../utils/modules/validate'

/**
 * loading默认参数
 *
 * @type {{background: string, text: string, typeIndex: number, status: boolean}}
 */
let defaultLoadingOpt = {
  typeIndex: 0,
  text: '正在加载中...',
  status: false,
  background: 'hsla(0, 0%, 100%, 0.8)',
}
let defaultMsgOpt = {
  type: 'success',
  message: '这是一条消息',
  dismissible: true,
  width: undefined,
  maxWidth: '380px',
  height: undefined,
  maxHeight: undefined,
  icon: undefined,
  dark: false,
  elevation: 2,
  value: true, // 是否显示
}
const state = () => ({
  loading: {
    typeIndex: 0,
    text: '正在加载中...',
    status: false,
    background: 'hsla(0, 0%, 100%, 0.8)',
  },
  message: {
    pool: [defaultMsgOpt],
  },
})
const getters = {
  loading: (state) => state.loading,
  message: (state) => state.message,
}

const mutations = {
  /**
   * 打开loading
   * @param  state
   * @param {string|object} opt 如果是字符串，那么传递的就是loading加载文字
   */
  openLoading(state, opt) {
    if (typeof opt === 'string' && !validate.isEmpty(opt)) {
      opt = {
        text: opt,
      }
    }

    // 传递的参数与默认值进行合并
    opt = util.extend(true, defaultLoadingOpt, opt)

    // 格式化typeIndex
    opt.typeIndex = util.intval(opt.typeIndex)

    // 打开loading层
    opt.status = true
    state.loading = opt
  },
  /**
   * 关闭loading
   * @param state
   */
  closeLoading: (state) => {
    state.loading.status = false
  },
  showMessage: (state, opt) => {
    if (validate.isEmpty(opt.index))
      return util.hint('store-notice-showMessage: index参数不能为空')
    opt = util.extend(true, defaultMsgOpt, opt)
    state.message.pool.push(opt)
  },
  closeMessage: (state, ind) => {
    if (validate.isEmpty(ind)) return util.hint('showMessage: ind参数不能为空')
    let newPool = []
    util.each(state.message.pool, (item) => {
      item.value = false
      newPool.push(item)
    })
    state.message.pool = newPool
  },
}
const actions = {
  openLoading({ commit }, opt) {
    commit('openLoading', opt)
  },
  closeLoading({ commit }) {
    commit('closeLoading')
  },
  showMessage({ commit }, opt) {
    commit('showMessage', opt)
  },
}
export default { state, getters, mutations, actions }
