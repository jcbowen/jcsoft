import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import jiuchet from '@/utils/jiuchet'

Vue.prototype.$jiuchet = jiuchet;

Vue.config.productionTip = false

window.VM = new Vue({
    el: '#app',
    router,
    render: h => h(App),
    mounted() {

    }
})
