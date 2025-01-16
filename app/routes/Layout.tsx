import type { Route } from ".react-router/types/app/routes/+types/Layout"
import { Outlet, useNavigate } from "react-router"
import { ApiClient } from "~/client"
import { yearEventsSeasonYearGet } from "~/client/generated"
import { Breadcrumbs } from "~/components/Breadcrumbs"
import { Navigation } from "~/features/navigation"

export function meta() {
    return [{ title: "F1 Statistics & Telemetry visualizer" }]
}

export async function loader({ params }: Route.LoaderArgs) {
    const { data: seasons, error } = await yearEventsSeasonYearGet({
        client: ApiClient,
        path: { year: params.year ? Number.parseInt(params.year) : new Date().getFullYear() },
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

export default function Layout() {
    const navigate = useNavigate()
    const handleSeasonChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        navigate(`/year/${evt.target.value}`)
    }

    return (
        <>
            <div className="drawer max-w-64 overflow-y-scroll flex-shrink-0">
                <input id="drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-side">
                    <Navigation onSeasonChange={handleSeasonChange} />
                </div>
            </div>
            <div className="drawer-overlay h-screen flex flex-col justify-center">
                <div className="drawer-content w-screen lg:w-[1200px] overflow-scroll flex-grow">
                    <section className="card p-6 bg-white shadow-md min-h-screen">
                        <div className="flex flex-row justify-start items-center gap-8">
                            <label htmlFor="drawer" className="btn btn-sm drawer-button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <title>Toggle drawer</title>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                            </label>
                            <Breadcrumbs />
                        </div>

                        <div className="card-body p-0 w-full">
                            <Outlet />
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
