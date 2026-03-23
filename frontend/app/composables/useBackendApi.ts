// composable for making API calls to the backend server
export const useBackendApi = createUseFetch({
    baseURL: '/api/backend',
})