import Vue from 'vue'
import App from './App.vue'
import router from "./router";


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import jiuchet from '../packages/utils/jiuchet'
import jcsoft from '../packages'

Vue.use(ElementUI);
Vue.prototype.$jiuchet = jiuchet;
Vue.use(jcsoft);

if (process.env.NODE_ENV === 'development'){
    Vue.config.devtools = true
    Vue.config.productionTip = true;
}

new Vue({
    el: '#app',
    router,
    render: h => h(App),
    mounted() {

    }
})
