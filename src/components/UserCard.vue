<script setup lang="ts">
import type { GitHubUser } from '@/types/github'

interface Props {
  user: GitHubUser
}

defineProps<Props>()
</script>

<template>
  <router-link
    :to="{ name: 'user', params: { username: user.login } }"
    class="block bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-all"
  >
    <div class="flex items-center gap-3 sm:gap-4">
      <img
        :src="user.avatar_url"
        :alt="user.login"
        class="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex-shrink-0"
      />
      <div class="min-w-0 flex-1">
        <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">{{ user.login }}</h3>
        <a
          :href="user.html_url"
          target="_blank"
          class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline inline-block"
          @click.stop
        >
          View on GitHub
        </a>
      </div>
    </div>
  </router-link>
</template>
