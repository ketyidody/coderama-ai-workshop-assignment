import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user/:username',
      name: 'user',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/auth/callback',
      name: 'auth-callback',
      component: () => import('../views/AuthCallbackView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => import('../views/ErrorView.vue')
    }
  ]
})

// Route guard for protected routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to home if not authenticated
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
