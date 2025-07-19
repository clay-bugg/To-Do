//---Imports---//
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])
  const apiUrl = 'http://localhost:3001/api/tasks'
  
  //GET /api/tasks
  async function fetchTasks() { 
    try {
      const res = await fetch(apiUrl)
      tasks.value = await res.json()
      console.log('Tasks database fetched succesfully')
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
      console.log(`'${name}' added to tasks`)
    } catch (err) { 
      console.error('Failed to add task:', err)
    }
  }
  //PATCH /api/tasks/:id
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
      const oldTask = { ...tasks.value[index] }
      tasks.value[index] = updatedTask
      console.log('Task updated from', oldTask, 'to', updatedTask)
      }
    } catch (err) {
      console.error('Failed to update task:', err)
     }
  }
  //DELETE /api/tasks/:id
  async function deleteTask(id) { 
    try {
      await fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
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
    deleteTask,
  }
});

