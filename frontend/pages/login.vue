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
      <p v-if="error" class="error-msg">{{ error }}</p>
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
definePageMeta({ middleware: "guest" });

const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const error = ref("");
const isRegistering = ref(false);

async function handleSubmit() {
  error.value = "";
  console.log("[login] Attempting auth | isRegistering:", isRegistering.value, "| email:", email.value);

  const { data: authData, error: authError } = isRegistering.value
    ? await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      })
    : await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });

  console.log("[login] Auth response | data:", authData, "| error:", authError);

  if (authError) {
    error.value = authError.message;
    return;
  }

  console.log("[login] Success — navigating to /");
  await navigateTo("/", { external: true });
}
</script>

<style scoped lang="scss">
@use "@/assets/css/variables" as *;

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 2em;
  border-radius: $radius-md;
  border: $border-std;
  box-shadow: $shadow-inset;

  h2 {
    margin-bottom: 1em;
  }

  .error-msg {
    color: red;
    font-size: 0.7rem;
  }

  input {
    padding: 0.5em;
    margin: 0.5em;
    border-radius: $radius-sm;
    border: $border-std;
    box-shadow: $shadow-inset;
    font-size: 0.8rem;
    width: 100%;
  }

  .login-button {
    padding: 0.5em;
    margin: 0.5em;
    border-radius: $radius-sm;
    border: $border-std;
    box-shadow: $shadow-inset;
    font-size: 0.8rem;
    width: 100%;
    background-color: $accent;
    color: $white;
    transition: all 0.1s ease;

    &:hover {
      background-color: $accent-dark;
    }
    &:active {
      background-color: $accent;
    }
  }

  .need-account {
    font-size: 0.7rem;
    cursor: pointer;
    color: $accent;
    background: none;
    border: none;
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
