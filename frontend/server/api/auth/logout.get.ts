export default defineEventHandler(async (event) => {
	// Clear the user session cookie
  await clearUserSession(event)

  const {
    oauthKeycloakServerUrl,
    oauthKeycloakRealm,
    oauthKeycloakClientId
  } = useRuntimeConfig()
  
  // Dynamically get the current domain
  const postLogoutRedirectUri = encodeURIComponent(getRequestURL(event).origin)

  const logoutUrl = `${oauthKeycloakServerUrl}/realms/${oauthKeycloakRealm}/protocol/openid-connect/logout?client_id=${oauthKeycloakClientId}&post_logout_redirect_uri=${postLogoutRedirectUri}`

  return sendRedirect(event, logoutUrl)
})