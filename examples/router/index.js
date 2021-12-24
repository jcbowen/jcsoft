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
    path: '/other/loading',
    name: 'otherLoading',
    component: () => import('@/views/other/loading'),
    meta: {
      title: 'otherLoading',
      icon: 'home',
      affix: true,
    },
  },
  {
    path: '/other/notice',
    name: 'otherNotice',
    component: () => import('@/views/other/notice'),
    meta: {
      title: 'otherNotice',
      icon: 'home',
      affix: true,
    },
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/test/index'),
    meta: {
      title: 'Test',
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
  },
]

const router = new VueRouter({
  base: '',
  mode: 'hash',
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
})
export default router
