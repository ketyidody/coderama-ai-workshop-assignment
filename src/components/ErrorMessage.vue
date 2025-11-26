<script setup lang="ts">
interface Props {
  message: string
}

defineProps<Props>()
</script>

<template>
  <div class="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-300 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base" role="alert">
    <span class="block sm:inline">{{ message }}</span>
  </div>
</template>
