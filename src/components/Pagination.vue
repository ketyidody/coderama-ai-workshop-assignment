<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
}

interface Emits {
  (e: 'page-change', page: number): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-4 md:mt-6">
    <button
      @click="emit('page-change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <span class="hidden sm:inline">Previous</span>
      <span class="sm:hidden">Prev</span>
    </button>
    <span class="px-2 sm:px-4 py-2 text-xs sm:text-base text-gray-900 dark:text-white whitespace-nowrap">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    <button
      @click="emit('page-change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      Next
    </button>
  </div>
</template>
