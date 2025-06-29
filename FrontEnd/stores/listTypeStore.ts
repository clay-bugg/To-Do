import { defineStore } from 'pinia';

type ListType = 'tasks' | 'completed';

export const useListTypeStore = defineStore('listType', {
  state: () => ({ 
    tasks: 'tasks',
    completed: 'completed',
    selectedListType: 'tasks' as ListType,
  }),
  getters: {
    active(state) { 
      return state[state.selectedListType as ListType];
    }
  },
  actions: {
    select(listType: ListType) {
      this.selectedListType = listType;
    }
  }
})

