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
let defLoadingOpt = {
  typeIndex: 0,
  text: '正在加载中...',
  status: false,
  background: 'hsla(0, 0%, 100%, 0.8)',
}
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
    typeIndex: 0,
    text: '正在加载中...',
    status: false,
    background: 'hsla(0, 0%, 100%, 0.8)',
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
   * @param {string|object} opt 如果是字符串，那么传递的就是loading加载文字
   */
  openLoading(state, opt) {
    if (typeof opt === 'string' && !validate.isEmpty(opt)) {
      opt = {
        text: opt,
      }
    }

    // 传递的参数与默认值进行合并
    opt = util.extend({}, defLoadingOpt, opt)

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
  closeLoading({ commit }) {
    commit('closeLoading')
  },
  showMessage({ commit }, opt) {
    commit('showMessage', opt)
  },
  closeMessage({ commit }, ind) {
    commit('closeMessage', ind)
  },
}
export default { state, getters, mutations, actions }
