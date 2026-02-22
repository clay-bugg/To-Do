<template>
  <header class="container">
    <button @click="handleLogout" class="logout-button">Logout</button>
  </header>
</template>

<script setup>
const { logout } = useUserStore();

async function handleLogout() {
  await logout();
  await navigateTo("/login");
}
</script>

<style scoped lang="scss">
@use "@/assets/css/variables" as *;

header {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 60px;
  z-index: 1;
}

.logout-button {
  width: 100px;
  height: 40px;
  border-radius: $radius-sm;
  border: $border-std;
  background-color: $white;
  font-size: 0.8rem;
  font-weight: 400;
  color: $text-dark;
  cursor: pointer;
  box-shadow: $shadow-inset;
  transition:
    background-color 0.15s ease,
    font-weight 0.1s ease;
}
</style>
