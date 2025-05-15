<template>
  <div class="app">
    <div class="todo-list container">
      <Header :list-change="changeListType" />
      <NewTask />
      <TaskList :list="selectedList" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedList = ref('tasks');

function changeListType(val) { 
  selectedList.value = val;
}
</script>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.todo-list {
    height: 500px;
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    border-radius: 30px;
    padding: 20px;
  }
</style>