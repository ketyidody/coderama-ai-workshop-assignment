# GitHub Search App

A Vue 3 application for searching GitHub users and viewing their profiles and repositories with GitHub OAuth authentication.

## Features

- 🔍 Search for GitHub users
- 👤 View detailed user profiles
- 📦 Browse user repositories
- 🔐 GitHub OAuth authentication
- 🏠 Protected dashboard for authenticated users with enhanced repository information
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- 📊 Recent search history
- ⚡ Pagination support with load more
- 🎨 Modern UI with Tailwind CSS

## Prerequisites

Before you begin, you need to create a GitHub OAuth App:

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: GitHub User Search (or any name)
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: `http://localhost:5173/auth/callback`
4. Click "Register application"
5. Copy the **Client ID** and generate a **Client Secret**

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and add your GitHub OAuth credentials:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```
GITHUB_CLIENT_ID=your_actual_client_id
GITHUB_CLIENT_SECRET=your_actual_client_secret
REDIRECT_URI=http://localhost:5173/auth/callback
PORT=3001
```

### 3. Start Development Server

```bash
# Runs both frontend (port 5173) and backend OAuth server (port 3001)
npm run dev
```

Or run them separately:

```bash
# Frontend only
npm run dev:client

# Backend only
npm run dev:server
```

### 4. Build for Production

```bash
npm run build
```

## Tech Stack

**Frontend:**
- Vue 3 + TypeScript
- Vite
- Pinia (State Management)
- Vue Router
- Tailwind CSS
- Axios

**Backend:**
- Express (OAuth Server)
- GitHub OAuth
- GitHub REST API v3

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable components
├── composables/    # Reusable composition functions
├── router/         # Vue Router configuration
├── stores/         # Pinia stores
├── types/          # TypeScript type definitions
├── utils/          # Utility functions and API
├── views/          # Page components
├── App.vue         # Root component
└── main.ts         # Application entry point
```

## Usage

1. Run the development server with `npm run dev`
2. Open your browser to http://localhost:5173
3. **(Optional)** Click "Sign in with GitHub" to authenticate
   - Authenticated users get higher API rate limits (5000/hour vs 60/hour)
   - Access to protected dashboard with enhanced repository information
   - View detailed stats: stars, forks, language, last updated
4. **Dashboard** (Protected - requires authentication):
   - Access via user menu → Dashboard
   - View all your repositories with detailed information
   - See repository stats at a glance
   - Load more repositories with infinite scroll
5. **Public Search**:
   - Search for GitHub users by username or name
   - Click on a user card to view their profile and repositories
6. Toggle between light and dark themes using the theme button

## Authentication Flow

1. User clicks "Sign in with GitHub"
2. Redirected to GitHub OAuth authorization page
3. User authorizes the application
4. GitHub redirects back with authorization code
5. Backend exchanges code for access token
6. User is logged in and session is created
7. Access token is used for all GitHub API requests

## API Endpoints

**Backend OAuth Server (port 3001):**
- `GET /api/auth/github/url` - Get GitHub OAuth URL
- `POST /api/auth/github/callback` - Exchange code for token
- `GET /api/auth/verify` - Verify session
- `POST /api/auth/logout` - Logout user

## Security Notes

- Never commit `.env` file
- Client secret is stored only on the backend
- Sessions are stored in-memory (use Redis/database in production)
- State parameter prevents CSRF attacks
- Access tokens are stored securely

## Development

See `SETUP.md` for detailed setup instructions and `CLAUDE.md` for architecture details.
