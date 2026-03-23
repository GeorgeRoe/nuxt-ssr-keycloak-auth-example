<script setup lang="ts">
// securely fetches user data
const { user } = useUserSession()

// fetches data from the backend API, which will trigger a redirect to Keycloak if the user is not authenticated
const { data, error } = await useBackendApi('/api/user')
</script>

<template>
  <main>
    <h1>Nuxt SSR KeyCloak Authentication Example</h1>
    
    <div v-if="user">
      <div>
        <h2>Welcome, {{ user.name }}!</h2>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>User ID:</strong> {{ user.id }}</p>
        <p><strong>Roles:</strong></p>
        <ul>
          <li v-for="role in user.roles" :key="role">{{ role }}</li>
        </ul>
      </div>

      <a href="/api/auth/logout">Logout</a>
    </div>
    
    <div v-else>
      <p>You are currently unauthenticated.</p>
      <a href="/api/auth/login">
        Log in with Keycloak
      </a>
    </div>

    <pre v-if="data">{{ data }}</pre>
    <pre v-if="error">{{ error }}</pre>
  </main>
</template>