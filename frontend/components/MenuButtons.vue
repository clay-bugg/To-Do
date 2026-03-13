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
const { selectedListType } = storeToRefs(useTaskStore())
</script>

<style scoped lang="scss">
@use '@/assets/css/variables' as *;

.menu-buttons {
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: $radius-md;
  padding: 5px;
  gap: 10px;

  button {
    flex: 1;
    height: 34px;
    background-color: $white;
    border: $border-std;
    border-radius: 7px;
    font-size: 0.75rem;
    font-family: inherit;
    font-weight: 400;
    color: $text-mid;
    cursor: pointer;
    box-shadow: $shadow-inset;
    transition:
      background-color 0.15s ease,
      font-weight 0.1s ease;

    &.active {
      font-weight: 600;
      color: $text-dark;
      box-shadow: $shadow-inset-light;
      border: $border-dark;
    }

    &:hover:not(.active) {
      box-shadow: $shadow-inset-light;
    }
  }
}
</style>
