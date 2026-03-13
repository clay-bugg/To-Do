<template>
  <button>
    {{ label }}
    <div class="arrow-wrapper">
      <div class="arrow"></div>
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  label: String
})
</script>

<style scoped lang="scss">
@use '@/assets/css/variables' as *;

button {
  --arrow-width: 10px;
  --arrow-stroke: 2px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  color: $offwhite;
  padding: 1em 1.8em;
  background: $maingrey;
  display: flex;
  transition: all all $transition-mid;
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
  width: $arrow-width;
  background: $maingrey;
  height: $arrow-stroke;
  position: relative;
  transition: all $transition-mid;
}

button .arrow::before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  border: solid $offwhite;
  border-width: 0 $arrow-stroke $arrow-stroke 0;
  display: inline-block;
  top: -3px;
  right: 3px;
  transition: all $transition-mid;
  padding: 3px;
  transform: rotate(-45deg);
}

button:hover {
  background-color: black;
}

button:hover .arrow {
  background: $offwhite;
}

button:hover .arrow:before {
  right: 0;
}
</style>
