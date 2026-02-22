<template>
  <div class="task-list container">
    <transition-group
      v-if="selectedListType === 'tasks'"
      tag="ul"
      name="fade"
      class="item-list"
    >
      <li
        v-for="task in activeTasks"
        :key="task.id"
        class="list-item-box container"
      >
        <div class="list-item">
          <input
            type="checkbox"
            :class="['checkbox', { checked: task.completed }]"
            @change="updateTask(task.id, { completed: !task.completed })"
          />

          <input
            v-if="editingId === task.id"
            v-model="editedName"
            @keyup.enter="submitEdit(task)"
            @blur="submitEdit(task)"
            class="task-edit-input"
          />

          <p v-else @dblclick="startEditing(task)" class="task-name">
            {{ task.name }}
          </p>
        </div>

        <div class="list-item-buttons">
          <button
            class="list-item-button edit-button"
            @click="
              editingId === task.id ? submitEdit(task) : startEditing(task)
            "
            title="Edit"
          >
            <Icon
              v-if="editingId === task.id"
              name="ph:check-fat-fill"
              class="button-icon"
              id="tick-icon"
            />
            <Icon
              v-else
              name="clarity:edit-solid"
              class="button-icon"
              id="edit-icon"
            />
          </button>

          <button
            class="list-item-button delete-button"
            @click="deleteTask(task.id)"
            title="Delete"
          >
            <Icon name="mdi:bin" class="button-icon" />
          </button>
        </div>
      </li>
    </transition-group>

    <transition-group
      v-if="selectedListType === 'completed'"
      tag="ul"
      name="fade"
      class="item-list"
    >
      <li
        v-for="task in completedTasks"
        :key="task.id"
        class="list-item-box container"
      >
        <div class="list-item completed-list-item">
          <p>{{ task.name }}</p>
        </div>
        <div class="list-item-buttons">
          <button
            class="list-item-button undo-button"
            @click="updateTask(task.id, { completed: false })"
            title="Undo"
          >
            <Icon name="fa:undo" class="button-icon" />
          </button>
          <button
            class="list-item-button delete-button"
            @click="deleteTask(task.id)"
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
const { activeTasks, completedTasks, selectedListType } =
  storeToRefs(useTaskStore());
const { updateTask, deleteTask } = useTaskStore();

const editingId = ref(null);
const editedName = ref("");

function startEditing(task) {
  editingId.value = task.id;
  editedName.value = task.name;
}

function cancelEditing() {
  editingId.value = null;
  editedName.value = "";
}

function submitEdit(task) {
  const trimmed = editedName.value.trim();
  if (trimmed && trimmed !== task.name) {
    updateTask(task.id, { name: trimmed });
  }
  cancelEditing();
}
</script>

<style lang="scss" scoped>
/*---Task List---*/
.task-list-container {
  background-color: #ffffff;
}

.task-list {
  width: 100%;
  height: 100%;
  padding: 25px;
  background-color: #ffffff;
  box-shadow: inset 0 -3px 2px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(0, 0, 0, 0.2);
}

.item-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 6px;
  width: 100%;
  height: 100%;
  list-style: none;
  border-radius: 10px;
  border: 2px s;
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
  gap: 16px;
  width: fit-content;
  font-size: 0.9rem;
}

.completed-list-item {
  color: var(--text-secondary);
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
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.checkbox:checked {
  accent-color: var(--maingrey);
  pointer-events: none;
}

/*---List Buttons---*/
.list-item-buttons {
  display: flex;
  align-items: center;
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

  &:hover {
    transform: scale(1.1);
  }
}

.edit-button {
  height: 26px;
  width: 26px;
}

.button-icon {
  height: 100%;
  width: 100%;
}

#undo-icon {
  padding: 2px;
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
