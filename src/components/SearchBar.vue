<script setup lang="ts">
import { ref } from 'vue'

interface Emits {
  (e: 'search', query: string): void
}

const emit = defineEmits<Emits>()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value.trim())
  }
}
</script>

<template>
  <div class="w-full max-w-2xl mx-auto">
    <form @submit.prevent="handleSearch" class="flex gap-2">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search GitHub users..."
        class="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      />
      <button
        type="submit"
        class="px-4 sm:px-6 py-2 text-sm sm:text-base bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800 dark:active:bg-blue-700 transition-colors whitespace-nowrap"
      >
        Search
      </button>
    </form>
  </div>
</template>
