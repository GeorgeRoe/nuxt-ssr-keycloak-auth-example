export default defineOAuthKeycloakEventHandler({
  async onSuccess(event, { user, tokens }) {
    // This runs securely on the server. 
    // We encrypt the user data into an HTTP-only cookie.
    await setUserSession(event, {
      user: {
        id: user.sub,
        name: user.name,
        email: user.email,
        // You can map any other standard OpenID claims here
      },
      secure: {
        accessToken: tokens.access_token
      }
    })
    
    // Redirect back to the application after successful login
    return sendRedirect(event, '/')
  },
  
  onError(event, error) {
    console.error('Keycloak OAuth error:', error)
    return sendRedirect(event, '/?error=auth_failed')
  },
})