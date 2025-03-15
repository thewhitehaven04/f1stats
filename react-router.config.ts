import type { Config } from "@react-router/dev/config"

async function getPrerenderedRoutes() {
    const prevYearData = Array.from({ length: 24 })
        // Brazil race data is broken, removing from prebuild
        .map((_, index) => index + 1)
        .filter((round) => round !== 21)
        .flatMap((round) => [`/year/2024/round/${round}/session/Race`, `/year/2024/round/${round}/session/Qualifying`])
    const currentYearData = [
        "/year/2025/round/1/session/Qualifying",
        "/year/2025/round/1/session/Practice 1",
        "/year/2025/round/1/session/Practice 2",
        "/year/2025/round/1/session/Practice 3",
    ]

    return [...prevYearData, ...currentYearData]
}

export default {
    ssr: true,
    async prerender() {
        return ["/year/2021", "/year/2022", "/year/2023", "/year/2024", ...(await getPrerenderedRoutes())]
    },
} satisfies Config
