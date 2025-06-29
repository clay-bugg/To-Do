//---Imports---//
import { nanoid } from 'nanoid'
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', () => {
  //--Constants--//
  const tasks = ref<{ id: string; name: string; editing: boolean; checked: boolean }[]>([]);
  const completedTasks = ref<{ id: string; name: string; editing: boolean; checked: boolean }[]>([]);
  const deletedTasks = ref<{ id: string; name: string; editing: boolean; checked: boolean }[]>([]);
  
  //---Functions---//
  function addTask(name: string) { 
    if (!name) return;
    tasks.value.push({ id: nanoid(), name, editing: false, checked: false });
  }
  function completeTask(id: string) { 
    if (!id) return;
    const i = tasks.value.findIndex(task => task.id === id);
    if (i === -1) return;
    const [task] = tasks.value.splice(i, 1);
    task.checked = true;
    completedTasks.value.push(task); 
  }
  function deleteTask(id: string) { 
    if (!id) return;
    const i = tasks.value.findIndex(task => task.id === id);
    if (i === -1) return;
    const [task] = tasks.value.splice(i, 1);
    deletedTasks.value.push(task);
  }
  function deleteCompletedTask(id: string) {
    const i = completedTasks.value.findIndex(task => task.id === id);
    if (i === -1) return;
    const [task] = completedTasks.value.splice(i, 1);
    deletedTasks.value.push(task);
  }
  function undoTask(id: string) { 
    const i = completedTasks.value.findIndex((task) => task.id === id);
    if (i === -1) return;
    const [task] = completedTasks.value.splice(i, 1);
    task.checked = false;
    tasks.value.push(task);
  }
  function editTask(id: string) { 
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

