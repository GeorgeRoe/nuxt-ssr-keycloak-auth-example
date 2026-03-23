export interface KeycloakAuthPayload {
  realm_access?: {
    roles: string[]
  }
}