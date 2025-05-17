import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as { name: string }[],
    completedTasks: [] as { name: string }[]
  }),

  actions: {
    addTask(name: string) {
      if (!name) return;
      this.tasks.push({ name });
    },
    completeTask(name: string) { 
      if (!name) return;

      const i = this.tasks.findIndex(task => task.name === name);
      if (i === -1) return;
      const [task] = this.tasks.splice(i, 1);
      this.completedTasks.push(task);
    }
  },
});