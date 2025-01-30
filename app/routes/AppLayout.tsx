import { Outlet } from "react-router"
import { Breadcrumbs } from "~/components/Breadcrumbs"
import { SeasonSelector } from "~/features/navigation/components/SeasonSelector"

export function meta() {
    return [{ title: "F1 Statistics & Telemetry visualizer" }]
}

export default function Layout() {
    return (
        <div className="flex flex-col gap-8 items-center overflow-y-scroll">
            <header className="bg-base-100 opacity-85 backdrop-blur-sm bg-blend-normal border-b-2 shadow-sm w-screen flex flex-row gap-8 justify-between items-center sticky top-0 z-50 py-2 pl-4">
                <div className="pl-4 flex flex-row gap-8 items-center">
                    <div className="text-xl font-semibold">F1Stats</div>
                    <Breadcrumbs />
                </div>
                <SeasonSelector />
            </header>
            <main className="w-[calc(100vw-36px)] xl:w-[1200px] 2xl:w-[1440px]">
                <Outlet />
            </main>
        </div>
    )
}
