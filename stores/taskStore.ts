import { ref } from 'vue';
import { defineStore } from 'pinia';

let nextId = 1;

export const useTaskStore = defineStore('task', () => {

  const tasks = ref<{ id: number; name: string }[]>([]);
  const completedTasks = ref<{ id: number; name: string }[]>([]);
  
  function addTask(name: string) { 
    if (!name) return;
    tasks.value.push({ id: nextId++, name });
  }
  function completeTask(id: number) { 
    if (!id) return;

    const i = tasks.value.findIndex(task => task.id === id);
    if (i === -1) return;

    const [task] = tasks.value.splice(i, 1);
    completedTasks.value.push(task);
  }

  return {
    tasks,
    completedTasks,
    addTask,
    completeTask
  }
});
