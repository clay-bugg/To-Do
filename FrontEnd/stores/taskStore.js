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
  
  function completeTask(id) { 
    if (!id) return;
    const i = tasks.value.findIndex(task => task.id === id);
    if (i === -1) return;
    const [task] = tasks.value.splice(i, 1);
    task.checked = true;
    completedTasks.value.push(task); 
  }
  function deleteTask(id) { 
    if (!id) return;
    const i = tasks.value.findIndex(task => task.id === id);
    if (i === -1) return;
    const [task] = tasks.value.splice(i, 1);
    deletedTasks.value.push(task);
  }
  function deleteCompletedTask(id) {
    const i = completedTasks.value.findIndex(task => task.id === id);
    if (i === -1) return;
    const [task] = completedTasks.value.splice(i, 1);
    deletedTasks.value.push(task);
  }
  function undoTask(id) { 
    const i = completedTasks.value.findIndex((task) => task.id === id);
    if (i === -1) return;
    const [task] = completedTasks.value.splice(i, 1);
    task.checked = false;
    tasks.value.push(task);
  }
  function editTask(id) { 
    const i = tasks.value.findIndex((task) => task.id === id);
    if (i === -1) return;
    const task = tasks.value[i];
    if (!task) return;
    task.editing = !task.editing;
  }

  return {
    tasks,
    completedTasks,
    addTask,
    completeTask,
    deleteTask,
    deleteCompletedTask,
    undoTask,
    editTask,
  }
});

