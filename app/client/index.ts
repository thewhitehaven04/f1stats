import { createClient } from '@hey-api/client-fetch'

export const ApiClient = createClient(
    {
        baseUrl: import.meta.env.API_ROOT_URL ?? 'http://localhost:8000/'
    }
)
console.log('base url: ', ApiClient.getConfig().baseUrl)