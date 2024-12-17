import type { Route } from ".react-router/types/app/routes/+types/Layout"
import { Outlet, useNavigate } from "react-router"
import { ApiClient } from "~/client"
import { yearEventsSeasonYearGet } from "~/client/generated"
import { Navigation } from "~/features/navigation"

export function meta() {
    return [{ title: "F1 Stats Visualizer" }, { name: "description" }]
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
        <div className="lg:max-w-screen-xl flex flex-row justify-stretch h-screen">
            <div className="max-w-80 overflow-y-scroll">
                <Navigation onSeasonChange={handleSeasonChange} />
            </div>
            <div className="w-full overflow-y-scroll">
                <section className="card p-4 bg-white shadow-md min-h-full">
                    <div className="card-body p-0">
                        <Outlet />
                    </div>
                </section>
            </div>
        </div>
    )
}
