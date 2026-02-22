<template>
  <div class="menu-buttons">
    <button
      :class="{ active: selectedListType === 'tasks' }"
      @click="selectedListType = 'tasks'"
      title="Tasks"
    >
      Tasks
    </button>
    <button
      :class="{ active: selectedListType === 'completed' }"
      @click="selectedListType = 'completed'"
      title="Completed"
    >
      Completed
    </button>
  </div>
</template>

<script setup>
const { selectedListType } = storeToRefs(useTaskStore());
</script>

<style scoped lang="scss">
.menu-buttons {
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  padding: 5px;
  gap: 10px;

  button {
    flex: 1;
    height: 34px;
    background-color: #ffffff;
    border: none;
    border-radius: 7px;
    font-size: 0.75rem;
    font-family: inherit;
    font-weight: 400;
    color: #555;
    cursor: pointer;
    box-shadow: inset 0 -3px 2px rgba(0, 0, 0, 0.3);
    transition:
      background-color 0.15s ease,
      font-weight 0.1s ease;

    &.active {
      font-weight: 600;
      color: #222;
      box-shadow: inset 0 -4px 2px rgba(0, 0, 0, 0.2);
    }

    &:hover:not(.active) {
      box-shadow: inset 0 -4px 2px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
