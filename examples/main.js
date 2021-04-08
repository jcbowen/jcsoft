import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from "./router";

import jiuchet from '../packages/utils/jiuchet'
import MyComponents from '../packages'

Vue.prototype.$jiuchet = jiuchet;

Vue.use(ElementUI);
Vue.use(MyComponents);

if (process.env.NODE_ENV === 'development') Vue.config.productionTip = true;


new Vue({
    el: '#app',
    router,
    render: h => h(App),
    mounted() {

    }
})
