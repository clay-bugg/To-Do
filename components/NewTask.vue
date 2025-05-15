<template>
  <div class="new-task container">
    <input class="new-task-input" v-model="newTask" placeholder="Add New Task"/>
    <button class="new-task-button" @click="updateTask">+</button>
  </div>
</template>

<script setup>import { ref, defineEmits } from 'vue';


</script>

<style scoped>
.new-task {
  display: flex;
  align-items: center;
  height: 30px;
}
.new-task-input {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
}
.new-task-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 25px;
  width: 25px;
  background-color: rgb(55, 55, 55);
  color: rgb(237, 237, 237);
}

</style>