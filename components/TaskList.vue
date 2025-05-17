<template>
  <div class="task-list container"> 
    <ul v-if="listStore.selectedListType === 'tasks'" class="item-list">
      <li v-for="(task, index) in taskStore.tasks" :key="task.id" class="list-item-box" >
        <div class="list-item">
          <button class="checkbox" @click="completeTask(task.id)"></button>
          {{ task.name }}
        </div>

        <div class="list-item-buttons">
          <button class="list-item-button edit-button">edit</button>
          <button class="list-item-button delete-button">delete</button>
        </div>
      </li>
    </ul>
    <ul v-else-if="listStore.selectedListType === 'completed'" class="item-list">
      <li v-for="(task, index) in taskStore.completedTasks" :key="task.id" class="list-item-box" >
        <div class="list-item">
          <button class="checkbox"></button>
          {{ task.name }}
        </div>

        <div class="list-item-buttons">
          <button class="list-item-button delete-button">delete</button>
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
</script>

<style scoped>
.task-list {
  width: 100%;
  padding: 30px 10px;
  height: 100%;
}
.item-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
}
.list-item-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 2px;
  height: 30px;
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}
.checkbox {
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-color: var(--mainwhite);
}
</style>