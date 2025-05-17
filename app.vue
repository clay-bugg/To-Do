<template>
  <div class="app">
    <div class="todo-list container">
      <Header :list-change="changeListType" />
      <NewTaskInput "/>
      <TaskList :list="selectedList" :taskList="taskList" />
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

function updateTaskList(val) { 
  taskList.push({ name: val })
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
    background-color: var(--offwhite);
  }
</style>