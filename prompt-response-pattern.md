# PRP — Vue 3 GitHub Search Application

## 1. Technology Stack Rules
Claude must always use the following stack:

- **Vue 3** with **Composition API**
- **`<script setup>`** syntax
- **TypeScript**
- **Vite** as the build tool
- **Pinia** for global state
- **Vue Router**
- **Tailwind CSS**
- **Axios** for all API communication
- **GitHub REST API v3**  
  Base URL: `https://api.github.com`

---

## 2. Project Architecture Rules

```
src/
  assets/
  components/
  composables/
  router/
  stores/
  views/
  utils/
  types/
```

### Folder Description
- **components/** – Reusable components
- **views/** – Page-level components
- **composables/** – Reusable logic (`useSomething.ts`)
- **stores/** – Pinia stores
- **utils/** – Helper/util files
- **types/** – TypeScript interfaces for GitHub API data

---

## 3. API Rules

- All requests must be routed through:  
  `src/utils/api.ts`
- Must use an Axios instance with:
    - pre-set base URL
    - optional Authorization header
- API functions must return:
    - typed results
    - proper error handling
- No UI logic in API functions

### Required API Methods
- `searchUsers(query: string, page: number)`
- `getUser(username: string)`
- `getUserRepos(username: string, page: number)`

---

## 4. State Management (Pinia)

- Stores must:
    - use TypeScript
    - be named: `useNameStore.ts`
- Stores handle:
    - recent searches
    - search results
    - user profiles
    - loading state
    - pagination
- No UI logic in stores
- Use getters for computed values

---

## 5. Component Rules

- Component naming: **PascalCase**
- Must use **`<script setup lang="ts">`**
- Minimal logic inside components
- Use composables for reusable logic
- Tailwind for styling
- Props & Emits must use TypeScript

### Recommended Components
- `SearchBar.vue`
- `UserCard.vue`
- `RepositoryList.vue`
- `Pagination.vue`
- `LoadingSpinner.vue`
- `ErrorMessage.vue`

---

## 6. Views Rules

Views represent top-level pages:

- `HomeView.vue` – search UI
- `UserView.vue` – user profile + repos
- `ErrorView.vue` – fallback error page

Views may contain multiple child components but must stay lean.

---

## 7. Composables Rules

Composables must:

- be named: `useXyz.ts`
- contain reusable logic only
- return reactive values and functions
- never contain UI or CSS logic

### Examples
- `useGithubSearch.ts`
- `usePagination.ts`
- `useDebouncedRef.ts`

---

## 8. Routing Rules

- Use file: `src/router/index.ts`
- Routes must be lazy-loaded
- Example pattern:

```ts
{
  path: '/user/:username',
  name: 'user',
  component: () => import('../views/UserView.vue')
}
```

---

## 9. UX & UI Rules

- Use Tailwind for all styling
- Components must be responsive
- Buttons require hover/active states
- Include:
    - empty state
    - loading state
    - error state
- Use Figma MCP for the following designs:
  - color style guide: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=1-313&t=fe8lQQXrpSwQY21F-0
  - typography style guide: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=1-131&t=fe8lQQXrpSwQY21F-0
  - spacing style guide: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=1-164&t=fe8lQQXrpSwQY21F-0
  - radius style guide: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=1-251&t=fe8lQQXrpSwQY21F-0
  - logo: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=3-994&t=fe8lQQXrpSwQY21F-0
  - icons: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=5-134&t=fe8lQQXrpSwQY21F-0
  - profile: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=5-659&t=fe8lQQXrpSwQY21F-0
  - search: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=5-172&t=fe8lQQXrpSwQY21F-0
  - search bar light: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=5-351&t=fe8lQQXrpSwQY21F-0
  - search bar dark: https://www.figma.com/design/CSKrPZ4ETBC5JY5zjRoTXn/github-user-search-app?node-id=5-587&t=fe8lQQXrpSwQY21F-0

---

## 10. Error Handling Rules

- API errors must not break the app
- Show user-friendly messages
- Retry mechanism optional
- Console logging only during development

---

## 11. Claude Code Response Rules

When Claude generates code:

### Always:
- Use fenced code blocks
- No explanation unless requested
- When updating files:
    - state the file path
    - show only updated code
- When generating new files:
    - state: **“Create file: src/…”**
    - include full file content

Example:

```
Create file: src/stores/useSearchStore.ts
```

```
import { defineStore } from 'pinia'
...
```

---

## 12. Development Process Rules

Claude must:

1. Ask whether to create a new file or modify an existing one
2. Follow the folder structure strictly
3. Generate code only after confirmation
4. Keep features isolated
5. Avoid boilerplate and duplication
6. Follow Vue + TypeScript best practices

---
