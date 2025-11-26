<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const error = ref<string | null>(null)

onMounted(async () => {
  const code = route.query.code as string
  const state = route.query.state as string
  const savedState = localStorage.getItem('oauth_state')

  if (!code) {
    error.value = 'No authorization code received'
    return
  }

  if (!state || state !== savedState) {
    error.value = 'Invalid state parameter. Possible CSRF attack.'
    return
  }

  try {
    await authStore.handleCallback(code, state)
    localStorage.removeItem('oauth_state')

    // Redirect to dashboard after successful login
    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.response?.data?.error || 'Authentication failed. Please try again.'
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 transition-colors">
    <div class="text-center">
      <div v-if="!error">
        <LoadingSpinner />
        <p class="mt-4 text-gray-600 dark:text-gray-400">Completing sign in...</p>
      </div>

      <div v-else class="max-w-md">
        <div class="mb-4">
          <svg class="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Authentication Failed</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-6">{{ error }}</p>
        <router-link
          to="/"
          class="inline-block px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          Return to Home
        </router-link>
      </div>
    </div>
  </div>
</template>
