import { ApiClient } from "~/client"
import {
    getSessionLapDriverTelemetrySeasonYearEventEventSessionSessionIdentifierLapLapDriverDriverTelemetryGet,
    getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost,
    type DriverTelemetryData,
    type SessionIdentifier,
} from "~/client/generated"
import { Suspense } from "react"
import { TelemetryLaptimeSection } from "~/features/session/telemetry/components/LaptimeSection"
import { TelemetryChartSection } from "~/features/session/telemetry/components/ChartSection"
import { getLapTelemetryQueryKey } from "~/features/session/laps/queries"
import { queryClient } from "~/config"
import { buildQueries } from "~/routes/Telemetry/helpers"
import type { Route } from ".react-router/types/app/routes/Telemetry/+types"
import { TelemetryChartFallback } from "~/features/session/telemetry/components/ChartSection/fallback"
const client = ApiClient

export async function loader(args: Route.LoaderArgs) {
    const { year, event, session } = args.params as { year: string; event: string; session: string }
    const { request } = args
    const search = new URL(request.url).searchParams

    const laps = getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost({
        client,
        throwOnError: true,
        body: {
            queries: buildQueries(search),
        },
        path: {
            event: event,
            session_identifier: session as SessionIdentifier,
            year: year,
        },
    })
        .then((response) => response.data)
        .then((data) =>
            data.toSorted((driverA, driverB) => (driverA.data[0].LapTime || 0) - (driverB.data[0].LapTime || 0)),
        )

    return laps
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
                    event: params.event || "",
                    year: params.year || "",
                }),
                queryFn: async () =>
                    getSessionLapDriverTelemetrySeasonYearEventEventSessionSessionIdentifierLapLapDriverDriverTelemetryGet(
                        {
                            client,
                            throwOnError: true,
                            path: {
                                event: params.event || "",
                                session_identifier: params.session as SessionIdentifier,
                                year: params.year || "",
                                lap: lapFilter,
                                driver,
                            },
                        },
                    ).then((response) => response.data),
                staleTime: Number.POSITIVE_INFINITY,
            }),
        )
    }

    return {
        telemetry: Promise.all(telemetry),
        laps: serverLoader(),
    }
}

clientLoader.hydrate = true as const

export function HydrateFallback() {
    return <div className="loading loading-spinner" />
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
        </>
    )
}
