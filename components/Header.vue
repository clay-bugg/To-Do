<template>
  <header>
    <div class="title container">
      <h1>To-Do List</h1>
    </div>
    <div class ="menu-buttons">
      <button :class="['menu-button', { active: selectedList === 'tasks' }]" @click="select('tasks')">Tasks</button>
      <button :class="['menu-button', { active: selectedList === 'completed' }]" @click="select('completed')">Completed</button>
    </div>
</header>
</template>

<script setup>
import { ref, defineEmits, watch } from 'vue';

const selectedList = ref('');

const emit = defineEmits(['list-change']);

function select(list) { 
  if (selectedList === list) return;
  selectedList.value = list;
  emit('list-change', list)
}

</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
.title {
  width: fit-content;
  padding: 5px 10px;
}
.menu-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  gap: 5px;
}
.menu-button {
  width: 75px;
  height: 25px;
}
.menu-button.active {
  font-weight: bold;
}
</style>