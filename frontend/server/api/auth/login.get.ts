import { isKeycloakAuthPayload } from '~~/server/utils/isKeycloakAuthPayload'
import { isRole } from '~~/shared/utils/isRole'
import { isUser } from '~~/shared/utils/isUser'

export default defineOAuthKeycloakEventHandler({
  async onSuccess(event, { user, tokens }) {
    const accessToken = tokens.access_token

    // decode the access token to extract user roles and other claims
    const base64Url = accessToken.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'))
    console.info(JSON.stringify(payload, null, 2)) // log the decoded token payload for debugging

    if (!isKeycloakAuthPayload(payload)) {
      throw new Error('Invalid Keycloak token payload structure')
    }

    const roles = payload.realm_access?.roles.filter(isRole) || []

    const authUser = {
      id: user.sub,
      name: user.name,
      email: user.email,
      roles
    }

    // Confirm that we have correctly constructed the user object before proceeding
    if (!isUser(authUser)) {
      throw new Error('Decoded user data does not match expected structure')
    }

    // encrypt the user data into an HTTP-only cookie
    await setUserSession(event, {
      user: authUser,
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