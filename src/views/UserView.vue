<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSearchStore } from '@/stores/useSearchStore'
import { getUser, getUserRepos } from '@/utils/api'
import RepositoryList from '@/components/RepositoryList.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const route = useRoute()
const store = useSearchStore()

onMounted(async () => {
  const username = route.params.username as string

  store.setLoading(true)
  store.clearError()

  try {
    const [user, repos] = await Promise.all([
      getUser(username),
      getUserRepos(username, 1)
    ])

    store.setCurrentUser(user)
    store.setCurrentUserRepos(repos)
  } catch (err) {
    store.setError('Failed to load user data. Please try again.')
  } finally {
    store.setLoading(false)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 px-4 sm:py-6 md:py-8 transition-colors">
    <div class="max-w-4xl mx-auto">
      <router-link to="/" class="text-sm md:text-base text-blue-600 dark:text-blue-400 hover:underline mb-4 md:mb-6 inline-block">
        ← Back to Search
      </router-link>

      <LoadingSpinner v-if="store.isLoading" />

      <ErrorMessage v-else-if="store.error" :message="store.error" />

      <div v-else-if="store.currentUser">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 md:p-8 mb-6 md:mb-8 transition-colors">
          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-8">
            <img
              :src="store.currentUser.avatar_url"
              :alt="store.currentUser.login"
              class="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-gray-100 dark:border-gray-700 flex-shrink-0"
            />
            <div class="flex-1 w-full text-center sm:text-left">
              <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white break-words">
                {{ store.currentUser.name || store.currentUser.login }}
              </h1>
              <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-1">@{{ store.currentUser.login }}</p>

              <p v-if="store.currentUser.bio" class="mt-3 md:mt-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                {{ store.currentUser.bio }}
              </p>

              <div class="mt-3 md:mt-4 space-y-2">
                <div v-if="store.currentUser.location" class="flex items-center justify-center sm:justify-start gap-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
                  <span>📍</span>
                  <span>{{ store.currentUser.location }}</span>
                </div>
                <div v-if="store.currentUser.blog" class="flex items-center justify-center sm:justify-start gap-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
                  <span>🔗</span>
                  <a :href="store.currentUser.blog.startsWith('http') ? store.currentUser.blog : `https://${store.currentUser.blog}`"
                     target="_blank"
                     class="text-blue-600 dark:text-blue-400 hover:underline break-all">
                    {{ store.currentUser.blog }}
                  </a>
                </div>
              </div>

              <div class="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 md:gap-8 mt-4 md:mt-6 text-sm md:text-base">
                <div class="text-center">
                  <div class="font-bold text-xl md:text-2xl text-gray-900 dark:text-white">{{ store.currentUser.public_repos }}</div>
                  <div class="text-xs md:text-base text-gray-600 dark:text-gray-400">Public Repos</div>
                </div>
                <div class="text-center">
                  <div class="font-bold text-xl md:text-2xl text-gray-900 dark:text-white">{{ store.currentUser.followers }}</div>
                  <div class="text-xs md:text-base text-gray-600 dark:text-gray-400">Followers</div>
                </div>
                <div class="text-center">
                  <div class="font-bold text-xl md:text-2xl text-gray-900 dark:text-white">{{ store.currentUser.following }}</div>
                  <div class="text-xs md:text-base text-gray-600 dark:text-gray-400">Following</div>
                </div>
              </div>

              <div class="mt-4 md:mt-6 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
                <span>📅 Joined {{ new Date(store.currentUser.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
              </div>

              <a
                :href="store.currentUser.html_url"
                target="_blank"
                class="inline-block mt-4 md:mt-6 px-4 sm:px-6 py-2 text-sm md:text-base bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </div>

        <h2 class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
          Repositories ({{ store.currentUserRepos.length }})
        </h2>
        <RepositoryList v-if="store.currentUserRepos.length > 0" :repositories="store.currentUserRepos" />
        <p v-else class="text-sm md:text-base text-gray-500 dark:text-gray-400">No public repositories</p>
      </div>
    </div>
  </div>
</template>
