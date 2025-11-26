<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { getUserRepos } from '@/utils/api'
import type { GitHubRepository } from '@/types/github'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const router = useRouter()
const authStore = useAuthStore()
const repositories = ref<GitHubRepository[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)
const hasMore = ref(true)

// Redirect if not authenticated
if (!authStore.isAuthenticated) {
  router.push('/')
}

const loadRepositories = async (page: number = 1) => {
  if (!authStore.user) return

  isLoading.value = true
  error.value = null

  try {
    const repos = await getUserRepos(authStore.user.login, page)

    if (page === 1) {
      repositories.value = repos
    } else {
      repositories.value = [...repositories.value, ...repos]
    }

    hasMore.value = repos.length === 10
    currentPage.value = page
  } catch (err) {
    error.value = 'Failed to load repositories. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const loadMore = () => {
  if (hasMore.value && !isLoading.value) {
    loadRepositories(currentPage.value + 1)
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return 'Updated yesterday'
  if (diffDays < 7) return `Updated ${diffDays} days ago`
  if (diffDays < 30) return `Updated ${Math.ceil(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `Updated ${Math.ceil(diffDays / 30)} months ago`
  return `Updated ${Math.ceil(diffDays / 365)} years ago`
}

onMounted(() => {
  loadRepositories(1)
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 px-4 sm:py-6 md:py-8 transition-colors">
    <div class="max-w-6xl mx-auto">
      <div v-if="authStore.user" class="mb-6 md:mb-8">
        <!-- User Profile Header -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 md:p-8 transition-colors">
          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <img
              :src="authStore.user.avatar_url"
              :alt="authStore.user.login"
              class="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-gray-100 dark:border-gray-700 flex-shrink-0"
            />
            <div class="flex-1 text-center sm:text-left">
              <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {{ authStore.user.name || authStore.user.login }}
              </h1>
              <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400 mt-1">@{{ authStore.user.login }}</p>

              <p v-if="authStore.user.bio" class="mt-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                {{ authStore.user.bio }}
              </p>

              <div class="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 mt-4 text-sm">
                <div class="text-center">
                  <div class="font-bold text-xl text-gray-900 dark:text-white">{{ authStore.user.public_repos }}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Repositories</div>
                </div>
                <div class="text-center">
                  <div class="font-bold text-xl text-gray-900 dark:text-white">{{ authStore.user.followers }}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Followers</div>
                </div>
                <div class="text-center">
                  <div class="font-bold text-xl text-gray-900 dark:text-white">{{ authStore.user.following }}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Repositories Section -->
      <div class="mb-4">
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
          My Repositories
          <span v-if="!isLoading && repositories.length > 0" class="text-gray-500 dark:text-gray-400 font-normal text-lg">
            ({{ repositories.length }})
          </span>
        </h2>
      </div>

      <LoadingSpinner v-if="isLoading && repositories.length === 0" />

      <ErrorMessage v-else-if="error" :message="error" />

      <div v-else-if="repositories.length > 0" class="space-y-3 md:space-y-4">
        <!-- Repository Cards -->
        <div
          v-for="repo in repositories"
          :key="repo.id"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-4 sm:p-5 transition-all border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1 min-w-0">
              <a
                :href="repo.html_url"
                target="_blank"
                class="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline break-words inline-flex items-center gap-2"
              >
                {{ repo.name }}
                <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              <p v-if="repo.description" class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                {{ repo.description }}
              </p>

              <!-- Repository Metadata -->
              <div class="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-xs sm:text-sm">
                <span v-if="repo.language" class="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                  <span class="w-3 h-3 rounded-full bg-blue-500"></span>
                  {{ repo.language }}
                </span>

                <span class="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {{ repo.stargazers_count }}
                </span>

                <span class="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  {{ repo.forks_count }}
                </span>

                <span class="text-gray-500 dark:text-gray-400">
                  {{ formatDate(repo.updated_at) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div v-if="hasMore" class="text-center pt-4">
          <button
            @click="loadMore"
            :disabled="isLoading"
            class="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="!isLoading">Load More</span>
            <span v-else>Loading...</span>
          </button>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 dark:text-gray-400 py-12">
        <p class="text-lg">No repositories found</p>
      </div>
    </div>
  </div>
</template>
