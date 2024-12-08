import { createClient } from '@hey-api/client-fetch'

export const ApiClient = createClient(
    {
        baseUrl: 'http://localhost:8000/'
    }
)