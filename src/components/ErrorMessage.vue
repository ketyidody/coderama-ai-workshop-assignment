<script setup lang="ts">
interface Props {
  message: string
}

defineProps<Props>()
</script>

<template>
  <div class="bg-neutral-0 dark:bg-neutral-800 border border-red-500 text-red-500 px-300 py-200 rounded-16 text-preset-5" role="alert">
    <span class="block">{{ message }}</span>
  </div>
</template>
