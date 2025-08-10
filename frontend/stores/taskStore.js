import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './userStore'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])
  const apiUrl = 'http://localhost:3001/api/tasks'

  const userStore = useUserStore()

  async function fetchTasks() {
    try {
      const url = `${apiUrl}?userId=${encodeURIComponent(userStore.user.id)}`
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
      tasks.value = await res.json()
      console.log('Tasks database fetched successfully')
    } catch (err) {
      console.error('Failed to fetch tasks:', err)
    }
  }

  async function addTask(name) {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userStore.user.id,
          name
        })
      })
      if (!res.ok) throw new Error(`Add failed: ${res.status}`)
      const newTask = await res.json()
      tasks.value.push(newTask)
      console.log(`'${name}' added to tasks`)
    } catch (err) {
      console.error('Failed to add task:', err)
    }
  }

  async function updateTask(id, updates) {
    try {
      const res = await fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userStore.user.id,
          ...updates
        })
      })
      if (!res.ok) throw new Error(`Update failed: ${res.status}`)
      const updatedTask = await res.json()
      const index = tasks.value.findIndex(task => task.id === id)
      if (index !== -1) {
        const oldTask = { ...tasks.value[index] }
        tasks.value[index] = updatedTask
        console.log('Task updated from', oldTask, 'to', updatedTask)
      }
    } catch (err) {
      console.error('Failed to update task:', err)
    }
  }

  async function deleteTask(id) {
    try {
      const res = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userStore.user.id
        })
      })
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`)
      tasks.value = tasks.value.filter(task => task.id !== id)
      console.log('Task deleted')
    } catch (err) {
      console.error('Failed to delete task:', err)
    }
  }

  return {
    fetchTasks,
    tasks,
    addTask,
    updateTask,
    deleteTask
  }
}, {
  persist: true
})
