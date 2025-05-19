import { nanoid } from 'nanoid'
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', () => {

  const tasks = ref<{ id: string; name: string; checked: boolean }[]>([]);
  const completedTasks = ref<{ id: string; name: string; checked: boolean }[]>([]);
  const deletedTasks = ref<{ id: string; name: string;  checked: boolean }[]>([]);
  
  function addTask(name: string) { 
    if (!name) return;
    tasks.value.push({ id: nanoid(), name, checked: false });
  }

  function completeTask(id: string) { 
    if (!id) return;

    const i = tasks.value.findIndex(task => task.id === id);
    if (i === -1) return;

    const [task] = tasks.value.splice(i, 1);
    
    completedTasks.value.push(task);
    console.log(completedTasks.value);
  }
  function deleteTask(id: string) { 
    if (!id) return;

    const i = tasks.value.findIndex(task => task.id === id);
    if (i === -1) return;

    const [task] = tasks.value.splice(i, 1);
    deletedTasks.value.push(task);
    console.log(deletedTasks.value);
  }
  function deleteCompletedTask(id: string) {
    const i = completedTasks.value.findIndex(task => task.id === id);
    if (i === -1) return;
    const [task] = completedTasks.value.splice(i, 1);
    deletedTasks.value.push(task);
    console.log(deletedTasks.value)
  }
  function undoTask(id: string) { 
    const i = completedTasks.value.findIndex((task) => task.id === id);
    if (i === -1) return;
    const [task] = completedTasks.value.splice(i, 1);
    tasks.value.push(task);
    console.log(tasks.value);
  }

  return {
    tasks,
    completedTasks,
    addTask,
    completeTask,
    deleteTask,
    deleteCompletedTask,
    undoTask,
  }
});
