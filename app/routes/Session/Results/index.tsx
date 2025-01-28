import type { Route } from ".react-router/types/app/routes/Session/Results/+types"
import { Suspense } from "react"
import { useNavigate } from "react-router"
import { ApiClient } from "~/client"
import {
    getPracticeResultsSessionResultsPracticeGet,
    getQualifyingResultsSessionResultsQualilikeGet,
    getRacelikeResultsSessionResultsRacelikeGet,
    type SessionIdentifier,
} from "~/client/generated"
import { buildLapsRoute } from "~/features/session/laps/buildResultsRoute"
import { ResultsSection } from "~/features/session/results/components/ResultsSection"
import { ResultsSkeleton } from "~/features/session/results/components/skeleton"
import { ESessionType } from "~/features/session/results/components/types"
import type { IUniqueSession } from '~/features/session/types'

const client = ApiClient
export function headers() {
    return {
        "Cache-Control": "public, max-age=604800",
    }
}

export function loader(loaderArgs: Route.LoaderArgs) {
    const { year, event, session } = loaderArgs.params as IUniqueSession 

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
        case "Sprint Shootout":
            return {
                results: getQualifyingResultsSessionResultsQualilikeGet({
                    client,
                    throwOnError: true,
                    query: {
                        event_name: event,
                        year,
                        type: session 
                    },
                }).then((response) => response.data),
                type: ESessionType.QUALIFYING,
            } as const
        default:
            return {
                results: getRacelikeResultsSessionResultsRacelikeGet({
                    client,
                    throwOnError: true,
                    query: {
                        event_name: event,
                        year,
                        type: session
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
