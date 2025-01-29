import type { Route } from ".react-router/types/app/routes/+types/Season"
import { ApiClient } from "~/client"
import { yearEventsSeasonYearGet } from "~/client/generated"

export async function loader(props: Route.LoaderArgs) {
    return (
        await yearEventsSeasonYearGet({
            throwOnError: true,
            client: ApiClient,
            path: { year: Number.parseInt(props.params.year) },
        })
    ).data
}

export default function SeasonRoute(props: Route.ComponentProps) {
    const { loaderData: events } = props

    return (
        <section className="w-full grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-8">
            {events.EventName.map((eventName, index) => (
                <article key={eventName} className="card p-4 border-2 shadow-md">
                    <h1 className="card-title">{eventName}</h1>
                    <div className="card-body">
                        <span>{events.EventDate[index]}</span>
                        <ul>
                            <li>{events.Session1[index]}</li>
                            <li>{events.Session2[index]}</li>
                            <li>{events.Session3[index]}</li>
                            <li>{events.Session4[index]}</li>
                            <li>{events.Session5[index]}</li>
                        </ul>
                    </div>
                </article>
            ))}
        </section>
    )
}
