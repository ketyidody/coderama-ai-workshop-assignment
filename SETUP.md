# GitHub OAuth Setup Instructions

## 1. Create a GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: GitHub User Search (or any name)
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: `http://localhost:5173/auth/callback`
4. Click "Register application"
5. Copy the **Client ID**
6. Click "Generate a new client secret" and copy it

## 2. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your GitHub OAuth credentials:
   ```
   GITHUB_CLIENT_ID=your_actual_client_id
   GITHUB_CLIENT_SECRET=your_actual_client_secret
   REDIRECT_URI=http://localhost:5173/auth/callback
   PORT=3001
   ```

## 3. Run the Application

```bash
npm run dev
```

This will start both the frontend (port 5173) and backend OAuth server (port 3001).

## 4. Test Authentication

1. Open http://localhost:5173
2. Click the "Sign in with GitHub" button
3. Authorize the application
4. You will be redirected back and logged in

## Security Notes

- **Never commit `.env` file** - It's already in `.gitignore`
- In production, use environment variables from your hosting provider
- Use a secure session store (Redis/database) instead of in-memory storage
- Enable HTTPS in production
