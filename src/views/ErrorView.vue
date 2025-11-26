<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 transition-colors">
    <div class="text-center">
      <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">404</h1>
      <p class="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-6 md:mb-8">Page not found</p>
      <router-link
        to="/"
        class="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors inline-block"
      >
        Go to Home
      </router-link>
    </div>
  </div>
</template>
