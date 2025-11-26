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
  <div v-if="totalPages > 1" class="flex justify-center items-center gap-200 mt-300">
    <button
      @click="emit('page-change', currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-300 py-150 text-preset-5 bg-blue-500 text-neutral-0 rounded-10 hover:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      Previous
    </button>
    <span class="px-200 py-150 text-preset-5 text-neutral-900 dark:text-neutral-0 whitespace-nowrap">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    <button
      @click="emit('page-change', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-300 py-150 text-preset-5 bg-blue-500 text-neutral-0 rounded-10 hover:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      Next
    </button>
  </div>
</template>
