<template>
  <div v-show="selectedListType === 'tasks'" class="new-task">
    <input
      class="new-task-input container"
      v-model="newTaskName"
      placeholder="Add New Task"
    />
    <button class="new-task-button" @click="add()" title="Add">
      <Icon name="bi:plus" id="add-icon" />
    </button>
  </div>
</template>

<script setup>
const { addTask } = useTaskStore()
const { selectedListType, activeTasks } = storeToRefs(useTaskStore())

const newTaskName = ref('')

function enterPressed(e) {
  if (e.key === 'Enter') add()
}

function add() {
  if (!newTaskName.value) return
  addTask(newTaskName.value.trim())
  newTaskName.value = ''
}

onMounted(() => window.addEventListener('keydown', enterPressed))
onUnmounted(() => window.removeEventListener('keydown', enterPressed))
</script>

<style scoped lang="scss">
@use '@/assets/css/variables' as *;

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
  border: $border-std;
  font-size: 0.8rem;
  font-family: inherit;
  padding: 0 14px;
  box-shadow: $shadow-inset;
  border &:focus {
    outline: none;
  }

  &:focus {
    border: $border-dark;
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
  border: $border-dark;
  background: none;
  height: 26px;
  width: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: $radius-lg;
  overflow: hidden;
  position: absolute;
  right: 12px;
  top: 8px;

  &:hover {
    transform: scale(1.05);
  }
}

#add-icon {
  width: 100%;
  height: 100%;
  color: $text-mid;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
