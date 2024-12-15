import type { Route } from ".react-router/types/app/routes/+types/Session"
import { ApiClient } from "~/client"
import {
    getPracticeResultsSessionResultsPracticeGet,
    getQualifyingResultsSessionResultsQualifyingGet,
    getRaceResultsSessionResultsRaceGet,
    getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet,
    type SessionIdentifier,
} from "~/client/generated"
import { getSessionFromParams } from "~/routes/helpers/getSessionFromParams"
import { SessionSummaryCard } from "~/features/session/summary"
import { PracticeResults } from "~/features/session/results/components/PracticeResults"
import { RaceResults } from "~/features/session/results/components/RaceResults"
import { QualifyingResults } from "~/features/session/results/components/QualifyingResults"
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
    const session = getSessionFromParams(loaderArgs.params)
    const year = Number.parseInt(session.year)

    const summary = getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet({
        client,
        throwOnError: true,
        path: {
            event_name: session.event,
            session_identifier: session.session,
            year,
        },
    }).then((response) => response.data)

    if (session.session === "Practice 1" || session.session === "Practice 2" || session.session === "Practice 3") {
        const practice = getPracticeResultsSessionResultsPracticeGet({
            client,
            throwOnError: true,
            query: {
                event_name: session.event,
                practice: session.session,
                year,
            },
        }).then((response) => response.data)

        return { summary, results: practice, type: ESessionType.PRACTICE }
    }

    if (session.session === "Qualifying" || session.session === "Sprint Shootout") {
        const qualifying = getQualifyingResultsSessionResultsQualifyingGet({
            client,
            throwOnError: true,
            query: {
                event_name: session.event,
                qualifying: session.session,
                year,
            },
        }).then((response) => response.data)
        return { summary, results: qualifying, type: ESessionType.QUALI_LIKE }
    }

    const race = getRaceResultsSessionResultsRaceGet({
        client,
        throwOnError: true,
        query: {
            event_name: session.event,
            year,
        },
    }).then((response) => response.data)

    return { summary, results: race, type: ESessionType.RACE_LIKE }
}

export default function SessionRoute(props: Route.ComponentProps) {
    const { summary, results: resultsPromise, type } = props.loaderData
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
                    <ResultsSection
                        data={{
                            resultsPromise,
                            type,
                        }}
                        onViewLaps={handleNavigateToViewLaps}
                    />
                </div>
            </Suspense>
        </section>
    )
}
