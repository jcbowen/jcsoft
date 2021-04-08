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
        path: '/editor-demo',
        name: 'EditorDemo',
        component: () => import('@/views/editor-demo/index'),
        meta: {
            title: 'EditorDemo',
            icon: 'home',
            affix: true,
        },
    },
    {
        path: '/test-script',
        name: 'TestScript',
        component: () => import('@/views/test-script/index'),
        meta: {
            title: 'TestScript',
            icon: 'home',
            affix: true,
        },
    },
    {
        path: '*',
        name: '*',
        component: () => import('@/views/error/404'),
        meta: {
            title: 'TestScript',
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
