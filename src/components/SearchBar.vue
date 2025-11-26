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
  <div class="w-full">
    <form
      @submit.prevent="handleSearch"
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-200 sm:gap-250 bg-neutral-0 dark:bg-neutral-800 rounded-16 shadow-search-light dark:shadow-none px-300 py-100 transition-colors"
    >
      <div class="flex flex-1 gap-250 items-center min-w-0">
        <svg
          class="w-[24px] h-[24px] shrink-0 text-blue-500 dark:text-blue-300"
          viewBox="0 0 25 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6094 0C4.75254 0 0 4.78519 0 10.6821C0 16.5791 4.75254 21.3643 10.6094 21.3643C13.0524 21.3643 15.3121 20.5119 17.1185 19.0817L23.1549 25.1596C23.7219 25.7302 24.6393 25.7302 25.2063 25.1596C25.7732 24.589 25.7732 23.6655 25.2063 23.0948L19.1699 17.017C20.5907 15.1981 21.4374 12.9227 21.4374 10.4643C21.2188 4.78519 16.4663 0 10.6094 0ZM3.28121 10.6821C3.28121 6.58554 6.53754 3.30447 10.6094 3.30447C14.6813 3.30447 17.9376 6.58554 17.9376 10.6821C17.9376 14.7787 14.6813 18.0598 10.6094 18.0598C6.53754 18.0598 3.28121 14.7787 3.28121 10.6821Z"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search GitHub username…"
          class="flex-1 bg-transparent text-preset-3 sm:text-preset-3 text-[13px] sm:text-[18px] text-neutral-900 dark:text-neutral-0 placeholder-neutral-500 dark:placeholder-neutral-0 dark:placeholder-opacity-70 focus:outline-none min-w-0"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-300 text-neutral-0 text-preset-5 px-300 py-150 rounded-10 transition-colors whitespace-nowrap w-full sm:w-auto"
      >
        Search
      </button>
    </form>
  </div>
</template>
