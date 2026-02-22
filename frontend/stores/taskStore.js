import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { nanoid } from "nanoid";
import Task from "../task.js";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref([]);
  const selectedListType = ref("tasks");
  const isDarkMode = ref(false);

  const activeTasks = computed(() => tasks.value.filter((t) => !t.completed));
  const completedTasks = computed(() => tasks.value.filter((t) => t.completed));

  function addTask(taskName) {
    const task = new Task(nanoid(), taskName, false, false);
    tasks.value.push(task);
  }

  function updateTask(id, changes) {
    const task = tasks.value.find((t) => t.id === id);
    if (task) Object.assign(task, changes);
  }

  function toggleCompleted(id) {
    const task = tasks.value.find((t) => t.id === id);
    if (task) task.completed = !task.completed;
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  }

  return {
    selectedListType,
    tasks,
    addTask,
    updateTask,
    toggleCompleted,
    deleteTask,
    activeTasks,
    completedTasks,
    isDarkMode,
  };
});
