<script setup lang="ts">
import type { GitHubRepository } from '@/types/github'

interface Props {
  repositories: GitHubRepository[]
}

defineProps<Props>()
</script>

<template>
  <div class="space-y-3 md:space-y-4">
    <div
      v-for="repo in repositories"
      :key="repo.id"
      class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 transition-colors"
    >
      <a
        :href="repo.html_url"
        target="_blank"
        class="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline break-words"
      >
        {{ repo.name }}
      </a>
      <p v-if="repo.description" class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">{{ repo.description }}</p>
      <div class="flex flex-wrap gap-3 sm:gap-4 mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
        <span v-if="repo.language" class="flex items-center gap-1">{{ repo.language }}</span>
        <span class="flex items-center gap-1">⭐ {{ repo.stargazers_count }}</span>
        <span class="flex items-center gap-1">🔱 {{ repo.forks_count }}</span>
      </div>
    </div>
  </div>
</template>
