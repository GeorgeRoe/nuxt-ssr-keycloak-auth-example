export default defineOAuthKeycloakEventHandler({
  async onSuccess(event, { user, tokens }) {
    // encrypt the user data into an HTTP-only cookie
    await setUserSession(event, {
      user: {
        id: user.sub,
        name: user.name,
        email: user.email,
        // any other OIDC claims can go here, e.g., roles
      },
      secure: {
        accessToken: tokens.access_token
      }
    })
    
    return sendRedirect(event, '/')
  },
  
  onError(event, error) {
    console.error('Keycloak OAuth error:', error)
    return sendRedirect(event, '/?error=auth_failed')
  },
})