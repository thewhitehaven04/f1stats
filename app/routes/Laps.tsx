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

export async function loader(loaderArgs: Route.LoaderArgs) {
    const { params, request } = loaderArgs
    const drivers = new URL(request.url).searchParams.getAll("drivers")

    if (!drivers) {
        throw new Error("No drivers specified")
    }

    return {
        laps: getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost({
            client,
            throwOnError: true,
            body: {
                drivers: drivers,
            },
            path: {
                event: params.event,
                session_identifier: params.session as SessionIdentifier,
                year: Number.parseInt(params.year),
            },
        }).then((response) => {
            return response.data
        }),
    }
}

export default function LapsRoute(props: Route.ComponentProps) {
    const {
        loaderData: { laps },
    } = props
    return (
        <section className="w-full px-4">
            <Suspense fallback={<ResultsSkeleton />}>
                <LapComparisonTable responsePromise={laps} />
            </Suspense>
        </section>
    )
}
