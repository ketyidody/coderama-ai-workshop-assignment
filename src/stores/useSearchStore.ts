import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GitHubUser, GitHubRepository } from '@/types/github'

export const useSearchStore = defineStore('search', () => {
  const searchResults = ref<GitHubUser[]>([])
  const currentUser = ref<GitHubUser | null>(null)
  const currentUserRepos = ref<GitHubRepository[]>([])
  const recentSearches = ref<string[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const totalResults = ref(0)

  const hasResults = computed(() => searchResults.value.length > 0)
  const totalPages = computed(() => Math.ceil(totalResults.value / 10))

  function setSearchResults(results: GitHubUser[], total: number) {
    searchResults.value = results
    totalResults.value = total
  }

  function setCurrentUser(user: GitHubUser | null) {
    currentUser.value = user
  }

  function setCurrentUserRepos(repos: GitHubRepository[]) {
    currentUserRepos.value = repos
  }

  function addRecentSearch(query: string) {
    if (!recentSearches.value.includes(query)) {
      recentSearches.value = [query, ...recentSearches.value].slice(0, 5)
    }
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  function setError(err: string | null) {
    error.value = err
  }

  function setPage(page: number) {
    currentPage.value = page
  }

  function clearError() {
    error.value = null
  }

  return {
    searchResults,
    currentUser,
    currentUserRepos,
    recentSearches,
    isLoading,
    error,
    currentPage,
    totalResults,
    hasResults,
    totalPages,
    setSearchResults,
    setCurrentUser,
    setCurrentUserRepos,
    addRecentSearch,
    setLoading,
    setError,
    setPage,
    clearError
  }
})
