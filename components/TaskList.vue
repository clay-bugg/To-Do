<template>
  <div v-if="selectedList === tasks" class="task-list container">
    <div v-for="(listItem, index) in listItems" :key="index">
      <div class="item-list">
        <div class="list-item">
          <input type="checkbox" :class="`checkbox ${index}`"/>
          <p>{{ listItem }}</p>
        </div>
        <div class="list-item-buttons">
          <button class="list-item-button edit-button">edit</button>
          <button class="list-item-button delete-button">delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const listItems = 4;
</script>

<style scoped>
.task-list-container {
  width: 100%;
  padding: 20px;
}
.item-list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-item,
.list-item-buttons {
  display: flex;
  justify-content: space-between;
  width: fit-content;
  gap: 2px;
}
</style>