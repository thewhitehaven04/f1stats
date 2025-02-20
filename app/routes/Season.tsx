import type { Route } from ".react-router/types/app/routes/+types/Season"
import { useRouteLoaderData } from 'react-router'
import { EventsSection } from "~/features/season/EventsSection"

export default function SeasonRoute(props: Route.ComponentProps) {
    const { params } = props
    const loaderData = useRouteLoaderData('routes/Year')

    return <EventsSection events={loaderData} year={params.year} />
}
