import type { Config } from "@react-router/dev/config"

async function getPrerenderedRoutes() {
    return (
        Array.from({ length: 24 })
            // Brazil race data is broken, removing from prebuild
            .map((_, index) => index + 1)
            .filter((round) => round !== 21)
            .flatMap((round) => [
                `/year/2024/round/${round}/session/Race`,
                `/year/2024/round/${round}/session/Qualifying`,
            ])
    )
}

export default {
    ssr: true,
    async prerender() {
        return ["/year/2021", "/year/2022", "/year/2023", "/year/2024", ...(await getPrerenderedRoutes())]
    },
} satisfies Config
