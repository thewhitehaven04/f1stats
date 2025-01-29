import type { Route } from ".react-router/types/app/routes/+types/Season"
import { Outlet, redirect } from "react-router"
import { Breadcrumbs } from "~/components/Breadcrumbs"
import { SeasonSelector } from "~/features/navigation/components/SeasonSelector"

export function meta() {
    return [{ title: "F1 Statistics & Telemetry visualizer" }]
}

export default function Layout() {
    return (
        <div className="flex flex-col gap-8 items-center overflow-y-scroll">
            <header className="bg-base-100 opacity-80 w-screen flex flex-row gap-8 justify-start items-center sticky top-0 z-10 py-2 pl-4">
                <SeasonSelector />
                <Breadcrumbs />
            </header>
            <main className="xs:w-full xl:w-[1200px] 2xl:w-[1440px]">
                <Outlet />
            </main>
        </div>
    )
}
