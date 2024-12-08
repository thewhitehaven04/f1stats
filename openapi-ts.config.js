import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
    client: "@hey-api/client-fetch",
    input: "app/client/apiGenerator/generated/openapi.json",
    output: { path: "app/client/generated", format: "biome" },
})
