import type { Route } from ".react-router/types/app/routes/+types/app"
import { Link, Outlet, useNavigate } from "react-router"
import { ApiClient } from "~/client"
import { yearEventsSeasonYearGet } from "~/client/generated"
import { SUPPORTED_SEASONS } from "~/routes/constants"

export function meta() {
    return [{ title: "F1 Stats Visualizer" }, { name: "description" }]
}

export async function loader(loaderProps: Route.LoaderArgs) {
    const year = loaderProps.params.year || "2024"
    const { data: seasons, error } = await yearEventsSeasonYearGet({
        client: ApiClient,
        path: { year: Number.parseInt(year) },
    })

    if (error) {
        throw new Error("Unable to start the application")
    }

    return seasons.EventName.map((eventName, index) => ({
        name: eventName,
        sessions: [
            seasons.Session1[index],
            seasons.Session2[index],
            seasons.Session3[index],
            seasons.Session4[index],
            seasons.Session5[index],
        ],
    }))
}

export default function Layout(props: Route.ComponentProps) {
    const { params, loaderData: events } = props

    const navigate = useNavigate()
    const handleSeasonChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        navigate(`/year/${evt.target.value}`)
    }

    return (
        <div className="w-full">
            <div className="drawer">
                <input type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <nav className="menu w-64">
                        <li>
                            <div className="menu-title">Season</div>
                            <select
                                className="select select-md w-32"
                                onChange={handleSeasonChange}
                                value={params.year || 2024}
                            >
                                {SUPPORTED_SEASONS.map((season) => (
                                    <option key={season} value={season}>
                                        {season}
                                    </option>
                                ))}
                            </select>
                        </li>
                        <li>
                            <div className="menu-title">Events</div>
                            <ul className="menu flex flex-col gap-2">
                                {events.map((event) => (
                                    <li key={event.name}>
                                        {event.name}
                                        <details open={false}>
                                            <ul className="menu">
                                                {event.sessions.map((session) => (
                                                    <Link
                                                        key={session}
                                                        className="link-hover"
                                                        to={`/event/${event.name}/session/${session}`}
                                                    >
                                                        {session}
                                                    </Link>
                                                ))}
                                            </ul>
                                        </details>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </nav>
                </div>
            </div>
        </div>
    )
}
