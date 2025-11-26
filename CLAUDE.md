# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GitHub User Search Application built with Vue 3, TypeScript, and Tailwind CSS. The app allows users to search for GitHub users via the GitHub REST API and view detailed user profiles with their repositories.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs both frontend and backend)
npm run dev

# Start frontend only
npm run dev:client

# Start backend only
npm run dev:server

# Build for production
npm run build

# Preview production build
npm run preview
```

## Authentication Setup

Before running the application, you must configure GitHub OAuth:

1. See `SETUP.md` for detailed instructions
2. Create a GitHub OAuth App at https://github.com/settings/developers
3. Copy `.env.example` to `.env` and add your credentials
4. Set callback URL to: `http://localhost:5173/auth/callback`

## Technology Stack

**Frontend:**
- **Vue 3** with Composition API and `<script setup>` syntax
- **TypeScript** for type safety
- **Vite** as the build tool
- **Pinia** for state management
- **Vue Router** for routing
- **Tailwind CSS** for styling
- **Axios** for API communication

**Backend:**
- **Express** for OAuth server (port 3001)
- **GitHub OAuth** for authentication
- **GitHub REST API v3** (base URL: `https://api.github.com`)

## Architecture

### Folder Structure

```
src/
  assets/        # Static assets
  components/    # Reusable Vue components
  composables/   # Reusable logic (useXyz.ts pattern)
  router/        # Vue Router configuration
  stores/        # Pinia stores
  utils/         # Utility functions and API layer
  types/         # TypeScript type definitions
  views/         # Page-level components
```

### Key Components

**Search & Display:**
- **SearchBar.vue** - Search input with form handling
- **UserCard.vue** - Displays user info in search results
- **RepositoryList.vue** - Lists user repositories
- **Pagination.vue** - Pagination controls
- **LoadingSpinner.vue** - Loading state indicator
- **ErrorMessage.vue** - Error display component

**Authentication:**
- **LoginButton.vue** - GitHub OAuth login button
- **UserMenu.vue** - Logged-in user menu with profile/logout
- **ThemeToggle.vue** - Dark/light mode toggle

### Views

- **HomeView.vue** - Main search interface
- **DashboardView.vue** - Protected dashboard for authenticated users with enhanced repository data
- **UserView.vue** - Public user profile and repositories
- **AuthCallbackView.vue** - OAuth callback handler
- **ErrorView.vue** - 404 error page

### State Management

**useSearchStore** (Pinia) manages:
- Search results and pagination
- Current user profile data
- User repositories
- Recent searches history
- Loading and error states

**useAuthStore** (Pinia) manages:
- User authentication state
- GitHub OAuth flow
- Session management
- Login/logout functionality
- Access token storage

**useThemeStore** (Pinia) manages:
- Light/dark theme preference
- Theme persistence in localStorage
- Theme toggle functionality

### API Layer

**GitHub API** (`src/utils/api.ts`):
- `searchUsers(query, page)` - Search for GitHub users
- `getUser(username)` - Fetch single user profile
- `getUserRepos(username, page)` - Fetch user's repositories
- Automatically includes auth token when user is logged in
- Increases rate limit from 60 to 5000 requests/hour when authenticated

**OAuth Server** (`server/index.js`):
- `/api/auth/github/url` - Get GitHub OAuth authorization URL
- `/api/auth/github/callback` - Exchange code for access token
- `/api/auth/verify` - Verify session validity
- `/api/auth/logout` - Terminate user session

## Conventions

### Component Guidelines

- Use PascalCase for component names
- Always use `<script setup lang="ts">` syntax
- Keep component logic minimal, extract to composables when reusable
- Define Props and Emits with TypeScript interfaces
- Use Tailwind CSS for all styling

### Import Aliases

The `@` alias points to the `src/` directory:
```typescript
import { useSearchStore } from '@/stores/useSearchStore'
import type { GitHubUser } from '@/types/github'
```

### Routing

Routes are lazy-loaded for optimal performance:
```typescript
{
  path: '/user/:username',
  component: () => import('../views/UserView.vue')
}
```

**Protected Routes:**
Routes can be protected using the `requiresAuth` meta field:
```typescript
{
  path: '/dashboard',
  component: () => import('../views/DashboardView.vue'),
  meta: { requiresAuth: true }
}
```
- Protected routes redirect to home if user is not authenticated
- Route guard is implemented in `router/index.ts`

### Error Handling

- API errors are caught and displayed via user-friendly messages
- Loading states prevent UI flickering
- Empty states guide users when no data is present

## Development Guidelines

Refer to `prompt-response-pattern.md` for detailed coding standards and Claude Code interaction patterns specific to this project.
