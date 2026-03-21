export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  if (!session.secure?.accessToken) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const targetPath = event.context.params?._ ?? ''

  const backendBaseUrl = 'https://api.your-company.com'
  const targetUrl = `${backendBaseUrl}/${targetPath}`

  return proxyRequest(event, targetUrl, {
    headers: {
      Authorization: `Bearer ${session.secure.accessToken}`
    }
  })
})