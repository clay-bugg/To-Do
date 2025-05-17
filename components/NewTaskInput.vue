<template>
  <div class="new-task">
    <input class="new-task-input container" v-model="newTask" placeholder="Add New Task"/>
    <button class="new-task-button" @click="add"><Icon name="iconoir:plus-square-solid" class="new-task-icon" /></button>
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
  position: relative;
  cursor: text;
  height: 55px;
  width: 100%;
}
.new-task-input {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  cursor: text;
  font-size: 0.9rem;
  font-family: inherit;
}
.new-task-input:focus {
  outline: none;
} 
.new-task-input:focus::placeholder {
  color: white;
}
.new-task-input::placeholder {
  color: var(--placeholdergrey);
  font-weight: 150;
} 
.new-task-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border: none;
  background: none;
  height: 30px;
  width: 30px;
  position: absolute;
  right: 6px;
  top: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.new-task-button:hover {
  transform: scale(1.05);
}
.new-task-button:active {
  transform: scale(1);
}
.new-task-icon {
  width: 100%;
  height: 100%;
}

</style>