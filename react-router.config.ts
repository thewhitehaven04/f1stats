import type { Config } from "@react-router/dev/config"
import { ApiClient } from './app/client/index'
import { yearEventsSeasonYearGet } from './app/client/generated'

async function getPrerenderedRoutes() {
    const events = (
        await yearEventsSeasonYearGet({
            client: ApiClient,
            throwOnError: true,
            path: {
                year: 2024,
            },
        })
    ).data
    return events.slice(1).flatMap((event) => {
        return [
            `/year/2024/event/${event.OfficialEventName}/session/${event.Session4}`,
            `/year/2024/event/${event.OfficialEventName}/session/${event.Session5}`,
        ]
    })
}

export default {
    ssr: true,
    async prerender() {
        return ["/year/2021", "/year/2022", "/year/2023", "/year/2024", ...(await getPrerenderedRoutes())]
    },
} satisfies Config
