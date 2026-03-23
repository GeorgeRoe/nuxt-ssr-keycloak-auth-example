export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  if (!session.secure?.accessToken) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorised' })
  }

  const targetPath = event.context.params?._ ?? ''

  const { backendApiUrl } = useRuntimeConfig()
  const targetUrl = `${backendApiUrl}/${targetPath}`

  return proxyRequest(event, targetUrl, {
    headers: {
      Authorization: `Bearer ${session.secure.accessToken}`
    }
  })
})