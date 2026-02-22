<template>
  <div class="page">
    <form @submit.prevent="handleSubmit" class="container login">
      <h2>{{ isRegistering ? "Register" : "Login" }}</h2>
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <p v-if="error">{{ error }}</p>
      <button type="submit" class="login-button">
        {{ isRegistering ? "Register" : "Login" }}
      </button>
      <button
        type="button"
        class="need-account"
        @click="isRegistering = !isRegistering"
      >
        {{ isRegistering ? "Already have an account?" : "Need an account?" }}
      </button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({ middleware: "guest" }); // redirect if already logged in

const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const error = ref("");
const isRegistering = ref(false);

async function handleSubmit() {
  error.value = "";

  const { error: authError } = isRegistering.value
    ? await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })
    : await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });

  if (authError) {
    error.value = authError.message;
    return;
  }

  await navigateTo("/");
}
</script>

<style scoped lang="scss">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 2em;
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 -3px 2px rgba(0, 0, 0, 0.3);

  h2 {
    margin-bottom: 1em;
  }

  input {
    padding: 0.5em;
    margin: 0.5em;
    border-radius: 5px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 -3px 2px rgba(0, 0, 0, 0.3);
    font-size: 0.8rem;
    width: 100%;
  }

  .login-button {
    padding: 0.5em;
    margin: 0.5em;
    border-radius: 5px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 -3px 2px rgba(0, 0, 0, 0.3);
    font-size: 0.8rem;
    width: 100%;
    background-color: #597bcb;
    color: #ffffff;
    transition: all 0.1s ease;
    &:hover {
      background-color: #4d699e;
    }
    &:active {
      background-color: #597bcb;
    }
  }
  .need-account {
    font-size: 0.7rem;
    cursor: pointer;
    color: #597bcb;
    background: none;
    border: none;
    padding: none;
    margin: none;
    box-shadow: none;
    font-weight: 400;
    transition: font-weight 0.1s ease;
    margin-top: 1em;

    &:hover {
      font-weight: 500;
    }
    &:active {
      font-weight: 400;
    }
  }
}
</style>
