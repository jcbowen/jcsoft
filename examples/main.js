import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import jiuchet from '../packages/util'
import {lotussmart} from "../packages/lotussmart";

Vue.prototype.$jiuchet = jiuchet;

Vue.config.productionTip = false

Vue.prototype.$lotussmart = lotussmart;


window.VM = new Vue({
    el: '#app',
    router,
    render: h => h(App),
    mounted() {

    }
})
