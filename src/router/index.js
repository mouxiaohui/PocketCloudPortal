import { createRouter, createWebHistory } from 'vue-router'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { getToken } from '@/utils/cookie'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/layout/index.vue'),
      children: [],
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/500',
      name: 'Error500',
      component: () => import('@/views/error/500/index.vue'),
    },
    {
      path: '/404',
      name: 'Error404',
      component: () => import('@/views/error/404/index.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true },
  ],
})

const toIndexPageList = ['Login'],
  whiteList = ['Login', 'Error404', 'Error500']

// 路由拦截
router.beforeEach((to, from, next) => {
  NProgress.start()

  const hasToken = getToken()
  if (hasToken) {
    // 已登陆
    // 如果访问的是登录/注册等页面，强制跳转到首页
    if (toIndexPageList.indexOf(to.name) !== -1) {
      next({ name: 'Index' })
    } else {
      next()
    }
  } else {
    // 未登录
    // 允许访问白名单内的页面
    if (whiteList.indexOf(to.name) !== -1) {
      next()
    } else {
      // 其他页面跳转到登录页，并记录当前路径作为重定向参数
      next({ name: 'Login' })
    }
  }

  NProgress.done()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
