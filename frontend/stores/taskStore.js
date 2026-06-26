import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTaskStore = defineStore("task", () => {
  const tasks = ref([]);
  const selectedListType = ref("tasks");
  const isDarkMode = ref(false);
  const supabase = useSupabaseClient();

  const activeTasks = computed(
    () => tasks.value?.filter((t) => !t.completed) ?? [],
  );

  const completedTasks = computed(
    () => tasks.value?.filter((t) => t.completed) ?? [],
  );

  //---Fetch Tasks---//
  async function fetchTasks() {
    const user = useSupabaseUser();
    const userId = user.value?.id ?? user.value?.sub;
    console.log(
      "[Supabase] fetchTasks called | userId:",
      userId ?? "NOT LOGGED IN",
    );
    if (!userId) return;

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Supabase] fetchTasks ERROR:", error);
      return;
    }
    console.log(
      `[Supabase] fetchTasks OK | ${data.length} task(s) loaded:`,
      data,
    );
    tasks.value = data;
  }

  //---Add Task---//
  async function addTask(taskName) {
    const user = useSupabaseUser();
    const userId = user.value?.id ?? user.value?.sub;
    console.log(
      "[Supabase] addTask called | userId:",
      userId ?? "NOT LOGGED IN",
      "| name:",
      taskName,
    );
    if (!userId) return;

    // 1. Create a temporary ID for the update
    const tempId = Date.now();
    const task = {
      id: tempId,
      name: taskName,
      completed: false,
      user_id: userId,
      created_at: new Date().toISOString(),
    };

    // 2. Update UI immediately
    tasks.value.unshift(task);

    // 3. Insert into Supabase (let it generate the real bigint ID)
    const payload = {
      name: taskName,
      completed: false,
      user_id: userId,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("tasks")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("[Supabase] addTask ERROR:", error);
      // Rollback on error
      tasks.value = tasks.value.filter((t) => t.id !== tempId);
      return;
    }

    console.log("[Supabase] addTask OK | inserted task:", data);
    // 4. Replace the temporary task with the real one (with the bigint ID)
    const index = tasks.value.findIndex((t) => t.id === tempId);
    if (index !== -1) {
      tasks.value[index] = data;
    }
  }

  //---Update Task---//
  async function updateTask(id, changes) {
    console.log(
      "[Supabase] updateTask called | id:",
      id,
      "| changes:",
      changes,
    );
    // Optimistic update
    const task = tasks.value.find((t) => t.id === id);
    if (task) Object.assign(task, changes);

    const { error } = await supabase.from("tasks").update(changes).eq("id", id);
    if (error) {
      console.error("[Supabase] updateTask ERROR:", error);
      await fetchTasks();
    } else {
      console.log("[Supabase] updateTask OK | id:", id);
    }
  }

  //---Delete Task---//
  async function deleteTask(id) {
    // Optimistic update
    tasks.value = tasks.value.filter((t) => t.id !== id);

    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error("[Supabase] deleteTask ERROR:", error);
      await fetchTasks();
    } else {
      console.log("[Supabase] deleteTask OK | id:", id);
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
