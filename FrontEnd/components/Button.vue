<template>
  <button> {{ label }}
    <div class="arrow-wrapper">
      <div class="arrow"></div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: String,
})
</script>

<style scoped>
/* From Uiverse.io by satyamchaudharydev */ 
button {
  --arrow-width: 10px;
  --arrow-stroke: 2px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  color: var(--offwhite);
  padding: 1em 1.8em;
  background: var(--maingrey);
  display: flex;
  transition: 0.2s background;
  align-items: center;
  gap: 0.6em;
  font-weight: 700;
}

button .arrow-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

button .arrow {
  margin-top: 1px;
  width: var(--arrow-width);
  background: var(--maingrey);
  height: var(--arrow-stroke);
  position: relative;
  transition: 0.2s;
}

button .arrow::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  border: solid var(--offwhite);
  border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
  display: inline-block;
  top: -3px;
  right: 3px;
  transition: 0.2s;
  padding: 3px;
  transform: rotate(-45deg);
}

button:hover {
  background-color: black;
}

button:hover .arrow {
  background: var(--offwhite);
}

button:hover .arrow:before {
  right: 0;
}
</style>