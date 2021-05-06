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
        path: '/editor',
        name: 'EditorDemo',
        component: () => import('@/views/editor/index'),
        meta: {
            title: 'EditorDemo',
            icon: 'home',
            affix: true,
        },
    },
    {
        path: '/script',
        name: 'Script',
        component: () => import('@/views/script/index'),
        meta: {
            title: 'TestScript',
            icon: 'home',
            affix: true,
        },
    },
    {
        path: '/readIdCard',
        name: 'readIdCard',
        component: () => import('@/views/readIdCard/index'),
        meta: {
            title: 'readIdCard',
            icon: 'home',
            affix: true,
        },
    },
    {
        path: '/websocket',
        name: 'WebSocket',
        component: () => import('@/views/websocket/index'),
        meta: {
            title: 'WebSocket',
            icon: 'home',
            affix: true,
        },
    },
    {
        path: '/layui',
        name: 'layui',
        component: () => import('@/views/layui/index'),
        meta: {
            title: 'layui',
            icon: 'home',
            affix: true,
        },
    },
    {
        path: '/excel',
        name: 'Excel',
        component: () => import('@/views/excel/index'),
        meta: {
            title: 'Excel',
            icon: 'home',
            affix: true,
        },
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test/index'),
        meta: {
            title: 'test',
            icon: 'home',
            affix: true,
        },
    },
    {
        path: '*',
        name: '*',
        component: () => import('@/views/error/404'),
        meta: {
            title: '404',
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
