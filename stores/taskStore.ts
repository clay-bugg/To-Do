import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as { name: string }[],
  }),
  actions: {
    addTask(name: string) {
      if (!name) return;
      this.tasks.push({ name });
    },
  },
});