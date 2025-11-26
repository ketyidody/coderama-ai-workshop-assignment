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
  <div class="min-h-screen bg-neutral-100 dark:bg-neutral-900 transition-colors">
    <div class="w-full px-300">
      <div class="max-w-[730px] mx-auto">
        <header class="bg-neutral-100 dark:bg-neutral-900">
          <div class="py-500 flex items-center justify-between">
            <router-link
              to="/"
              class="text-preset-1 text-neutral-900 dark:text-neutral-0 hover:opacity-70 transition-opacity"
            >
              devfinder
            </router-link>

            <div class="flex items-center gap-200 sm:gap-300">
              <ThemeToggle />
              <UserMenu v-if="authStore.isAuthenticated" />
              <LoginButton v-else />
            </div>
          </div>
        </header>

        <main>
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>
