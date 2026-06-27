<template>
  <div class="task-list container">
    <div class="slide-viewport">
      <Transition :name="slideDirection">
        <div
          v-if="selectedListType === 'tasks'"
          key="tasks"
          class="slide-panel"
        >
          <transition-group tag="ul" name="fade" class="item-list">
            <li
              v-for="task in activeTasks"
              :key="task.id"
              class="list-item-box container"
              :class="{ dragging: draggedTaskId === task.id }"
              draggable="true"
              @dragstart="startDrag($event, task)"
              @dragover.prevent
              @drop="dropOnTask(task)"
              @dragend="endDrag"
            >
              <div class="list-item">
                <input
                  type="checkbox"
                  :class="['checkbox', { checked: task.completed }]"
                  @change="
                    updateTask(task.id, {
                      completed: !task.completed
                    })
                  "
                />

                <input
                  v-if="editingId === task.id"
                  v-model="editedName"
                  @keyup.enter="submitEdit(task)"
                  @blur="submitEdit(task)"
                  class="task-edit-input"
                />

                <p
                  v-else
                  @dblclick="startEditing(task)"
                  class="task-name"
                >
                  {{ task.name }}
                </p>
              </div>

              <div class="list-item-buttons">
                <button
                  class="list-item-button edit-button"
                  @click="
                    editingId === task.id
                      ? submitEdit(task)
                      : startEditing(task)
                  "
                  title="Edit"
                >
                  <Icon
                    v-if="editingId === task.id"
                    name="oi:check"
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
        </div>

        <div v-else key="completed" class="slide-panel">
          <transition-group tag="ul" name="fade" class="item-list">
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
      </Transition>
    </div>
  </div>
</template>

<script setup>
const taskStore = useTaskStore()

const {
  tasks,
  activeTasks,
  completedTasks,
  selectedListType
} = storeToRefs(taskStore)

const { updateTask, deleteTask } = taskStore

const draggedTaskId = ref(null)

function startDrag(event, task) {
  draggedTaskId.value = task.id
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', String(task.id))
}

function dropOnTask(targetTask) {
  if (!draggedTaskId.value || draggedTaskId.value === targetTask.id) return

  const draggedIndex = tasks.value.findIndex(
    task => task.id === draggedTaskId.value
  )

  if (draggedIndex === -1) return

  const [draggedTask] = tasks.value.splice(draggedIndex, 1)

  const targetIndex = tasks.value.findIndex(
    task => task.id === targetTask.id
  )

  if (targetIndex === -1) return

  tasks.value.splice(targetIndex, 0, draggedTask)

  draggedTaskId.value = null
}

function endDrag() {
  draggedTaskId.value = null
}

const editingId = ref(null)
const editedName = ref('')
const slideDirection = ref('slide-left')

const TAB_ORDER = ['tasks', 'completed']

watch(selectedListType, (newVal, oldVal) => {
  slideDirection.value =
    TAB_ORDER.indexOf(newVal) > TAB_ORDER.indexOf(oldVal)
      ? 'slide-left'
      : 'slide-right'
})

function startEditing(task) {
  editingId.value = task.id
  editedName.value = task.name
}

function cancelEditing() {
  editingId.value = null
  editedName.value = ''
}

function submitEdit(task) {
  const trimmed = editedName.value.trim()
  if (trimmed && trimmed !== task.name) {
    updateTask(task.id, { name: trimmed })
  }
  cancelEditing()
}
</script>

<style lang="scss" scoped>
@use '@/assets/css/variables' as *;

/*---Task List---*/
.task-list {
  width: 100%;
  height: 100%;
  padding: 25px;
  background-color: $white;
  box-shadow: $shadow-inset;
  border: $border-std;
  overflow: hidden;
  z-index: 4;
}

/*---Slide Viewport (clips the sliding panels)---*/
.slide-viewport {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 3;
}

.slide-panel {
  width: 100%;
  height: 100%;
}

/*---Item List---*/
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
  padding: 5.2px;
  border: $border-light;
  border-radius: $radius-sm;
  font-weight: 400;
  font-size: 19px;
  color: $text-mid;
  letter-spacing: 0.1px;
  cursor: text;
}

.task-name {
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
  font-weight: 400;
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
  height: 30px;
  width: 30px;
  padding: 4px;
  transition: transform var(--transition-fast);

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
  color: var(--text-dark);
}

#undo-icon {
  padding: 2px;
}

.dragging {
  opacity: 0.4;
}

/*---Individual item fade animations---*/
.fade-leave-active {
  transition: all 0.2s ease-in;
}

.fade-leave-to {
  opacity: 0;
}

/*---Tab slide animations---*/
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Tasks → Completed: new panel comes from right, old exits left */
.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

/* Completed → Tasks: new panel comes from left, old exits right */
.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
