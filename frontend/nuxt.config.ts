// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['nuxt-auth-utils'],

  runtimeConfig: {
    oauthKeycloakServerUrl: '',
    oauthKeycloakRealm: '',
    oauthKeycloakClientId: '',
    backendApiUrl: 'http://127.0.0.1:3001'
  }
})