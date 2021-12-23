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
const state = () => ({
  loading: {
    typeIndex: 0,
    text: '正在加载中...',
    status: false,
    background: 'hsla(0, 0%, 100%, 0.8)',
  },
})
const getters = {
  loading: (state) => state.loading,
}

const mutations = {
  /**
   * 打开loading页面
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
  closeLoading: (state) => {
    state.loading.status = false
  },
}
const actions = {
  openLoading({ commit }, opt) {
    commit('openLoading', opt)
  },
  closeLoading({ commit }) {
    commit('closeLoading')
  },
}
export default { state, getters, mutations, actions }
