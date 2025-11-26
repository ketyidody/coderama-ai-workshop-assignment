import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// GitHub OAuth Configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:5173/auth/callback'

// In-memory session storage (in production, use Redis or database)
const sessions = new Map()

// Get GitHub login URL
app.get('/api/auth/github/url', (req, res) => {
  const state = Math.random().toString(36).substring(7)
  sessions.set(state, { createdAt: Date.now() })

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user:email&state=${state}`

  res.json({ url: githubAuthUrl, state })
})

// Exchange code for access token
app.post('/api/auth/github/callback', async (req, res) => {
  const { code, state } = req.body

  // Verify state to prevent CSRF
  if (!sessions.has(state)) {
    return res.status(400).json({ error: 'Invalid state parameter' })
  }
  sessions.delete(state)

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI
      })
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description })
    }

    // Get user data
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    const userData = await userResponse.json()

    // Create session
    const sessionId = Math.random().toString(36).substring(7)
    sessions.set(sessionId, {
      accessToken: tokenData.access_token,
      user: userData,
      createdAt: Date.now()
    })

    res.json({
      sessionId,
      user: userData,
      accessToken: tokenData.access_token
    })
  } catch (error) {
    console.error('OAuth error:', error)
    res.status(500).json({ error: 'Authentication failed' })
  }
})

// Verify session
app.get('/api/auth/verify', (req, res) => {
  const sessionId = req.headers.authorization?.replace('Bearer ', '')

  if (!sessionId || !sessions.has(sessionId)) {
    return res.status(401).json({ error: 'Invalid session' })
  }

  const session = sessions.get(sessionId)
  res.json({ user: session.user, accessToken: session.accessToken })
})

// Logout
app.post('/api/auth/logout', (req, res) => {
  const sessionId = req.headers.authorization?.replace('Bearer ', '')

  if (sessionId) {
    sessions.delete(sessionId)
  }

  res.json({ message: 'Logged out successfully' })
})

// Clean up old sessions every hour
setInterval(() => {
  const now = Date.now()
  const ONE_DAY = 24 * 60 * 60 * 1000

  for (const [key, value] of sessions.entries()) {
    if (now - value.createdAt > ONE_DAY) {
      sessions.delete(key)
    }
  }
}, 60 * 60 * 1000)

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`)
})
