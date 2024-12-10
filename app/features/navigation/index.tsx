import type { Route } from ".react-router/types/app/routes/+types/Layout"
import { useLoaderData, useParams, type Session } from "react-router"
import type { SessionIdentifier } from "~/client/generated"
import { EventSection } from "~/features/navigation/components/EventSection"
import { SeasonSelector } from "~/features/navigation/components/SeasonSelector"

export interface INavigationProps {
    onSeasonChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void
}

export function Navigation({ onSeasonChange }: INavigationProps) {
    const params = useParams<{ year: string; event: string; session: SessionIdentifier }>()
    const events = useLoaderData<Route.ComponentProps["loaderData"]>()

    return (
        <nav className="menu w-64">
            <SeasonSelector onSeasonChange={onSeasonChange} value={params.year || "2024"} />
            <EventSection
                events={events}
                year={params.year || "2024"}
                activeSession={{
                    event: params.event,
                    session: params.session,
                }}
            />
        </nav>
    )
}
