<template>
  <div v-show="selectedListType === 'tasks'" class="new-task">
    <input
      class="new-task-input container"
      v-model="newTaskName"
      placeholder="Add New Task"
    />
    <button class="new-task-button" @click="add()" title="Add">
      <Icon name="iconoir:plus-square-solid" id="add-icon" />
    </button>
  </div>
</template>

<script setup>
const { addTask } = useTaskStore();
const { selectedListType } = storeToRefs(useTaskStore());

const newTaskName = ref("");

function enterPressed(e) {
  if (e.key === "Enter") add();
}

function add() {
  if (!newTaskName.value) return;
  addTask(newTaskName.value.trim());
  newTaskName.value = "";
}

onMounted(() => window.addEventListener("keydown", enterPressed));
onUnmounted(() => window.removeEventListener("keydown", enterPressed));
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
  cursor: text;
  font-size: 0.8rem;
  font-family: inherit;
  padding: 0 10px;
  box-shadow: inset 0 -3px 2px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(0, 0, 0, 0.2);
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
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50px;
  overflow: hidden;
  position: absolute;
  right: 5px;
  top: 4px;
}

.new-task-button:hover {
  transform: scale(1.05);
}

#add-icon {
  width: 100px;
  height: 100px;
}
</style>
