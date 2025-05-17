<template>
  <div class="new-task container">
    <input class="new-task-input" v-model="newTask" placeholder="Add New Task"/>
    <button class="new-task-button" @click="add">+</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore();

const newTask = ref('');

function enterPressed(e) { 
  if (e.key === 'Enter') { 
    add()
  }
}

function add() {
  if (!newTask.value) return;
    taskStore.addTask(newTask.value);
    newTask.value = '';
    console.log(taskStore.tasks);
  }

onMounted(() => { 
  window.addEventListener('keydown', enterPressed);
})

onUnmounted(() => { 
  window.removeEventListener('keydown', enterPressed);
})
  
</script>

<style scoped>
.new-task {
  display: flex;
  align-items: center;
  height: 30px;
  position: relative;
  cursor: text;
  height: 52px;
}
.new-task-input {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0 15px;
  cursor: text;
  border-radius: 10px;
  font-size: 0.9rem;
  font-family: inherit;
}
.new-task-input:focus {
  outline: none;
} 
.new-task-input::placeholder {
  color: var(--placeholdergrey);
  font-weight: 150;
} 
.new-task-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 27px;
  width: 27px;
  background-color: var(--maingrey);
  color: var(--offwhite);
  position: absolute;
  right: 8px;
  border-radius: 5px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>