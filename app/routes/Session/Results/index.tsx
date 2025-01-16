import type { Route } from '.react-router/types/app/routes/Session/Results/+types'
import { Suspense } from "react"
import { useNavigate, type HeadersFunction } from "react-router"
import { ApiClient } from "~/client"
import {
    getPracticeResultsSessionResultsPracticeGet,
    getQualifyingResultsSessionResultsQualifyingGet,
    getRaceResultsSessionResultsRaceGet,
    type SessionIdentifier,
} from "~/client/generated"
import { buildLapsRoute } from "~/features/session/laps/buildResultsRoute"
import { ResultsSection } from "~/features/session/results/components/ResultsSection"
import { ResultsSkeleton } from "~/features/session/results/components/skeleton"
import { ESessionType } from "~/features/session/results/components/types"

const client = ApiClient
export const headers: HeadersFunction = () => ({
    "Cache-Control": "s-maxage=604800",
})

export function loader(loaderArgs: Route.LoaderArgs) {
    const { year, event, session } = loaderArgs.params as { year: string; event: string; session: SessionIdentifier }

    switch (session) {
        case "Practice 1":
        case "Practice 2":
        case "Practice 3":
            return {
                results: getPracticeResultsSessionResultsPracticeGet({
                    client,
                    throwOnError: true,
                    query: {
                        event_name: event,
                        practice: session,
                        year,
                    },
                }).then((response) => response.data),
                type: ESessionType.PRACTICE,
            } as const
        case "Qualifying":
        case "Sprint Qualifying":
            return {
                results: getQualifyingResultsSessionResultsQualifyingGet({
                    client,
                    throwOnError: true,
                    query: {
                        event_name: event,
                        qualifying: session,
                        year,
                    },
                }).then((response) => response.data),
                type: ESessionType.QUALIFYING,
            } as const
        default:
            return {
                results: getRaceResultsSessionResultsRaceGet({
                    client,
                    throwOnError: true,
                    query: {
                        event_name: event,
                        year,
                    },
                }).then((response) => response.data),
                type: ESessionType.RACE,
            } as const
    }
}

export default function Results(props: Route.ComponentProps) {
    const { loaderData, params } = props

    const navigate = useNavigate()
    const handleNavigateToViewLaps = (drivers: string[]) => {
        navigate(
            buildLapsRoute(
                params.year || new Date().getFullYear(),
                params.event,
                params.session as SessionIdentifier,
                drivers,
            ),
        )
    }

    return (
        <Suspense fallback={<ResultsSkeleton />}>
            <ResultsSection
                key={`${params.year}_${params.event}_${params.session}`}
                data={loaderData}
                onViewLaps={handleNavigateToViewLaps}
            />
        </Suspense>
    )
}
