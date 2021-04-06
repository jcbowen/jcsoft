import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const constantRoutes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/views/index/index'),
        meta: {
            title: 'index',
            icon: 'home',
            affix: true,
        },
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import('@/views/test/index'),
        meta: {
            title: 'test',
            icon: 'home',
            affix: true,
        },
    }

];

const router = new VueRouter({
    base: '',
    mode: 'hash',
    scrollBehavior: () => ({
        y: 0,
    }),
    routes: constantRoutes,
})

export default router;
