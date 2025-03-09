import type { Route } from ".react-router/types/app/routes/TestingSession/Results/+types"
import { Suspense } from "react"
import { ApiClient } from "~/client"
import { getTestingResultsSessionResultsTestingGet } from "~/client/generated"
import { WarningIcon } from "~/components/Icons/warning"
import { ResultsSection } from "~/features/session/results/components/ResultsSection"
import { ResultsSkeleton } from "~/features/session/results/components/skeleton"
import { ESessionType } from "~/features/session/results/components/types"

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

export async function loader(loaderArgs: Route.LoaderArgs) {
    const { year, round, day } = loaderArgs.params

    const data = getTestingResultsSessionResultsTestingGet({
        client,
        throwOnError: true,
        query: {
            round: round || "",
            day: Number.parseInt(day),
            year,
        },
    }).then((response) => response.data)
    return { laps: data }
}

export default function Results(props: Route.ComponentProps) {
    const { loaderData } = props
    return (
        <Suspense fallback={<ResultsSkeleton />}>
            <ResultsSection results={loaderData.laps} type={ESessionType.PRACTICE} />
        </Suspense>
    )
}
