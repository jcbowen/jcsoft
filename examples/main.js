import Vue from 'vue'
import App from './App.vue'
import router from './router'

import vuetify from '@/plugins/vuetify'
import utils from 'jcsoft/packages/utils/index'
import jcsoft from 'jcsoft/packages'

Vue.prototype.$utils = utils
Vue.use(jcsoft)

if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
  Vue.config.productionTip = true
}

new Vue({
  el: '#app',
  router,
  vuetify,
  mounted() {},
  render: (h) => h(App),
})
