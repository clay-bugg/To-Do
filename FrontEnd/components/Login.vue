<template>
  <div class="login">
    <Button
      class="login-button"
      id="login"
      :label="'Login'"
      @click="handleUserDetails('login')"
    />
    <Button
      class="login-button"
      id="sign-up"
      :label="'Sign Up'"
      @click="handleUserDetails('signup')"
    />
  </div>
  <!--Login Box-->
  <div v-if="loginBox === true" class="user-details-box container">
    <h5>Login</h5>
    <button class="close-form-button" @click="closeForm('login')">
      <Icon name="mdi:close-box" class="close-form-button-icon"/>
    </button>

    <form @submit="submitLoginDetails">
      <input v-model="username" class="username user-details-input" />
      <input v-model="password" type="password" class="password user-details-input" />
      <button type="submit" id="login-submit">Login</button>
    </form>

  </div>
  <!--Signup Box-->
  <div v-else-if="signupBox === true" class="user-details-box container">
    <h5>Sign Up</h5>
    <button class="close-form-button" @click="closeForm('signup')">
      <Icon name="mdi:close-box" class="close-form-button-icon"/>
    </button>

    <form @submit="submitLoginDetails">
      <input v-model="newUsername" class="newUsername user-details-input" />
      <input v-model="newPassword" type="password" class="newPassword user-details-input" />
      <button type="submit" id="signup-submit">Sign Up</button>
    </form>

  </div>
  <div v-else-if="signupBox === true" class="login-box"></div>
</template>

<script setup>
import { ref } from "vue";
const loginBox = ref(false);
const signupBox = ref(false);

function handleUserDetails(button) {
  if (button === "login") {
    loginBox.value = true;
    signupBox.value = false;
  } else if (button === "signup") {
    signupBox.value = true;
    loginBox.value = false;
  }
}
function closeForm(button) { 
  if (button === 'login') { 
    loginBox.value = false;
  }
  else if (button === 'signup') { 
    signupBox.value = false;
  }
}
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
  background-color: var(--logingreen);
  color: var(--offwhite);
}
#sign-up:hover {
  background-color: var(--signupblue);
  color: var(--offwhite);
}
.user-details-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 180px;
  transform: translate(-50%, -50%);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 15px;
}
.close-form-button {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border: none;
  background: none;
}
.close-form-button:hover {
  cursor: pointer;
  transform: scale(1.05);
}
.close-form-button-icon {
  height: 100%;
  width: 100%;
}
.user-details-box form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}
.user-details-input {
  width: 100%;
  height: 30px;
}
#login-submit,
#signup-submit {
  padding: 5px;
  background-color: var(--maingrey);
  color: var(--offwhite);
  border-radius: 5px;
}
#login-submit:hover {
  background-color: var(--logingreen);
  border-color: var(--logingreen);
}
#signup-submit:hover {
  background-color: var(--signupblue);
  border-color: var(--signupblue);
}

</style>
