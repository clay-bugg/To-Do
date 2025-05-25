<template>
  <div class="login">
    <Button class="login-button" id="login" :label="'Login'" /> 
    <Button class="login-button" id="sign-up" :label="'Sign Up'" />
  </div>
</template>

<script setup>

</script>

<style scoped>
.login {
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
}
.login-button {
  background-color: black;
}
#login:hover {
  background-color: green;
  color: var(--offwhite);
}
#sign-up:hover {
  background-color: rgb(68, 108, 200);
  color: var(--offwhite);
}
</style>