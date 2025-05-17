<template>
  <div v-if="listStore.selectedListType === 'tasks'" class="task-list container"> 
    <ul class="item-list">
      <li v-for="(task, index) in taskStore.tasks" :key="index" class="list-item-box">

        <div class="list-item">
          <input type="checkbox" v-model="isChecked" :class="`checkbox-${ task.index }`" :checked="false" />
          {{ task.name }}
        </div>

        <div class="list-item-buttons">
          <button class="list-item-button edit-button">edit</button>
          <button class="list-item-button delete-button">delete</button>
        </div>

      </li>
    </ul>
  </div>

  <div v-else-if="listStore.selectedListType === 'completed'" class="task-list container">
    <div v-for="(task, index) in completedListItems" :key="index" class="list-item-box">
      <div class="list-item">
          <input type="checkbox" v-model="isChecked" :class="`checkbox-${ task.index }`" :checked="false" />
          {{ task.name }}
        </div>
    </div>
  </div>
</template>

<script setup>

import { useListTypeStore } from '@/stores/listTypeStore';
import { useTaskStore } from '@/stores/taskStore';

const taskStore = useTaskStore();
const listStore = useListTypeStore();

const selectedList = listStore.selectedListType;

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
</style>