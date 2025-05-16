<template>
  <div class="new-task container">
    <input class="new-task-input" v-model="newTask" placeholder="Add New Task"/>
    <button class="new-task-button" @click="add">+</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore();

const newTask = ref('');

function add() {
  if (!newTask.value) return;
  taskStore.addTask(newTask.value);
  newTask.value = '';
  console.log(taskStore.tasks)
}
  
</script>

<style scoped>
.new-task {
  display: flex;
  align-items: center;
  height: 30px;
  position: relative;
  cursor: text;
  
}
.new-task-input {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0 5px;
  cursor: text;
  border-radius: 5px;
}
.new-task-input:focus {
  outline: none;
} 
.new-task-input::placeholder {
  font-style: italic;
} 
.new-task-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  background-color: var(--maingrey);
  color: var(--offwhite);
  position: absolute;
  right: 5px;
  border-radius: 5px;
}

</style>