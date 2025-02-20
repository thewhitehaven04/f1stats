import { Link, useParams, useRouteLoaderData } from "react-router"
import type { ScheduledEvent } from "~/client/generated"
import { Breadcrumbs } from "~/components/Breadcrumbs"
import { SessionSearch } from "~/components/SessionSearch"
import { SeasonSelector } from "~/features/navigation/components/SeasonSelector"

export function Header() {
    const events = useRouteLoaderData<ScheduledEvent[]>('routes/Year')
    const { year } = useParams<{year: string}>()

    return (
        <div className="sticky backdrop-blur-sm z-40 top-0">
            <header className="bg-base-100 opacity-80 shadow-sm w-screen flex flex-row gap-8 justify-between items-center py-2 pl-4">
                <div className="pl-4 flex flex-row gap-8 items-center">
                    <div className="text-xl font-semibold opacity-80">
                        <Link to="/" viewTransition>
                            F1Stats
                        </Link>
                    </div>
                    <Breadcrumbs />
                </div>
                <div className='flex flex-row gap-2 items-center'>
                    {events && <SessionSearch events={events} season={year || '2024'} />}
                    <SeasonSelector />
                </div>
            </header>
        </div>
    )
}
