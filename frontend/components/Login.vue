<template>
  <div class="login">
  <div class="login-box">
    <Button v-for="b in props.buttons" :key="b" :label="String(b)" @click="handleUserDetails(String(b))" />
  </div>
  <!--Login Box-->
  <div class="login-panel container" :class="{ 'active': loginBox === true }">
    <h5>Login</h5>
    <button class="close-form-button" @click="closeForm('login')">
      <Icon name="mdi:close-box" class="close-form-button-icon" />
    </button>

    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" placeholder="Password" type="password" />
      <button type="submit" id="login-submit">Login</button>
    </form>

    <div v-if="error" style="color: red">{{ error }}</div>
  </div>
  <!--Signup Box-->
  <div class="login-panel container" :class="{ 'active': signupBox === true }">
    <h5>Sign Up</h5>
    <button class="close-form-button" @click="closeForm('signup')">
      <Icon name="mdi:close-box" class="close-form-button-icon" />
    </button>

    <form @submit.prevent="handleSignup">
      <input v-model="newUsername" placeholder="Username" />
      <input v-model="newPassword" placeholder="Password" type="password" />
      <button type="submit" id="signup-submit">Sign Up</button>
    </form>

    <div v-if="signupError" style="color: red">{{ signupError }}</div>
    <div v-if="signupSuccess" style="color: green">{{ signupSuccess }}</div>
  </div>
  </div>
</template>

<script setup>
//---Imports---//
import { ref } from "vue";
//---Props---//
const props = defineProps({
  buttons: Array,
})
//---Login State---/
const username = ref("");
const password = ref("");
const error = ref("");
//---Signup State---//
const newUsername = ref("");
const newPassword = ref("");
const signupError = ref("");
const signupSuccess = ref("");
//---Login Handler---//
async function handleLogin() {
  const res = await fetch("http://localhost:3001/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
    }),
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    // Redirect to main page, or update UI state to "logged in"
  } else {
    error.value = data.error || "Login failed";
  }
}
//---Signup Handler---//
async function handleSignup() {
  signupError.value = "";
  signupSuccess.value = "";
  const res = await fetch("http://localhost:3001/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: newUsername.value,
      password: newPassword.value,
    }),
  });
  const data = await res.json();
  if (data.success) {
    signupSuccess.value = "Signup successful! You can now log in.";
    setTimeout(() => {
      signupSuccess.value = "";
      handleUserDetails("login");
    }, 1000);
  } else {
    signupError.value = data.error || "Signup failed";
  }
}
//---Login/Signup UI---//
const loginBox = ref(false);
const signupBox = ref(false);
function handleUserDetails(button) {
  button = button.toLowerCase().replace(/\s+/g, '');
  if (button === "login") {
    loginBox.value = true;
    signupBox.value = false;
  }
  else if (button === "signup") {
    signupBox.value = true;
    loginBox.value = false;
    signupError.value = "";
    signupSuccess.value = "";
  }
}
function closeForm(button) {
  if (button === "login") {
    loginBox.value = false;
    error.value = "";
  } else if (button === "signup") {
    signupBox.value = false;
    signupError.value = "";
    signupSuccess.value = "";
  }
}
</script>

<style scoped>
.login-box {
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  z-index: 1;
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
.login-panel {
  position: absolute;
  top: 100px;
  right: 35px;
  width: fit-content;
  transform: translate(-50%, -50%);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 15px;
  transform: translateY(-20%);
  transition: all 0.2s ease-in;
  opacity: 0;
  z-index: 2;
  pointer-events: none;

}
.active {
  transform: translateY(0%);
  opacity: 1;
  pointer-events: all;
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
.login-panel h5 {
  font-size: 1rem;
}
.login-panel form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}
.login-panel input {
  font-size: 0.8rem;
}
#login-submit,
#signup-submit {
  padding: 0.4em;
  background-color: var(--maingrey);
  color: var(--offwhite);
  border-radius: 5px;
  border-radius: 5px;
  font-size: 0.6rem;
}
#login-submit:hover {
  background-color: var(--offwhite);
  border-color: var(--maingrey);
  color: var(--maingrey);
  background-color: var(--maingrey);
  color: var(--offwhite);
}
#signup-submit:hover {
  background-color: var(--signupblue);
  border-color: var(--signupblue);
}
</style>
