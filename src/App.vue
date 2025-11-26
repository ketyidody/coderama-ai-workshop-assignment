<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/useThemeStore'
import { useAuthStore } from '@/stores/useAuthStore'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LoginButton from '@/components/LoginButton.vue'
import UserMenu from '@/components/UserMenu.vue'

const themeStore = useThemeStore()
const authStore = useAuthStore()

onMounted(async () => {
  themeStore.initTheme()
  await authStore.initAuth()
})
</script>

<template>
  <div>
    <header class="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <router-link to="/" class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          GitHub Search
        </router-link>

        <div class="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />
          <UserMenu v-if="authStore.isAuthenticated" />
          <LoginButton v-else />
        </div>
      </div>
    </header>

    <div class="pt-16">
      <router-view />
    </div>
  </div>
</template>
