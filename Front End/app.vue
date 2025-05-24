<template>
  <div class="page">
    <div class="app">
      <div class="login container">
        <Button class="login-button" id="login":label="'Login'" />
        <Button class="login-button" id="sign-up":label="'Sign Up'" />
      </div>
      <div class="todo-list container">
        <MenuButtons :list-change="changeListType" />
        <NewTaskInput />
        <TaskList :list="selectedList" :taskList="taskList" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const selectedList = ref('tasks');

const taskList = [];

function changeListType(val) { 
  selectedList.value = val;
}


</script>

<style scoped>
.page {
 width: 100vw;
 height: 100vh;
 margin: 0 auto;
 padding: 20px;
}
.app{
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  justify-content: center;
}
.login {
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  padding: 10px  30px;
  border-radius: 15px;
}
.login-button {
  background-color: black;
}
#login:hover {
  background-color: green;
  color: var(--offwhite);
}
#sign-up:hover {
  background-color: red;
  color: var(--offwhite);
}

.todo-list {
  height: 700px;
  width: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-radius: 15px;
  padding: 35px;
  background-color: var(--offwhite);
  margin: 0 auto;
}
</style>