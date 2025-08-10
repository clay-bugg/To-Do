import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const apiUrl = 'http://localhost:3001/api/users'

  async function signup(username, password) {
    try {
      const res = await fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Signup failed')

      user.value = data
      console.log('User signed up successfully:', data)
    } catch (err) {
      console.error('Signup failed:', err.message)
    }
  }

  async function login(username, password) {
    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')

      user.value = data
      console.log('User logged in:', data)
    } catch (err) {
      console.error('Login failed:', err.message)
    }
  }

  function logout() {
    user.value = null
    console.log('User logged out')
  }

  return { user, signup, login, logout }
}, {
  persist: true,
})