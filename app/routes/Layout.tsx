import type { Route } from ".react-router/types/app/routes/+types/Layout"
import { Outlet, useNavigate } from "react-router"
import { ApiClient } from "~/client"
import { yearEventsSeasonYearGet } from "~/client/generated"
import { Navigation } from "~/features/navigation"

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

export default function Layout() {
    const navigate = useNavigate()
    const handleSeasonChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        navigate(`/year/${evt.target.value}`)
    }

    return (
        <div className="max-w-screen-2xl flex flex-row">
            <div className="drawer lg:drawer-open">
                <input type="checkbox" id="drawer-toggle" className="drawer-toggle" />
                <div className="drawer-side">
                   <Navigation onSeasonChange={handleSeasonChange}/> 
                </div>
                <div className="drawer-content">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
