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
  <div class="py-300">
    <SearchBar @search="handleSearch" />

    <div v-if="store.recentSearches.length > 0" class="mt-200 text-center">
      <span class="text-preset-7 text-neutral-500 dark:text-neutral-300">Recent: </span>
      <button
        v-for="search in store.recentSearches"
        :key="search"
        @click="handleSearch(search)"
        class="ml-200 mt-100 inline-block text-preset-7 text-blue-500 hover:underline"
      >
        {{ search }}
      </button>
    </div>

    <div class="mt-300">
      <LoadingSpinner v-if="store.isLoading" />

      <ErrorMessage v-else-if="store.error" :message="store.error" />

      <div v-else-if="store.hasResults" class="space-y-200">
        <p class="text-preset-4 text-neutral-500 dark:text-neutral-300 mb-200">
          Found {{ store.totalResults }} users
        </p>
        <UserCard v-for="user in store.searchResults" :key="user.id" :user="user" />
        <Pagination
          :current-page="store.currentPage"
          :total-pages="store.totalPages"
          @page-change="handlePageChange"
        />
      </div>

      <div v-else class="text-center text-neutral-500 dark:text-neutral-300 mt-800">
        <p class="text-preset-3">Search for GitHub users to get started</p>
      </div>
    </div>
  </div>
</template>
