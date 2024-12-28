import type { Route } from ".react-router/types/app/routes/+types/Laps"
import { Suspense } from "react"
import { useNavigate } from "react-router"
import { ApiClient } from "~/client"
import {
    getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost,
    getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet,
    type SessionIdentifier,
} from "~/client/generated"
import { LapComparisonSection } from "~/features/session/laps/LapComparisonTable"
import { ResultsSkeleton } from "~/features/session/results/components/skeleton"
import { SessionSummaryCard } from "~/features/session/summary"
import { SummarySkeleton } from "~/features/session/summary/skeleton"
import { buildTelemetryRoutes } from "~/features/session/telemetry/buildTelemetryRoute"

const client = ApiClient

export async function loader(loaderArgs: Route.LoaderArgs) {
    const { params, request } = loaderArgs
    const drivers = new URL(request.url).searchParams.getAll("drivers")

    if (!drivers) {
        throw new Error("No drivers specified")
    }

    const summary = getSessionSummarySeasonYearEventEventNameSessionSessionIdentifierSummaryGet({
        client,
        throwOnError: true,
        path: {
            event_name: params.event,
            session_identifier: params.session as SessionIdentifier,
            year: Number.parseInt(params.year),
        },
    }).then((response) => response.data)

    const laps = getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost({
        client,
        throwOnError: true,
        body: {
            queries: drivers.map((driver) => ({
                driver,
                lapFilter: null,
            })),
        },
        path: {
            event: params.event,
            session_identifier: params.session as SessionIdentifier,
            year: Number.parseInt(params.year),
        },
    }).then((response) => response.data)
    return { summary, laps }
}

export default function LapsRoute(props: Route.ComponentProps) {
    const {
        loaderData: { laps, summary },
        params,
    } = props

    const navigate = useNavigate()

    const handleNavigateToViewTelemetry = (selection: Record<string, number[]>) => {
        navigate(buildTelemetryRoutes(params.year, params.event, params.session as SessionIdentifier, selection))
    }

    return (
        <>
            <Suspense fallback={<SummarySkeleton />}>
                <SessionSummaryCard summary={summary} />
            </Suspense>
            <Suspense fallback={<ResultsSkeleton />}>
                <LapComparisonSection responsePromise={laps} onViewTelemetry={handleNavigateToViewTelemetry} />
            </Suspense>
        </>
    )
}
