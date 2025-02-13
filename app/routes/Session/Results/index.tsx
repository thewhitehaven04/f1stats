import type { Route } from ".react-router/types/app/routes/Session/Results/+types"
import { Suspense } from "react"
import { ApiClient } from "~/client"
import {
    getPracticeResultsSessionResultsPracticeGet,
    getQualifyingResultsSessionResultsQualilikeGet,
    getRacelikeResultsSessionResultsRacelikeGet,
} from "~/client/generated"
import { WarningIcon } from "~/components/Icons/warning"
import { ResultsSection } from "~/features/session/results/components/ResultsSection"
import { ResultsSkeleton } from "~/features/session/results/components/skeleton"
import { ESessionType } from "~/features/session/results/components/types"
import type { IUniqueSession } from "~/features/session/types"

const client = ApiClient
export function headers() {
    return {
        "Cache-Control": "public, max-age=604800",
    }
}

export function ErrorBoundary() {
    return (
        <div className="flex flex-col items-center h-64 mt-5">
            <WarningIcon />
            <p>Unable to fetch the results of the current session</p>
        </div>
    )
}

export function loader(loaderArgs: Route.LoaderArgs) {
    const { year, round, session } = loaderArgs.params as IUniqueSession

    switch (session) {
        case "Practice 1":
        case "Practice 2":
        case "Practice 3":
            return {
                results: getPracticeResultsSessionResultsPracticeGet({
                    client,
                    throwOnError: true,
                    query: {
                        round: round || "",
                        type: session,
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
                        round,
                        year,
                        type: session,
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
                        round,
                        year,
                        type: session,
                    },
                }).then((response) => response.data),
                type: ESessionType.RACE,
            } as const
    }
}

export default function Results(props: Route.ComponentProps) {
    const { loaderData } = props
    return (
        <Suspense fallback={<ResultsSkeleton />}>
            <ResultsSection {...loaderData} />
        </Suspense>
    )
}
