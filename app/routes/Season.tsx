import type { Route } from ".react-router/types/app/routes/+types/Season"
import { ApiClient } from "~/client"
import { yearEventsSeasonYearGet } from "~/client/generated"
import { EventsSection } from "~/features/season/EventsSection"

export async function loader(props: Route.LoaderArgs) {
    return (
        await yearEventsSeasonYearGet({
            throwOnError: true,
            client: ApiClient,
            path: { year: Number.parseInt(props.params.year) },
        })
    ).data
}

export function headers() {
    return {
        'Cache-Control': 'public, max-age=4233600',
    }
}

export default function SeasonRoute(props: Route.ComponentProps) {
    const { loaderData: events } = props

    return <EventsSection events={events} year={props.params.year} />
}
