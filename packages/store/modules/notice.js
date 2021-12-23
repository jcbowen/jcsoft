/**
 * @description 异常捕获的状态拦截，请勿修改
 */
import util from '../../utils/modules/base'
import validate from '../../utils/modules/validate'

const state = () => ({
  loading: {
    status: false,
    text: '正在加载中...',
  },
})
const getters = {
  loading: (state) => state.loading,
  loadingStatus: (state) => state.loading.status,
}
const defaultLoadingOpt = {
  text: '正在加载中...',
  status: false,
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
    opt = util.extend(true, defaultLoadingOpt, opt)
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
