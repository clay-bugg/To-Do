<template>
  <div class="task-list container"> 
    <ul v-if="listStore.selectedListType === 'tasks'" class="item-list">
      <li v-for="(task, index) in taskStore.tasks" :key="task.id" class="list-item-box container" >
        <div class="list-item">
          <button class="checkbox" @click="completeTask(task.id)"></button>
          {{ task.name }}
        </div>

        <div class="list-item-buttons">
          <button class="list-item-button edit-button" @click="editTask(task.id)"><Icon name="clarity:edit-solid" class="button-icon" /></button>
          <button class="list-item-button delete-button" @click="deleteTask(task.id)"><Icon name="mdi:bin" class="button-icon" /></button>
        </div>
      </li>
    </ul>

    <ul v-else-if="listStore.selectedListType === 'completed'" class="item-list">
      <li v-for="(task, index) in taskStore.completedTasks" :key="task.id" class="list-item-box container" >
        <div class="list-item">
          <button class="checkbox"></button>
          {{ task.name }}
        </div>

        <div class="list-item-buttons">
          <button class="list-item-button delete-button" @click="deleteTask(task.id)"><Icon name="mdi:bin" class="button-icon" /></button>
        </div>
      </li>
    </ul>

  </div>
</template>

<script setup>
import { useListTypeStore } from '@/stores/listTypeStore';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();
const listStore = useListTypeStore();
const { completeTask } = taskStore;
const { deleteTask } = taskStore;
</script>

<style scoped>
.task-list {
  width: 100%;
  padding: 25px;
  height: 100%;
}
.item-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  gap: 20px;
}
.list-item-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 2px;
  height: 50px;
  padding: 10px;
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  gap: 10px;
  font-size: 0.8rem;
}
.list-item-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  gap: 8px;
  height: 100%;
}
.checkbox {
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-color: var(--mainwhite);
}
.list-item-button {
  height: 26px;
  width: 26px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.list-item-button:hover {
  transform: scale(1.1)
}
.button-icon {
  height: 100%;
  width: 100%;
}



</style>