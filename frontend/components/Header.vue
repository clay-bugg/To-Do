<template>
  <header class="container">
    <p v-if="user">Logged in as {{ user.email }}</p>
    <div class="header-buttons">
      <button @click="handleLogout" class="logout-button">
        Logout
      </button>
    </div>
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

  .header-buttons {
    display: flex;
    gap: 0.3em;
  }

  p {
    font-size: 0.7rem;
    font-weight: 500;
    color: $text-mid;
  }
}

.color-schemes-button {
  width: 2.2em;
  height: 2.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: $radius-sm;
  border: $border-std;
  background-color: $white;
  font-size: 0.7rem;
  font-weight: 400;
  color: $text-dark;
  cursor: pointer;
  box-shadow: $shadow-inset;
  transition:
    background-color var(--transition-fast),
    font-weight var(--transition-mid);
  padding: 0.5em;

  #theme-icon {
    width: 100%;
    height: 100%;
  }
}
.logout-button {
  width: 5em;
  height: 2.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: $radius-sm;
  border: $border-std;
  background-color: $white;
  font-size: 0.6rem;
  font-weight: 400;
  color: $text-dark;
  cursor: pointer;
  box-shadow: $shadow-inset;
  transition:
    background-color var(--transition-fast),
    font-weight var(--transition-mid);
  padding: 1em;
}
</style>
