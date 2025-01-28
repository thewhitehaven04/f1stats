import { ApiClient } from "~/client"
import {
    getSessionLapDriverTelemetrySeasonYearEventEventSessionSessionIdentifierLapLapDriverDriverTelemetryGet,
    getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost,
    getSessionTelemetrySeasonYearEventEventSessionSessionIdentifierTelemetryComparisonPost,
    type DriverTelemetryData,
    type SessionIdentifier,
} from "~/client/generated"
import { Suspense } from "react"
import { TelemetryLaptimeSection } from "~/features/session/telemetry/components/LaptimeSection"
import { TelemetryChartSection } from "~/features/session/telemetry/components/ChartSection"
import { getLapTelemetryQueryKey } from "~/features/session/laps/queries"
import { queryClient } from "~/config"
import { buildQueries } from "~/routes/Session/Telemetry/helpers"
import { TelemetryChartFallback } from "~/features/session/telemetry/components/ChartSection/fallback"
import { TimeDeltaComparison } from "~/features/session/telemetry/components/ChartSection/comparison"
import { Link } from "react-router"
import type { Route } from ".react-router/types/app/routes/Session/Telemetry/+types"
import type { IUniqueSession } from "~/features/session/types"
import type { IBreadcrumbProps } from "~/components/Breadcrumbs/types"
const client = ApiClient

export function headers() {
    return {
        "Cache-Control": "public, max-age=604800",
    }
}

export async function loader(args: Route.LoaderArgs) {
    const { year, event, session } = args.params as IUniqueSession
    const { request } = args
    const search = new URL(request.url).searchParams

    const queries = buildQueries(search)

    const laps = getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost({
        client,
        throwOnError: true,
        body: { queries },
        path: {
            event: event,
            session_identifier: session,
            year: year,
        },
    }).then((response) => response.data)

    return { laps }
}

export function ErrorBoundary() {
    return (
        <section>
            <h1>Error</h1>
            <span>Unable to fetch data</span>
        </section>
    )
}

export async function clientLoader(props: Route.ClientLoaderArgs) {
    const { request, serverLoader, params } = props
    const searchParams = new URL(request.url).searchParams

    const telemetry: Promise<DriverTelemetryData>[] = []
    // fetching on client as opposed to server because unless the user is using a direct link,
    // the data will be prefetched on the laps page. This steps would retrieve data from client-side cache
    for (const [driver, lapFilter] of searchParams.entries()) {
        telemetry.push(
            queryClient.fetchQuery({
                queryKey: getLapTelemetryQueryKey({
                    driver: driver,
                    lap: Number.parseInt(lapFilter),
                    session: params.session as SessionIdentifier,
                    event: params.event,
                    year: params.year,
                }),
                queryFn: async () =>
                    getSessionLapDriverTelemetrySeasonYearEventEventSessionSessionIdentifierLapLapDriverDriverTelemetryGet(
                        {
                            client,
                            throwOnError: true,
                            path: {
                                event: params.event,
                                session_identifier: params.session as SessionIdentifier,
                                year: params.year,
                                lap: lapFilter,
                                driver,
                            },
                        },
                    ).then((response) => response.data),
                staleTime: Number.POSITIVE_INFINITY,
            }),
        )
    }

    const telemetryComparison = getSessionTelemetrySeasonYearEventEventSessionSessionIdentifierTelemetryComparisonPost({
        client,
        throwOnError: true,
        path: {
            event: params.event,
            session_identifier: params.session as SessionIdentifier,
            year: params.year,
        },
        body: buildQueries(new URL(request.url).searchParams),
    }).then((response) => response.data)

    const { laps } = await serverLoader()
    return {
        telemetry: Promise.all(telemetry),
        laps,
        telemetryComparison,
    }
}

clientLoader.hydrate = true as const

export function HydrateFallback() {
    return (
        <div className="w-full h-64 flex flex-col justify-center items-center">
            <div className="loading-lg loading-spinner" />
        </div>
    )
}

export const handle = {
    breadcrumb: (props: IBreadcrumbProps) =>
        props.active ? <Link to={props.base}>Telemetry</Link> : <span>Telemetry</span>,
}

export default function Telemetry(props: Route.ComponentProps) {
    const { loaderData } = props

    return (
        <>
            <Suspense fallback={<div className="loading loading-spinner" />}>
                <TelemetryLaptimeSection laps={loaderData.laps} />
            </Suspense>
            <Suspense fallback={<TelemetryChartFallback />}>
                <TelemetryChartSection telemetry={loaderData.telemetry} />
            </Suspense>
            <Suspense fallback={<TelemetryChartFallback />}>
                <TimeDeltaComparison comparison={loaderData.telemetryComparison} />
            </Suspense>
        </>
    )
}
