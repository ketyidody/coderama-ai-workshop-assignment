import axios from 'axios'
import type { GitHubUser, GitHubRepository, GitHubSearchResponse } from '@/types/github'

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
})

// Add interceptor to include auth token if available
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

export async function searchUsers(query: string, page: number = 1): Promise<GitHubSearchResponse> {
  try {
    const response = await api.get<GitHubSearchResponse>('/search/users', {
      params: {
        q: query,
        page,
        per_page: 10
      }
    })
    return response.data
  } catch (error) {
    console.error('Error searching users:', error)
    throw error
  }
}

export async function getUser(username: string): Promise<GitHubUser> {
  try {
    const response = await api.get<GitHubUser>(`/users/${username}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}

export async function getUserRepos(username: string, page: number = 1): Promise<GitHubRepository[]> {
  try {
    const response = await api.get<GitHubRepository[]>(`/users/${username}/repos`, {
      params: {
        page,
        per_page: 10,
        sort: 'updated'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching user repos:', error)
    throw error
  }
}
