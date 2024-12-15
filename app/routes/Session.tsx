import type { Route } from ".react-router/types/app/routes/+types/Session"
import { ApiClient } from "~/client"
import {
    getPracticeResultsSessionResultsPracticeGet,
    getQualifyingResultsSessionResultsQualifyingGet,
    getRaceResultsSessionResultsRaceGet,
    getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet,
    type SessionIdentifier,
} from "~/client/generated"
import { SessionSummaryCard } from "~/features/session/summary"
import { Suspense } from "react"
import { ResultsSkeleton } from "~/features/session/results/components/skeleton"
import { SummarySkeleton } from "~/features/session/summary/skeleton"
import { useNavigate, type HeadersFunction } from "react-router"
import { buildLapsRoute } from "~/features/session/laps/buildResultsRoute"
import { ResultsSection } from "~/features/session/results/components/ResultsSection"
import { ESessionType } from "~/features/session/results/components/types"

const client = ApiClient
export const headers: HeadersFunction = () => ({
    "Cache-Control": "max-age=604800",
})

export async function loader(loaderArgs: Route.LoaderArgs) {
    const { year, event, session } = loaderArgs.params as { year: string; event: string; session: SessionIdentifier }
    const parsedYear = Number.parseInt(year)

    const summary = getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet({
        client,
        throwOnError: true,
        path: {
            event_name: event,
            session_identifier: session as SessionIdentifier,
            year: parsedYear,
        },
    }).then((response) => response.data)

    switch (session) {
        case "Practice 1":
        case "Practice 2":
        case "Practice 3":
            return {
                summary,
                results: getPracticeResultsSessionResultsPracticeGet({
                    client,
                    throwOnError: true,
                    query: {
                        event_name: event,
                        practice: session,
                        year: parsedYear,
                    },
                }).then((response) => response.data),
                type: ESessionType.PRACTICE,
            } as const
        case "Qualifying":
        case "Sprint Qualifying":
            return {
                summary,
                results: getQualifyingResultsSessionResultsQualifyingGet({
                    client,
                    throwOnError: true,
                    query: {
                        event_name: event,
                        qualifying: session,
                        year: parsedYear,
                    },
                }).then((response) => response.data),
                type: ESessionType.QUALIFYING,
            } as const
        default:
            return {
                summary,
                throwOnError: true,
                results: getRaceResultsSessionResultsRaceGet({
                    client,
                    throwOnError: true,
                    query: {
                        event_name: event,
                        year: parsedYear,
                    },
                }).then((response) => response.data),
                type: ESessionType.RACE,
            } as const
    }
}

export default function SessionRoute(props: Route.ComponentProps) {
    const { summary, ...results } = props.loaderData
    const { params } = props

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
        <section className="w-full px-4">
            <h1 className="card-title">Session information</h1>
            <Suspense fallback={<SummarySkeleton />}>
                <SessionSummaryCard summary={summary} />
            </Suspense>
            <Suspense fallback={<ResultsSkeleton />}>
                <div className="flex flex-col gap-2">
                    <ResultsSection data={results} onViewLaps={handleNavigateToViewLaps} />
                </div>
            </Suspense>
        </section>
    )
}
