// stores/taskStore.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './userStore'

// safe storage for SSR
const safeStorage = typeof window !== 'undefined'
  ? window.localStorage
  : { getItem: () => null, setItem: () => {}, removeItem: () => {} }

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])
  const apiUrl = 'http://localhost:3001/api/tasks'
  const userStore = useUserStore()
  const userId = computed(() => userStore.user?.id)

  const auth = () => userStore.authHeaders()

  async function fetchTasks() {
    if (!userId.value) { tasks.value = []; return }
    const res = await fetch(`${apiUrl}?userId=${encodeURIComponent(userId.value)}`, {
      headers: { Accept: 'application/json', ...auth() }
    })
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
    tasks.value = await res.json()
  }

  async function addTask(name) {
    if (!userId.value) throw new Error('addTask: no user')
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...auth() },
      body: JSON.stringify({ userId: userId.value, name })
    })
    if (!res.ok) throw new Error(`Add failed: ${res.status}`)
    tasks.value.push(await res.json())
  }

  async function updateTask(id, updates) {
    if (!userId.value) throw new Error('updateTask: no user')
    const res = await fetch(`${apiUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...auth() },
      body: JSON.stringify({ userId: userId.value, ...updates })
    })
    if (!res.ok) throw new Error(`Update failed: ${res.status}`)
    const updated = await res.json()
    const i = tasks.value.findIndex(t => t.id === id)
    if (i !== -1) tasks.value[i] = updated
  }

  async function deleteTask(id) {
    if (!userId.value) throw new Error('deleteTask: no user')
    const res = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...auth() },
      body: JSON.stringify({ userId: userId.value })
    })
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`)
    tasks.value = tasks.value.filter(t => t.id !== id)
  }

  return { tasks, fetchTasks, addTask, updateTask, deleteTask }
}, {
  persist: {
    storage: safeStorage,
    paths: ['tasks']
  }
})