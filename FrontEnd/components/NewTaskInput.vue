<template>
  <div v-show="listStore.selectedListType === 'tasks'" class="new-task">
    <input class="new-task-input container" v-model="newTask" placeholder="Add New Task" />
    <button class="new-task-button" @click="add()" title="Add">
      <Icon name="iconoir:plus-square-solid" id="add-icon" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import { useListTypeStore } from '@/stores/listTypeStore';

const taskStore = useTaskStore();
const listStore = useListTypeStore();
const newTask = ref('');

function enterPressed(e) {
  if (e.key === 'Enter') {
    add()
  }
}
function add() {
  if (!newTask.value) return;
  taskStore.addTask(newTask.value);
  newTask.value = '';
}
onMounted(() => {
  window.addEventListener('keydown', enterPressed);
})
onUnmounted(() => {
  window.removeEventListener('keydown', enterPressed);
})
</script>

<style scoped>
.new-task {
  display: flex;
  align-items: center;
  position: relative;
  cursor: text;
  height: 55px;
  width: 100%;
}

.new-task-input {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
  padding: 0px;
  cursor: text;
  font-size: 0.9rem;
  font-family: inherit;
  padding: 0 10px;
}

.new-task-input:focus {
  outline: none;
}

.new-task-input:focus::placeholder {
  color: white;
}

.new-task-input::placeholder {
  color: var(--placeholdergrey);
  font-weight: 150;
}

.new-task-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border: none;
  background: none;
  height: 26px;
  width: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50px;
  overflow: hidden;
  position: absolute;
  top: 2px;
  right: 5px;
  top: 6px;
  height: 30px;
  width: 30px;
}

.new-task-button:hover {
  transform: scale(1.05);
}

#add-icon {
  width: 100px;
  height: 100px;
}
  </style>