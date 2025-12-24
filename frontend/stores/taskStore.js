//---Imports---//
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { nanoid } from 'nanoid'
import Task from '../task.js'


//---Task Store---//
export const useTaskStore = defineStore('task', () => {
  const selectedListType = ref('tasks')
  const activeTasks = computed(() => tasks.value.filter(t => !t.completed))
  const completedTasks = computed(() => tasks.value.filter(t => t.completed))
  const tasks = ref([])

//---Add Task---//
  function addTask(taskName) {
    const task = new Task(nanoid(), taskName, false)
    tasks.value.push(task)
    console.log(`'${task.name}' ID: ${task.id} added to task list`)
  }

//---Toggle completed status---//
  function toggleCompleted(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.completed = !task.completed
  }

//---Delete Task---//
  function deleteTask(id) {
    tasks.value = tasks.value.filter(t => t.id !== id)
  }


  
//---Returns---//
return {
    selectedListType,
    tasks,
    addTask,
    toggleCompleted,
    deleteTask,
    activeTasks,
    completedTasks,
  }
})
