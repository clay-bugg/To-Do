//---Imports---//
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])
  const apuUrl = 'http://localhost:3001/api/tasks'
  
  //GET /api/tasks
  async function fetchTasks() { 
    try {
      const res = await fetch(apiUrl)
      tasks.value = await res.json()
    } catch (err) { 
      console.error('Failed to fetch tasks:', err)
    }
  }
  //POST /api/tasks
  async function addTask(name) {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      })
      const newTask = await res.json()
      tasks.value.push(newTask)
    } catch (err) { 
      console.error('Failed to add task:', err)
    }
  }
  //PATCH /api/tasks.:id
  async function updateTask(id, updates) { 
    try { 
      const res = await fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })

    const updatedTask = await res.json()
    const index = tasks.value.findIndex(task => task.id === id)
    if (index !== -1) { 
      tasks.value[index] = updatedTask
      }
    } catch (err) {
      console.error('Failed to update task:', err)
     }
  }
  //DELETE /api/tasks/:id
  async function deleteTask(id) { 
    try {
      await fetchTasks(`${apiUrl}/${id}`, { method: 'DELETE' })
      tasks.value = tasks.value.filter(task => task.id !== id)
    } catch (err) { 
      console.error('Failed tp delete task:', err)
    }
  }

  return {
    fetchTasks,
    tasks,
    addTask,
    updateTask,
    deleteTask,
  }
});

