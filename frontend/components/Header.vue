<template>
  <header class="container">
    <p v-if="user">Logged in as {{ user.email }}</p>
    <button @click="handleLogout" class="logout-button">
      Logout
    </button>
  </header>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

async function handleLogout() {
  await supabase.auth.signOut()
  await navigateTo('/login', { external: true })
}
</script>

<style scoped lang="scss">
@use '@/assets/css/variables' as *;

header {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2em;
  padding: 0 60px;
  z-index: 1;

  p {
    font-size: 0.8rem;
    font-weight: 600;
  }
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
    background-color var(--transition-fast),
    font-weight var(--transition-mid);
}
</style>
