export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name?: string
  bio?: string
  location?: string
  blog?: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

export interface GitHubSearchResponse {
  total_count: number
  incomplete_results: boolean
  items: GitHubUser[]
}
