import type { Route } from ".react-router/types/app/routes/+types/Laps"
import { Suspense } from "react"
import { ApiClient } from "~/client"
import {
    getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost,
    type SessionIdentifier,
} from "~/client/generated"
import { LapComparisonTable } from "~/features/session/laps/LapComparisonTable"
import { ResultsSkeleton } from "~/features/session/results/components/skeleton"

const client = ApiClient

export async function loader({ request, params }: Route.LoaderArgs) {
    const search = new URLSearchParams(request.url)
    const drivers = search.get("drivers")?.split(" ")

    if (!drivers || !params.year) {
        throw new Error("No drivers specified")
    }

    return getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost({
        client,
        throwOnError: true,
        body: {
            drivers,
        },
        path: {
            event: params.event,
            session_identifier: params.session as SessionIdentifier,
            year: Number.parseInt(params.year),
        },
    }).then((response) => response.data)
}

export default function LapsRoute({ loaderData }: Route.ComponentProps) {
    const driverLaps = loaderData

    return (
        <Suspense fallback={<ResultsSkeleton />}>
            <LapComparisonTable responsePromise={driverLaps} />
        </Suspense>
    )
}
