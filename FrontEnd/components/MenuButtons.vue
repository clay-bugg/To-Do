<template>
    <div class ="menu-buttons">
      <button class="menu-button" :class="{ active: store.selectedListType === 'tasks' }" @click="store.select('tasks')" title="Tasks">Tasks</button>
      <button class="menu-button" :class="{ active: store.selectedListType === 'completed' }" @click="store.select('completed')" title="Completed">Completed</button>
    </div>

</template>

<script setup lang="ts">
import { useListTypeStore } from '@/stores/listTypeStore';
const store = useListTypeStore();
</script>

<style scoped>
.menu-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
}
.menu-button {
  height: 35px;
  width: 100%;
  background-color: var(--mainwhite);
  border: 0.5px solid black;
  border-radius: 5px;
  font-size: 0.9rem;
  border: 1px solid rgba(0,0,0,0.2);
  box-shadow: inset 0 -2px 2px rgba(0,0,0,0.3);
  font-family: inherit;
  font-weight: 300;
}
.menu-button.active {
  font-weight: 500;
}
</style>