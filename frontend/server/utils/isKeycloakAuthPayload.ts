import is from '@sindresorhus/is'

// Checks if the given payload is a valid Keycloak authentication payload
export function isKeycloakAuthPayload(payload: unknown): payload is KeycloakAuthPayload {
  if (!is.plainObject(payload)) {
    return false
  }

  const { realm_access } = payload

  if (is.undefined(realm_access)) {
    return true
  }

  return is.plainObject(realm_access) && is.array(realm_access.roles, is.string)
}