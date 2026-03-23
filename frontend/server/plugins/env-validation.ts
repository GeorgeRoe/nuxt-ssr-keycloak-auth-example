export default defineNitroPlugin((_nitroApp) => {
  const config = useRuntimeConfig()

  const requiredKeys = [
    'oauthKeycloakServerUrl',
    'oauthKeycloakRealm',
    'oauthKeycloakClientId',
    'backendApiUrl'
  ]

  const missingKeys = requiredKeys.filter(key => !config[key])

  if (missingKeys.length > 0) {
    console.error('FATAL ERROR: Server failed to start due to missing configuration.')
    console.error(`Missing keys in runtimeConfig: ${missingKeys.join(', ')}`)
    console.error('Please check your .env file or server environment variables.')
    
    process.exit(1)
  }

  console.info('✅ Environment variables validated successfully.')
})