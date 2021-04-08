import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from "./router";

import util from '../packages/util'

Vue.prototype.$util = util;

Vue.config.productionTip = false

Vue.use(ElementUI);

window.VM = new Vue({
    el: '#app',
    router,
    render: h => h(App),
    mounted() {

    }
})
