/**
 * @description 异常捕获的状态拦截，请勿修改
 */
import util from '../../utils/modules/base'

/**
 * loading默认参数
 *
 * @type {{background: string, text: string, typeIndex: number, value: boolean}}
 */
let defLoadingOpt = {
  background: 'hsla(0, 0%, 100%, 0.8)',
  index: 0,
  text: '正在加载中...',
  type: 'overlay',
  typeIndex: 0,
  value: true, // 是否显示
}
/**
 * message默认参数
 * @type {{elevation: number, color: undefined, icon: undefined, index: number, type: undefined, message: string, dense: boolean, outlined: boolean, maxHeight: undefined, dark: boolean, dismissible: boolean, width: undefined, text: boolean, value: boolean, height: undefined, maxWidth: string}}
 */
let defMsgOpt = {
  color: undefined,
  dark: false,
  dense: true,
  dismissible: true,
  elevation: 3,
  height: undefined,
  icon: undefined,
  index: 0,
  maxHeight: undefined,
  maxWidth: '380px',
  outlined: false,
  text: false,
  type: undefined,
  value: true, // 是否显示
  width: undefined,
  message: '这是一条消息',
}
const state = () => ({
  loading: {
    pool: [],
  },
  message: {
    pool: [],
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
   * @param {object} opt
   */
  openLoading(state, opt) {
    // 传递的参数与默认值进行合并
    opt = util.extend({}, defLoadingOpt, opt)

    // 格式化typeIndex
    opt.typeIndex = util.intval(opt.typeIndex)

    state.loading.pool.push(opt)
  },
  closeLoading: (state, ind) => {
    util.each(state.loading.pool, (value, key) => {
      if (ind === value.index) state.loading.pool[key].value = false
    })
  },
  /**
   * 唤出消息
   *
   * @param state
   * @param {object} opt
   */
  showMessage: (state, opt) => {
    opt = util.extend({}, defMsgOpt, opt)
    state.message.pool.push(opt)
  },
  closeMessage: (state, ind) => {
    util.each(state.message.pool, (value, key) => {
      if (ind === value.index) state.message.pool[key].value = false
    })
  },
}
const actions = {
  openLoading({ commit }, opt) {
    commit('openLoading', opt)
  },
  closeLoading({ commit }, ind) {
    commit('closeLoading', ind)
  },
  showMessage({ commit }, opt) {
    commit('showMessage', opt)
  },
  closeMessage({ commit }, ind) {
    commit('closeMessage', ind)
  },
}
export default { state, getters, mutations, actions }
