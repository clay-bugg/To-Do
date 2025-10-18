<template>
    <div class ="menu-buttons">
      <button :class="{ active: selectedListType === 'tasks' }" @click="select('tasks')" title="Tasks">Tasks</button>
      <button :class="{ active: selectedListType === 'completed' }" @click="select('completed')" title="Completed">Completed</button>
    </div>

</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useListTypeStore } from '@/stores/listTypeStore'

const listType = useListTypeStore()
const { selectedListType } = storeToRefs(listType)
const { select } = listType
</script>

<style scoped lang="scss">
.menu-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  button {
    height: 35px;
    width: 100%;
    background-color: var(--mainwhite);
    border: 0.5px solid black;
    border-radius: 5px;
    font-size: 0.9rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 -3px 2px  rgba(0,0,0,0.2);
    font-family: inherit;
    font-weight: 300;
    &.active {
    font-weight: 500;
  }
}
}
</style>