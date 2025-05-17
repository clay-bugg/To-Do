<template>
  <header>
    <div class="title container">
      <h1>To-Do List</h1>
    </div>
    <div class ="menu-buttons">
      <button :class="['menu-button', { active: store.selectedListType === 'tasks' }]" @click="store.select('tasks')">Tasks</button>
      <button :class="['menu-button', { active: store.selectedListType === 'completed' }]" @click="store.select('completed')">Completed</button>
    </div>
</header>
</template>

<script setup>
import { useListTypeStore } from '@/stores/listTypeStore';

const store = useListTypeStore(); 

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
  background-color: var(--mainwhite);
  border: 0.5px solid black;
  border-radius: 5px;
}
.menu-button.active {
  font-weight: bold;
}
</style>