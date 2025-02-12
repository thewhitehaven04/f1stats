import type { Config } from "@react-router/dev/config"

async function getPrerenderedRoutes() {
    return Array.from({ length: 24 }).map((_, index) => {
        return `/year/2024/round/${index + 1}/session/Race`
    })
}

export default {
    ssr: true,
    async prerender() {
        return ["/year/2021", "/year/2022", "/year/2023", "/year/2024", ...(await getPrerenderedRoutes())]
    },
} satisfies Config
