import type { Route } from ".react-router/types/app/routes/+types/Session"
import { ApiClient } from "~/client"
import {
    getPracticeResultsSessionResultsPracticeGet,
    getQualifyingResultsSessionResultsQualifyingGet,
    getRaceResultsSessionResultsRaceGet,
    getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet,
} from "~/client/generated"
import { getSessionFromParams } from "~/routes/helpers/getSessionFromParams"
import { SessionSummaryCard } from "~/features/session/summary"
import { PracticeResults } from "~/features/session/results/components/PracticeResults"
import { RaceResults } from "~/features/session/results/components/RaceResults"
import { QualifyingResults } from "~/features/session/results/components/QualifyingResults"
import { Suspense } from "react"

const client = ApiClient

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

        return { summary, results: practice, type: "practice" as const }
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
        return { summary, results: qualifying, type: "qualifying" as const }
    }

    const race = getRaceResultsSessionResultsRaceGet({
        client,
        throwOnError: true,
        query: {
            event_name: session.event,
            year,
        },
    }).then((response) => response.data)

    return { summary, results: race, type: "race" as const }
}

export default function SessionRoute(props: Route.ComponentProps) {
    const { summary, results, type } = props.loaderData

    return (
        <section className="w-full px-4">
            <h1 className="card-title">Session information</h1>
            <Suspense fallback={<div className="loading loading-spinner" />}>
                <SessionSummaryCard summary={summary} />
            </Suspense>
            <Suspense fallback={<div className="loading loading-spinner" />}>
                <div className="flex flex-col gap-2">
                    {type === "practice" && <PracticeResults rawResults={results} />}
                    {type === "qualifying" && <QualifyingResults rawResults={results} />}
                    {type === "race" && <RaceResults rawResults={results} />}
                </div>
            </Suspense>
        </section>
    )
}
