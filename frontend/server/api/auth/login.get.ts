export default defineOAuthKeycloakEventHandler({
  async onSuccess(event, { user, tokens }) {
    const accessToken = tokens.access_token

    // decode the access token to extract user roles and other claims
    const base64Url = accessToken.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'))
    console.info(JSON.stringify(payload, null, 2)) // log the decoded token payload for debugging

    const roles = payload.realm_access?.roles || []

    // encrypt the user data into an HTTP-only cookie
    console.info(user)
    await setUserSession(event, {
      user: {
        id: user.sub,
        name: user.name,
        email: user.email,
        roles
        // any other OIDC claims can go here
      },
      secure: {
        accessToken,
        idToken: tokens.id_token
      }
    })
    
    return sendRedirect(event, '/')
  },
  
  onError(event, error) {
    console.error('Keycloak OAuth error:', error)
    return sendRedirect(event, '/?error=auth_failed')
  },
})