import { createRouter, createWebHistory } from 'vue-router'
import AuthenticatedHomePage from '#/views/AuthenticatedHomePage.vue'
import UnauthenticatedHomePage from '#/views/UnauthenticatedHomePage.vue'

import { useAuthStore } from './store/authStore'

const routes = [
  {
    path: '/',
    name: 'authenticated',
    component: AuthenticatedHomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'unauthenticated',
    component: UnauthenticatedHomePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const authStore = useAuthStore()
  const isAuthenticated = await authStore.checkAuthState()

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'unauthenticated' })
  } else if (!requiresAuth && isAuthenticated) {
    next({ name: 'authenticated' })
  } else {
    next()
  }
})

export default router
