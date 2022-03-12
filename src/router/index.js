import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/pages/home'),
    meta: {
      tabBar: true
    }
  },
  {
    path: '/newProduct',
    component: () => import('@/pages/newProduct'),
    meta: {
      tabBar: true
    }
  },
  {
    path: '/shopping',
    component: () => import('@/pages/shopping'),
    meta: {
      tabBar: true
    }
  },
  {
    path: '/cart',
    component: () => import('@/pages/cart'),
    meta: {
      tabBar: true
    }
  },
  {
    path: '/profile',
    component: () => import('@/pages/profile'),
    meta: {
      tabBar: true
    }
  },
  {
    path: '/catgory',
    component: () => import('@/pages/catgory')
  },
  {
    path: '/login',
    component: () => import('@/pages/login')
  },
  {
    path: '/register',
    component: () => import('@/pages/login/register.vue')
  },
  {
    path: '/detail/:id',
    component: () => import('@/pages/detail')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
