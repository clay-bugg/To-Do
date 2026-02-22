<template>
  <div class="page">
    <div class="app">
      <Header />
      <div class="todo-list container">
        <MenuButtons />
        <NewTaskInput />
        <TaskList />
      </div>
    </div>
  </div>
</template>

<script setup>
const { fetchTasks } = useTaskStore();
const user = useSupabaseUser();

// Fetch tasks whenever the logged-in user changes (login, logout, page load)
watch(
  user,
  (u) => {
    if (u) fetchTasks();
  },
  { immediate: true },
);
</script>

<style scoped>
.page {
  width: 100vw;
  min-height: 100vh;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #ffffff;
}

.todo-list {
  height: 700px;
  width: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-radius: 15px;
  padding: 35px;
  background-color: #f0f0f0;
  margin: 0 auto;
  border: 2px solid rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 -3px 2px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
}
</style>
