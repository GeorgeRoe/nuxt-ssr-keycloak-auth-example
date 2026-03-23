// creates a composable for fetching data from the backend API with a base URL and error handling for unauthorized access
export const useBackendApi = createUseFetch({
    baseURL: '/api/backend',
    async onResponseError({ response }) {
        if (response.status === 401) {
            await navigateTo('/api/auth/keycloak')
        }
    }
})