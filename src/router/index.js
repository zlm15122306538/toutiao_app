import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/')
  }, {
    path: '/',
    component: () => import('../views/layout/'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('../views/home/')
      }, {
        path: '/query',
        name: 'query',
        component: () => import('../views/query/')
      }, {
        path: '/vedio',
        name: 'vedio',
        component: () => import('../views/vedio/')
      }, {
        path: '/my',
        name: 'my',
        component: () => import('../views/my')
      }
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router
