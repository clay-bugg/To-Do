import { ref } from 'vue'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', () => { 
  const user = ref(null)
  const apiUrl = 'http://localhost3001/api/users'

  //Signup
  async function signup(username, password) { 
    try {
      const res = await fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (!res.ok) throw await res.json()
      const data = await res.json()
      user.value = data
      console.log('User signed up succesfully:', data)
    } catch (err) { 
      console.error('Signup failed:', err.error || err.message)
    }
  }
  //Login
  async function login(username, password) { 
    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (!res.ok) throw await res.json()
      const data = await res.json()
      user.value = data
      console.log('User logged in:', data)
    } catch (err) { 
      console.error('Login failed:', err.error || err.message)
    }
  }

  //Logout
  function logout() { 
    user.value = null
  }
  return { user, signup, login, logout }
})