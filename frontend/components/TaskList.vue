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
@use "@/assets/css/variables" as *;

/*---Task List---*/
.task-list {
  width: 100%;
  height: 100%;
  padding: 25px;
  background-color: $white;
  box-shadow: $shadow-inset;
  border: $border-std;
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
  border-radius: $radius-md;
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
  box-shadow: $shadow-inset;
  border: $border-std;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 16px;
  width: fit-content;
  font-size: 0.8rem;
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
  border: $border-thin;
  border-radius: $radius-sm;
  font-weight: 300;
  font-size: 20px;
}

/*---Checkbox---*/
.checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;

  &:checked {
    pointer-events: none;
  }
}

/*---List Buttons---*/
.list-item-buttons {
  display: flex;
  align-items: center;
  gap: 4px;
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
  padding: 4px;

  &:hover {
    transform: scale(1.1);
  }
}

.delete-button {
  padding: 2px;
}

.button-icon {
  height: 100%;
  width: 100%;
  color: $text-dark;
}

#undo-icon {
  padding: 2px;
}

/*---Animations---*/
.fade-leave-active {
  transition: all 0.2s ease-in;
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
