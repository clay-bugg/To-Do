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

<style scoped lang="scss">
@use "@/assets/css/variables" as *;

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
  box-shadow: $shadow-inset;
  border: $border-std;

  &:focus {
    outline: none;
  }

  &:focus::placeholder {
    color: $white;
  }

  &::placeholder {
    color: $text-light;
    font-weight: 150;
  }
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
  border-radius: $radius-pill;
  overflow: hidden;
  position: absolute;
  right: 5px;
  top: 4px;

  &:hover {
    transform: scale(1.05);
  }
}

#add-icon {
  width: 100px;
  height: 100px;
}
</style>
