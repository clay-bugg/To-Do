<template>
  <div v-if="selectedList === tasks" class="task-list container"> 
    
    <ul class="item-list">
      <li v-for="(task, index) in taskStore.tasks" :key="index" class="list-item">

        <input type="checkbox" v-model="isChecked" :checked="false" />
        {{ task.name }}
        <div class="list-item-buttons">

          <button class="list-item-button edit-button">edit</button>
          <button class="list-item-button delete-button">delete</button>

        </div>
      </li>
    </ul>
  </div>

  <div v-else-if="selectedList === 'completed'" class="task-list container">
    <div v-for="(listItem, index) in completedLisdtItems" :key="index">
      <div class="completed list-item">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()



const props = defineProps({
  listType: {
    type: String,
    required: true
  }
})

const selectedList = ref(props.listType);

const listItems = ref([]);
</script>

<style scoped>
.task-list {
  width: 100%;
  padding: 20px;
  height: 100%;
}
.item-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
}
.list-item,
.list-item-buttons {
  display: flex;
  justify-content: space-between;
  width: fit-content;
  gap: 2px;
}
</style>