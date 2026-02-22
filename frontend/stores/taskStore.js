import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { nanoid } from "nanoid";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref([]);
  const selectedListType = ref("tasks");
  const isDarkMode = ref(false);

  const activeTasks = computed(
    () => tasks.value?.filter((t) => !t.completed) ?? [],
  );
  const completedTasks = computed(
    () => tasks.value?.filter((t) => t.completed) ?? [],
  );

  //---Fetch Tasks---//
  async function fetchTasks() {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    if (!user.value) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.value.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("fetchTasks:", error);
      return;
    }
    tasks.value = data;
  }
  //---Add Task---//
  async function addTask(taskName) {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    if (!user.value) return;

    const newTask = {
      id: nanoid(),
      name: taskName,
      completed: false,
      user_id: user.value.id,
    };

    const { error } = await supabase.from("tasks").insert(newTask);
    if (error) {
      console.error("addTask:", error);
      return;
    }
    tasks.value.unshift(newTask);
  }
  //---Update Task---//
  async function updateTask(id, changes) {
    const supabase = useSupabaseClient();

    // Optimistic update
    const task = tasks.value.find((t) => t.id === id);
    if (task) Object.assign(task, changes);

    const { error } = await supabase.from("tasks").update(changes).eq("id", id);
    if (error) {
      console.error("updateTask:", error);
      await fetchTasks();
    }
  }
  //---Delete Task---//
  async function deleteTask(id) {
    const supabase = useSupabaseClient();

    // Optimistic update
    tasks.value = tasks.value.filter((t) => t.id !== id);

    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error("deleteTask:", error);
      await fetchTasks();
    }
  }

  return {
    selectedListType,
    tasks,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    activeTasks,
    completedTasks,
    isDarkMode,
  };
});
