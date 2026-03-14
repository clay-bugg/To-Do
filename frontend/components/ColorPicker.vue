<template>
  <div class="color-picker">
    <button
      @click="menuOpen = !menuOpen"
      class="color-schemes-button"
    >
      <Icon name="ic:baseline-color-lens" id="theme-icon" />
    </button>
    <Transition name="slide-out">
      <div v-if="menuOpen" class="color-schemes-menu">
        <button id="red"></button>
        <button id="blue"></button>
        <button id="green"></button>
        <button id="pink"></button>
        <button id="dark"></button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const menuOpen = ref(false)
</script>

<style scoped lang="scss">
@use '@/assets/css/variables' as *;

.color-picker {
  position: absolute;
  top: -5px;
  right: -5px;
}

.color-schemes-button {
  width: 2.2em;
  height: 2.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  font-size: 1.2rem;
  font-weight: 400;
  color: $text-dark;
  cursor: pointer;
  z-index: 3;
  position: relative;
  transition:
    background-color var(--transition-fast),
    font-weight var(--transition-mid);
  padding: 0.5em;
}

.color-schemes-menu {
  position: absolute;
  top: 16px;
  right: -38px;
  width: fit-content;
  background-color: $off-white;
  border: $border-std;
  border-radius: $radius-sm;
  box-shadow: $shadow-drop;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3em;
  padding: 6px;
  z-index: 1;

  button {
    width: 20px;
    height: 20px;
    border: $border-std;
    border-radius: $radius-sm;
    cursor: pointer;
  }

  #red {
    background-color: red;
    box-shadow: inset 0 -3px 1px rgb(172, 0, 0);

    &:hover {
      filter: brightness(0.8);
    }
  }
  #blue {
    background-color: blue;
    box-shadow: inset 0 -3px 1px rgb(0, 0, 178);

    &:hover {
      filter: brightness(0.8);
    }
  }
  #green {
    background-color: green;
    box-shadow: inset 0 -3px 1px rgb(0, 132, 0);

    &:hover {
      filter: brightness(0.8);
    }
  }
  #pink {
    background-color: pink;
    box-shadow: inset 0 -3px 1px rgb(204, 115, 130);

    &:hover {
      filter: brightness(0.8);
    }
  }
  #dark {
    background-color: #2a2a2a;
    box-shadow: inset 0 -3px 1px #4d4d4d;

    &:hover {
      filter: brightness(1.2);
    }
  }
}

/* Slide out from behind the list edge */
.slide-out-enter-active,
.slide-out-leave-active {
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
}

.slide-out-enter-from {
  transform: translateX(-50px);
  opacity: 0.8;
}

.slide-out-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-out-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.slide-out-leave-to {
  transform: translateX(-50px);
  opacity: 0.8;
}
</style>
