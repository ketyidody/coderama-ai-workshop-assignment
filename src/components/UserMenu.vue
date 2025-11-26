<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleLogout = async () => {
  await authStore.logout()
  isMenuOpen.value = false
  router.push('/')
}

const goToDashboard = () => {
  router.push('/dashboard')
  isMenuOpen.value = false
}
</script>

<template>
  <div v-if="authStore.user" class="relative">
    <button
      @click="toggleMenu"
      class="flex items-center gap-2 sm:gap-3 p-1 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <img
        :src="authStore.user.avatar_url"
        :alt="authStore.user.login"
        class="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-200 dark:border-gray-700"
      />
      <span class="hidden sm:block text-sm font-medium text-gray-900 dark:text-white">
        {{ authStore.user.login }}
      </span>
      <svg
        class="w-4 h-4 text-gray-600 dark:text-gray-400"
        :class="{ 'rotate-180': isMenuOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div
      v-if="isMenuOpen"
      @click.self="isMenuOpen = false"
      class="inset-0 z-40"
    >
      <div
        class="absolute right-4 top-16 sm:top-20 mt-2 w-56 sm:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
      >
        <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <p class="text-sm font-semibold text-gray-900 dark:text-white">
            {{ authStore.user.name || authStore.user.login }}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            @{{ authStore.user.login }}
          </p>
        </div>

        <button
          @click="goToDashboard"
          class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </button>

        <a
          :href="authStore.user.html_url"
          target="_blank"
          class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
          @click="isMenuOpen = false"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
          </svg>
          GitHub Profile →
        </a>

        <hr class="my-2 border-gray-200 dark:border-gray-700" />

        <button
          @click="handleLogout"
          class="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  </div>
</template>
