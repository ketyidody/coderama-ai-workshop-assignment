import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>('light')

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      theme.value = savedTheme
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      theme.value = prefersDark ? 'dark' : 'light'
    }
    applyTheme()
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const applyTheme = () => {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
    applyTheme()
  })

  return {
    theme,
    initTheme,
    toggleTheme
  }
})
