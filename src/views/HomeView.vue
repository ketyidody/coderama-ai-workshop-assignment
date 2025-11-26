<script setup lang="ts">
import { ref } from 'vue'
import { useSearchStore } from '@/stores/useSearchStore'
import { searchUsers } from '@/utils/api'
import SearchBar from '@/components/SearchBar.vue'
import UserCard from '@/components/UserCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Pagination from '@/components/Pagination.vue'

const store = useSearchStore()

const handleSearch = async (query: string) => {
  store.setLoading(true)
  store.clearError()
  store.setPage(1)

  try {
    const data = await searchUsers(query, 1)
    store.setSearchResults(data.items, data.total_count)
    store.addRecentSearch(query)
  } catch (err) {
    store.setError('Failed to search users. Please try again.')
  } finally {
    store.setLoading(false)
  }
}

const handlePageChange = async (page: number) => {
  store.setLoading(true)
  store.clearError()
  store.setPage(page)

  try {
    const lastSearch = store.recentSearches[0]
    if (lastSearch) {
      const data = await searchUsers(lastSearch, page)
      store.setSearchResults(data.items, data.total_count)
    }
  } catch (err) {
    store.setError('Failed to load page. Please try again.')
  } finally {
    store.setLoading(false)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 px-4 sm:py-6 md:py-8 transition-colors">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-gray-900 dark:text-white">
        GitHub User Search
      </h1>

      <SearchBar @search="handleSearch" />

      <div v-if="store.recentSearches.length > 0" class="mt-3 md:mt-4 text-center px-2">
        <span class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Recent: </span>
        <button
          v-for="search in store.recentSearches"
          :key="search"
          @click="handleSearch(search)"
          class="ml-1 sm:ml-2 mt-1 inline-block text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {{ search }}
        </button>
      </div>

      <div class="mt-6 md:mt-8">
        <LoadingSpinner v-if="store.isLoading" />

        <ErrorMessage v-else-if="store.error" :message="store.error" />

        <div v-else-if="store.hasResults" class="space-y-3 md:space-y-4">
          <p class="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">
            Found {{ store.totalResults }} users
          </p>
          <UserCard v-for="user in store.searchResults" :key="user.id" :user="user" />
          <Pagination
            :current-page="store.currentPage"
            :total-pages="store.totalPages"
            @page-change="handlePageChange"
          />
        </div>

        <div v-else class="text-center text-gray-500 dark:text-gray-400 mt-8 md:mt-12 px-4">
          <p class="text-lg md:text-xl">Search for GitHub users to get started</p>
        </div>
      </div>
    </div>
  </div>
</template>
