// declare keycloak specific types to be used by nuxt-auth-utils
declare module '#auth-utils' {
  interface User {
    id: string
    name: string
    email: string
    roles: Role[]
    // any other OIDC claims can go here
  }
  
  interface UserSession {
  }

  interface SecureSessionData {
    accessToken: string
    idToken: string
  }
}

export {}