import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const API_BASE = 'http://localhost:3001'

interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  name: string
  email: string
  bio: string
  location: string
  blog: string
  public_repos: number
  followers: number
  following: number
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<GitHubUser | null>(null)
  const sessionId = ref<string | null>(null)
  const accessToken = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value && !!sessionId.value)

  // Initialize auth from localStorage
  const initAuth = async () => {
    const savedSessionId = localStorage.getItem('sessionId')
    const savedAccessToken = localStorage.getItem('accessToken')
    const savedUser = localStorage.getItem('user')

    if (savedSessionId && savedAccessToken && savedUser) {
      sessionId.value = savedSessionId
      accessToken.value = savedAccessToken
      user.value = JSON.parse(savedUser)

      // Verify session is still valid
      try {
        await verifySession()
      } catch (err) {
        logout()
      }
    }
  }

  // Get GitHub OAuth URL
  const getGitHubAuthUrl = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/auth/github/url`)
      return response.data
    } catch (err) {
      error.value = 'Failed to get authentication URL'
      throw err
    }
  }

  // Handle OAuth callback
  const handleCallback = async (code: string, state: string) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await axios.post(`${API_BASE}/api/auth/github/callback`, {
        code,
        state
      })

      const { sessionId: newSessionId, user: userData, accessToken: token } = response.data

      sessionId.value = newSessionId
      accessToken.value = token
      user.value = userData

      // Save to localStorage
      localStorage.setItem('sessionId', newSessionId)
      localStorage.setItem('accessToken', token)
      localStorage.setItem('user', JSON.stringify(userData))

      return userData
    } catch (err: any) {
      error.value = err.response?.data?.error || 'Authentication failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Verify session
  const verifySession = async () => {
    if (!sessionId.value) return

    try {
      const response = await axios.get(`${API_BASE}/api/auth/verify`, {
        headers: {
          Authorization: `Bearer ${sessionId.value}`
        }
      })

      user.value = response.data.user
      accessToken.value = response.data.accessToken
    } catch (err) {
      logout()
      throw err
    }
  }

  // Login (redirects to GitHub)
  const login = async () => {
    try {
      const { url, state } = await getGitHubAuthUrl()
      localStorage.setItem('oauth_state', state)
      window.location.href = url
    } catch (err) {
      error.value = 'Failed to initiate login'
    }
  }

  // Logout
  const logout = async () => {
    try {
      if (sessionId.value) {
        await axios.post(`${API_BASE}/api/auth/logout`, {}, {
          headers: {
            Authorization: `Bearer ${sessionId.value}`
          }
        })
      }
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      sessionId.value = null
      accessToken.value = null
      localStorage.removeItem('sessionId')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      localStorage.removeItem('oauth_state')
    }
  }

  return {
    user,
    sessionId,
    accessToken,
    isLoading,
    error,
    isAuthenticated,
    initAuth,
    login,
    logout,
    handleCallback,
    verifySession
  }
})
