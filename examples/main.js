import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import util from '../packages/util'
import {lotussmart} from "../packages/lotussmart";

Vue.prototype.$util = util;

Vue.config.productionTip = false

Vue.prototype.$lotussmart = lotussmart;


window.VM = new Vue({
    el: '#app',
    router,
    render: h => h(App),
    mounted() {

    }
})
