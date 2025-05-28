<template>
  <div class="page">
    <div class="app">
      <Header />
      <div class="todo-list container">
        <MenuButtons :list-change="changeListType" />
        <NewTaskInput />
        <TaskList :list="selectedList" :taskList="taskList" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const selectedList = ref('tasks');

const taskList = [];

function changeListType(val) { 
  selectedList.value = val;
}
</script>

<style scoped>
.page {
 width: 100vw;
 height: 100vh;
 margin: 0 auto;
}
.app{
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: flex-end;
  justify-content: center;
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
  background-color: var(--offwhite);
  margin: 0 auto;
}
</style>