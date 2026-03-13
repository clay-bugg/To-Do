import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const supabase = useSupabaseClient()

  async function fetchUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error) console.error('Error fetching user:', error)
    user.value = data.user
    console.log('[Supabase] fetchUser OK | user:', user.value)
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Error logging out:', error)
    user.value = null
  }

  return { user, fetchUser, logout }
})
