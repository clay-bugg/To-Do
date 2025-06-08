<template>
  <div class="task-list container">

    <transition-group tag="ul" v-if="listStore.selectedListType === 'tasks'" name="fade" class="item-list">
      <li v-for="(task, index) in taskStore.tasks" :key="task.id" class="list-item-box container">

        <div class="list-item">
          <input type="checkbox" :class="['checkbox', { 'checked': task.checked }]" @change="completeTask(task.id)" :checked="task.checked"/>
          <input v-if="task.editing === true" v-model="task.name" @keyup.enter="editTask(task.id)" class="task-edit-input" v-focus />
          <p v-else-if="task.editing === false" @dblclick="editTask(task.id)" class="task-name">
            {{ task.name }}
          </p>
        </div>

        <div class="list-item-buttons">
          <button class="list-item-button edit-button" @click="editTask(task.id)" title="Edit">
            <Icon v-if="task.editing === true" name="charm:tick" class="button-icon" id="tick-icon" />
            <Icon v-else name="clarity:edit-solid" class="button-icon" id="edit-icon" />
          </button>

          <button class="list-item-button delete-button" @click="deleteTask(task.id)" id="bin-icon" title="Delete">
            <Icon name="mdi:bin" class="button-icon" />
          </button>

        </div>
      </li>
    </transition-group>

    <transition-group tag="ul" v-if="listStore.selectedListType === 'completed'" name="fade" class="item-list">
      <li v-for="(task, index) in taskStore.completedTasks" :key="task.id" class="list-item-box container">

        <div class="list-item completed-list-item">
    
          <p>{{ task.name }}</p>
        </div>
        <div class="list-item-buttons">
          <button class="list-item-button undo-button" @click="undoTask(task.id)" id="undo-icon" title="Undo">
            <Icon name="fa:undo" class="button-icon" />
          </button>
          <button class="list-item-button delete-button" @click="deleteCompletedTask(task.id)" id="bin-icon" title="Delete">
            <Icon name="mdi:bin" class="button-icon" />
          </button>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
/*---Imports---*/
import { useListTypeStore } from "@/stores/listTypeStore";
import { useTaskStore } from "@/stores/taskStore";

/*---API---*/
const { data } = await useFetch("http://localhost:3001/api/hello");
console.log(data.value);

/*---Stores---*/
const taskStore = useTaskStore();
const listStore = useListTypeStore();

/*---Store Functions ---*/
const { completeTask } = taskStore;
const { deleteTask } = taskStore;
const { deleteCompletedTask } = taskStore;
const { undoTask } = taskStore;
const { editTask } = taskStore;
</script>

<style scoped>
/*---Task List---*/
.task-list {
  width: 100%;
  padding: 25px;
  height: 100%;
}
.item-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
/*---List Item---*/
.list-item-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 2px;
  height: 50px;
  padding: 0 15px;
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  gap: 15px;
  font-size: 0.9rem;
}
.completed-list-item {
  text-decoration: line-through;
  color: var(--placeholdergrey)
}
.task-edit-input {
  height: 100%;
  font-size: 1rem;
  font-weight: 100;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border: 0.5px solid black;
  border-radius: 5px;
  font-weight: 200;
  padding: 2px 5px;
}
/*---Checkbox---*/
.checkbox {
  width: 15px;
  height: 15px;
  background-color: var(--mainwhite);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: var(--offwhite);
  border-radius: 50px;
  padding: 0.2em;

}
.checkbox:checked {
  accent-color: var(--maingrey);
  pointer-events: none;
}
.checkbox-icon {
  display: none;
  appearance: none;
  opacity: 0;
}
.checkbox-checked {
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-color: var(--mainwhite);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(51, 97, 188);
}
/*---List Buttons---*/
.list-item-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  gap: 8px;
  height: 100%;
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
  transform: scale(1.1);
}
#undo-icon {
  padding: 2px;
}
#edit-icon {
  width: 100%;
  height: 100%;
}
.edit-button {
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
.button-icon {
  height: 100%;
  width: 100%;
}
/*---Animations---*/
.fade-leave-active {
  transition: all 1s ease-in;
}
.fade-leave-to {
  opacity: 0;
}
</style>
