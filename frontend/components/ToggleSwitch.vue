<template>
  <div class="toggle-container">
    <button
      class="toggle-switch"
      :class="{ active: modelValue }"
      @click="toggleSwitch"
      role="switch"
      :aria-checked="modelValue"
    >
      <!--Background Track-->
      <div class="track"></div>

      <!--Moon Icon (Dark Mode)-->
      <div class="icon moon-icon" :class="{ visible: modelValue }">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73 8.15 8.15 0 0 1-8.14-8.1 8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36a10.14 10.14 0 1 0 14 11.69 1 1 0 0 0-.36-1.05z"
          />
        </svg>
        <!--Stars-->
        <span class="star star-1">★</span>
        <span class="star star-2">★</span>
      </div>

      <!--Sun Icon (Light Mode)-->
      <div class="icon sun-icon" :class="{ visible: !modelValue }">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="5" />
          <line
            x1="12"
            y1="1"
            x2="12"
            y2="3"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <line
            x1="12"
            y1="21"
            x2="12"
            y2="23"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <line
            x1="4.22"
            y1="4.22"
            x2="5.64"
            y2="5.64"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <line
            x1="18.36"
            y1="18.36"
            x2="19.78"
            y2="19.78"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <line
            x1="1"
            y1="12"
            x2="3"
            y2="12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <line
            x1="21"
            y1="12"
            x2="23"
            y2="12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <line
            x1="4.22"
            y1="19.78"
            x2="5.64"
            y2="18.36"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <line
            x1="18.36"
            y1="5.64"
            x2="19.78"
            y2="4.22"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
        <!--Cloud-->
        <div class="cloud"></div>
      </div>

      <!--Toggle Handle-->
      <div class="handle"></div>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const { isDarkMode } = storeToRefs(useTaskStore());

const emit = defineEmits(["update:modelValue"]);

function toggleSwitch() {
  emit("update:modelValue", !props.modelValue);
  isDarkMode.value = !isDarkMode.value;
}
</script>

<style lang="scss" scoped>
.toggle-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-switch {
  position: relative;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;
  background: transparent;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.3);
  }
}

.track {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #a0a0a0 0%, #d0d0d0 100%);
  border-radius: 25px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch.active .track {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.handle {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.3),
    0 1px 2px rgba(0, 0, 0, 0.2);
  z-index: 5;
}

.toggle-switch.active .handle {
  transform: translateX(40px);
}

.icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 15;

  &.visible {
    opacity: 1;
  }

  svg {
    width: 20px;
    height: 20px;
    display: block;
  }
}

.moon-icon {
  left: 52px;
  color: #f5f5f5;

  &.visible {
    animation: fadeInRotate 0.5s ease-out;
  }

  .star {
    position: absolute;
    color: #ffd700;
    font-size: 10px;
    animation: twinkle 1.5s infinite;
  }

  .star-1 {
    top: -8px;
    right: -6px;
    animation-delay: 0s;
  }

  .star-2 {
    top: 10px;
    right: -10px;
    animation-delay: 0.3s;
  }
}

.sun-icon {
  left: 8px;
  color: #ffa500;

  &.visible {
    animation: fadeInRotate 0.5s ease-out reverse;
  }

  svg circle {
    fill: #ffb732;
  }

  .cloud {
    position: absolute;
    width: 18px;
    height: 8px;
    background: white;
    border-radius: 10px;
    bottom: -12px;
    right: -8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

    &::before,
    &::after {
      content: "";
      position: absolute;
      background: white;
      border-radius: 50%;
    }

    &::before {
      width: 10px;
      height: 10px;
      top: -4px;
      left: 2px;
    }

    &::after {
      width: 8px;
      height: 8px;
      top: -3px;
      right: 2px;
    }
  }
}

@keyframes fadeInRotate {
  from {
    opacity: 0;
    transform: translateY(-50%) rotate(-180deg) scale(0.5);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) rotate(0deg) scale(1);
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}
</style>
