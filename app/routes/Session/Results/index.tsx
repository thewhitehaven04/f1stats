import type { Route } from ".react-router/types/app/routes/Session/Results/+types"
import { Suspense } from "react"
import { ApiClient } from "~/client"
import {
    getPracticeResultsSessionResultsPracticeGet,
    getQualifyingResultsSessionResultsQualilikeGet,
    getRacelikeResultsSessionResultsRacelikeGet,
} from "~/client/generated"
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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-16"
            >
                <title>Error</title>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
            </svg>
            <p>Unable to fetch the results of the current session.</p>
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
