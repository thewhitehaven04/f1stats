import type { Route } from ".react-router/types/app/routes/+types/Season"
import { useRouteLoaderData } from "react-router"
import type { ScheduledEvent } from "~/client/generated"
import { EventsSection } from "~/features/season/EventsSection"

export default function SeasonRoute(props: Route.ComponentProps) {
    const { params } = props
    const loaderData = useRouteLoaderData<ScheduledEvent[]>("routes/Year")

    return loaderData ? <EventsSection events={loaderData} year={params.year} /> : <div className="loading-spinner" />
}
