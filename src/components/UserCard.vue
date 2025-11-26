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
    class="block bg-neutral-0 dark:bg-neutral-800 rounded-16 shadow-search-light dark:shadow-none p-300 hover:opacity-90 transition-all"
  >
    <div class="flex items-center gap-300">
      <img
        :src="user.avatar_url"
        :alt="user.login"
        class="w-[70px] h-[70px] sm:w-[117px] sm:h-[117px] rounded-full flex-shrink-0"
      />
      <div class="min-w-0 flex-1">
        <h3 class="text-preset-2 text-neutral-900 dark:text-neutral-0 truncate">{{ user.login }}</h3>
        <a
          :href="user.html_url"
          target="_blank"
          class="text-preset-7 text-blue-500 hover:underline inline-block mt-050"
          @click.stop
        >
          @{{ user.login }}
        </a>
      </div>
    </div>
  </router-link>
</template>
