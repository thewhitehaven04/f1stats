import type { Route } from '.react-router/types/app/routes/+types'
import { Link, Outlet, useNavigate } from "react-router"
import { ApiClient } from "~/client"
import { yearEventsEventYearYearGet } from "~/client/generated"
import { SUPPORTED_SEASONS } from "~/routes/constants"

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
export function meta({}: Route.MetaArgs) {
    return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }]
}

export async function loader(loaderProps: Route.LoaderArgs) {
    const year = loaderProps.params.year || "2024"
    const { data: seasons, error } = await yearEventsEventYearYearGet({
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

export default function Application(props: Route.ComponentProps) {
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
            <Outlet />
        </div>
    )
}
