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
      tabBar: true,
      isLogin: true
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
    path: '/userInfo',
    component: () => import('@/pages/profile/userInfo'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/order',
    component: () => import('@/pages/order'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/nickname',
    component: () => import('@/pages/profile/nickname'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/addressList',
    component: () => import('@/pages/address/addressList'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/addressEdit',
    component: () => import('@/pages/address/addressEdit'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/addressCreate',
    component: () => import('@/pages/address/addressCreate'),
    meta: {
      isLogin: true
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
  },
  {
    path: '/hintLogin',
    component: () => import('@/pages/hint'),
    meta: {
      tabBar: true
    }
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    const token = window.localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next({ path: '/hintLogin', query: { redirect: to.path } })
    }
  } else {
    next()
  }
})

export default router
