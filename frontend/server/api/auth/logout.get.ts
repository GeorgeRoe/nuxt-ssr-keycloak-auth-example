export default defineEventHandler(async (event) => {
	// Clear the user session cookie
  await clearUserSession(event)

  const keycloakUrl = process.env.NUXT_OAUTH_KEYCLOAK_SERVER_URL
  const realm = process.env.NUXT_OAUTH_KEYCLOAK_REALM
  const clientId = process.env.NUXT_OAUTH_KEYCLOAK_CLIENT_ID

  if (!keycloakUrl || !realm || !clientId) {
	throw new Error('Keycloak configuration is missing. Please set NUXT_OAUTH_KEYCLOAK_SERVER_URL, NUXT_OAUTH_KEYCLOAK_REALM, and NUXT_OAUTH_KEYCLOAK_CLIENT_ID environment variables.')
  }
  
  // Dynamically get the current domain
  const postLogoutRedirectUri = encodeURIComponent(getRequestURL(event).origin)

  const logoutUrl = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/logout?client_id=${clientId}&post_logout_redirect_uri=${postLogoutRedirectUri}`

  return sendRedirect(event, logoutUrl)
})