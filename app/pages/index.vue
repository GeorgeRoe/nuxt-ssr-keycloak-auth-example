<script setup lang="ts">
const { user, clear } = useUserSession()

// Optional: A helper to handle logging out
async function handleLogout() {
  await clear()
  // You may also want to trigger a redirect to Keycloak's 
  // end-session endpoint here if you want single sign-out.
}
</script>

<template>
  <main>
    <h1>Nuxt Authentication PoC</h1>
    
    <div v-if="user">
      <div>
        <h2>Welcome, {{ user.name }}!</h2>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>User ID:</strong> {{ user.id }}</p>
      </div>
      
      <button @click="handleLogout">
        Log Out
      </button>
    </div>
    
    <div v-else>
      <p>You are currently unauthenticated.</p>
      <a href="/api/auth/keycloak">
        Log in with Keycloak
      </a>
    </div>
  </main>
</template>