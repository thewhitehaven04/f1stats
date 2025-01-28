import type { Route } from ".react-router/types/app/routes/Session/Laps/+types"
import { useQueryClient } from "@tanstack/react-query"
import { Suspense, useCallback } from "react"
import { Link, useNavigate } from "react-router"
import { ApiClient } from "~/client"
import {
    getSessionLapDriverTelemetrySeasonYearEventEventSessionSessionIdentifierLapLapDriverDriverTelemetryGet,
    getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost,
    type SessionIdentifier,
} from "~/client/generated"
import type { IBreadcrumbProps } from "~/components/Breadcrumbs/types"
import { LapComparisonSection } from "~/features/session/laps/LapComparisonTable"
import { getLapTelemetryQueryKey } from "~/features/session/laps/queries"
import { ResultsSkeleton } from "~/features/session/results/components/skeleton"
import { buildTelemetryRoutes } from "~/features/session/telemetry/buildTelemetryRoute"

const client = ApiClient

export const handle = {
    breadcrumb: (props: IBreadcrumbProps) => (props.active ? <Link to={props.base}>Laps</Link> : <span>Laps</span>),
}

export async function loader(loaderArgs: Route.LoaderArgs) {
    const { params, request } = loaderArgs
    const drivers = new URL(request.url).searchParams.getAll("drivers")

    if (!drivers) {
        throw new Error("No drivers specified")
    }

    const laps = getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost({
        client,
        throwOnError: true,
        body: {
            queries: drivers.map((driver) => ({
                driver,
                lap_filter: null,
            })),
        },
        path: {
            event: params.event,
            session_identifier: params.session as SessionIdentifier,
            year: params.year,
        },
    }).then((response) => response.data)
    return { laps }
}

export default function LapsRoute(props: Route.ComponentProps) {
    const {
        loaderData: { laps },
        params,
    } = props
    const queryClient = useQueryClient()

    const navigate = useNavigate()

    const handleNavigateToViewTelemetry = (selection: Record<string, number[]>) => {
        navigate(buildTelemetryRoutes(params.year, params.event, params.session as SessionIdentifier, selection))
    }

    const prefetchTelemetry = useCallback(
        (driver: string, lap: number) => {
            queryClient.prefetchQuery({
                queryKey: getLapTelemetryQueryKey({
                    session: params.session as SessionIdentifier,
                    event: params.event,
                    year: params.year,
                    driver,
                    lap,
                }),
                queryFn: () =>
                    getSessionLapDriverTelemetrySeasonYearEventEventSessionSessionIdentifierLapLapDriverDriverTelemetryGet(
                        {
                            throwOnError: true,
                            client: ApiClient,
                            path: {
                                driver,
                                lap: lap.toString(),
                                ...params,
                                session_identifier: params.session as SessionIdentifier,
                            },
                        },
                    ).then((response) => response.data),
                staleTime: Number.POSITIVE_INFINITY,
            })
        },
        [queryClient, params],
    )

    return (
        <Suspense fallback={<ResultsSkeleton />}>
            <LapComparisonSection
                responsePromise={laps}
                onViewTelemetry={handleNavigateToViewTelemetry}
                onLapSelect={prefetchTelemetry}
            />
        </Suspense>
    )
}
