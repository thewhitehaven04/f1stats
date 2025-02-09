import { createClient } from "@hey-api/client-fetch"

export const ApiClient = createClient({
    baseUrl: import.meta.env.VITE_API_ROOT_URL,
})
console.log('env: ', import.meta.env)
console.log("Created client with baseUrl: ", ApiClient.getConfig().baseUrl)
