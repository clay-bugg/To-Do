// stores/userStore.js
import { ref } from 'vue'
import { defineStore } from 'pinia'

// safe storage for SSR
const safeStorage = typeof window !== 'undefined'
  ? window.localStorage
  : { getItem: () => null, setItem: () => {}, removeItem: () => {} }

export const useUserStore = defineStore('user', () => {
  const apiUrl = 'http://localhost:3001/api/users'
  const user = ref(null)
  const token = ref(safeStorage.getItem('token'))

  function setToken(val) {
    token.value = val
    if (val) safeStorage.setItem('token', val)
    else safeStorage.removeItem('token')
  }

  async function signup(username, password) {
    const res = await fetch(`${apiUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || 'Signup failed')
    user.value = data // { id, username }
  }

  async function login(username, password) {
    const res = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || 'Login failed')
    user.value = { id: data.id, username: data.username }
    setToken(data.token || null)
  }

  function logout() {
    user.value = null
    setToken(null)
  }

  // helper for auth headers
  function authHeaders() {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  }

  return { user, token, signup, login, logout, authHeaders }
}, {
  persist: {
    storage: safeStorage,
    paths: ['user', 'token']
  }
})
js
Copy
Edit
