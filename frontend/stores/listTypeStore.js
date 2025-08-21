import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useListTypeStore = defineStore('listType', () => {
  const tasks = ref('tasks')
  const completed = ref('completed')
  const selectedListType = ref('tasks')

  const active = computed(() => {
    return selectedListType.value === 'tasks' ? tasks.value : completed.value
  })

  function select(listType) {
    selectedListType.value = listType
  }

  return {
    tasks,
    completed,
    selectedListType,
    active,
    select,
  }
})
