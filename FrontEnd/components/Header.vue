<template>
  <header class="container">
    <Login :buttons="['Login', 'Sign Up']"/>
  </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
header {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 45px;
  z-index: 1;
}
</style>