// declare keycloak specific types to be used by nuxt-auth-utils
declare module '#auth-utils' {
  interface User {
    id: string
    name: string
    email: string
  }
  
  interface UserSession {
  }

  interface SecureSessionData {
    accessToken: string
  }
}

export {}