<template>
    <div class="completed-list">
      <transition-group
      tag="ul"
      v-if="selectedListType === 'completed'"
      name="fade"
      class="item-list"
    >
      <li v-for="task in completedTasks" :key="task.id" class="list-item-box container">
        <div class="list-item completed-list-item">
          <p v-if="task">{{ task.name }}</p>
        </div>
        <div class="list-item-buttons">
          <button
            class="list-item-button undo-button"
            @click="updateTask(task.id, { completed: !task.completed })"
            id="undo-icon"
            title="Undo"
          >
            <Icon name="fa:undo" class="button-icon" />
          </button>
          <button
            class="list-item-button delete-button"
            @click="deleteTask(task.id)"
            id="bin-icon"
            title="Delete"
          >
            <Icon name="mdi:bin" class="button-icon" />
          </button>
        </div>
      </li>
    </transition-group>

    </div>
</template>

<script setup>
//---Imports---//
import { nanoid } from 'nanoid';

//---Stores---//
const { completedTasks, selectedListType } = storeToRefs(useTaskStore())
const { updateTask, deleteTask } = useTaskStore()

//---Variables---//
const editingId = ref(null)
const editedName = ref("")
const id = nanoid()

//---Functions---//
function startEditing(task) {
  editingId.value = task.id
  editedName.value = task.name
}

//---Cancel Editing---//
function cancelEditing() {
  editingId.value = null
  editedName.value = task.name
}

//---Submit Edit---//
function submitEdit(task) {
  const trimmed = editedName.value.trim()
  if (trimmed && trimmed !== task.name) {
    updateTask(task.id, { name: trimmed })
  }
  cancelEditing()
}

</script>

<style lang="scss" scoped>
    
/*---Task List---*/
.task-list {
  width: 100%;
  height: 100%;
  padding: 25px;
}
.item-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 6px;
  width: 100%;
  height: 100%;
}

/*---List Item---*/
.list-item-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;
  width: 100%;
  height: 50px;
  padding: 0 15px;
}
.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: fit-content;
  font-size: 0.9rem;
}
.completed-list-item {
  color: var(--placeholdergrey);
  text-decoration: line-through;
}
.task-edit-input {
  position: relative;
  right: 6px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 100%;
  padding: 0 5px;
  border: 0.5px solid black;
  border-radius: 5px;
  font-weight: 300;
  font-size: 20px;
}

/*---Checkbox---*/
.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background-color: var(--mainwhite);
  cursor: pointer;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: var(--mainwhite);
  border-radius: 50px;
}

/*---List Buttons---*/
.list-item-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: fit-content;
  height: 100%;
}
.list-item-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 28px;
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
.task-name {
  display: flex;
  align-items: center;
  height: 100%;
  cursor: text;
  
}
</style>