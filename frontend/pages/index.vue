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

watch(
  user,
  (u) => {
    if (u) fetchTasks();
  },
  { immediate: true },
);
</script>

<style scoped lang="scss">
@use "@/assets/css/variables" as *;

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
  width: 100%;
  background-color: $white;
}

.todo-list {
  height: 700px;
  width: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-radius: $radius-lg;
  padding: 35px;
  background-color: $off-white;
  margin: 0 auto;
  border: $border-std;
  box-shadow: $shadow-inset;
  margin-bottom: 20px;
}
</style>
