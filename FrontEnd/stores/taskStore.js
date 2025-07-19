//---Imports---//
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export const useTaskStore = defineStore('task', () => {
  //--Constants--//
  const tasks = ref([])
  const completedTasks = ref([])
  const deletedTasks = ref([])
  
  //---Functions---//
  function addTask(name) { 
    if (!name) return;
    tasks.value.push({ id: nanoid(), name, editing: false, checked: false });
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

