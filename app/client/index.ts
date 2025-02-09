import { createClient } from "@hey-api/client-fetch"

export const ApiClient = createClient({
    baseUrl: import.meta.env.VITE_API_ROOT_URL || 'http://localhost:8000',
})