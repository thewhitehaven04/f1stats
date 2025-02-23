import { ApiClient } from "~/client"
import { Suspense } from "react"
import { TelemetryLaptimeSection } from "~/features/session/telemetry/components/LaptimeSection"
import { TelemetryChartSection } from "~/features/session/telemetry/components/ChartSection"
import { getLapTelemetryQueryKey } from "~/features/session/laps/queries"
import { queryClient } from "~/config"
import { buildQueries } from "~/core/queryHelper"
import { TelemetryChartFallback } from "~/features/session/telemetry/components/ChartSection/fallback"
import { TimeDeltaComparison } from "~/features/session/telemetry/components/ChartSection/comparison"
import { Link } from "react-router"
import type { IBreadcrumbProps } from "~/components/Breadcrumbs/types"
import { LaptimeSectionFallback } from "~/features/session/telemetry/components/fallback"
import {
    getTestingSessionLapDriverTelemetrySeasonYearTestingRoundRoundNumberDayDayLapLapDriverDriverTelemetryGet,
    getTestingSessionLapTelemetriesSeasonYearTestingRoundRoundNumberDayDayTelemetriesPost,
    getTestingSessionLaptimesSeasonYearTestingRoundRoundNumberDayDayLapsPost,
    getTestingSessionTelemetrySeasonYearTestingRoundRoundNumberDayDayTelemetryComparisonPost,
    type DriverTelemetryData,
    type SessionIdentifier,
} from "~/client/generated"
import type { Route } from ".react-router/types/app/routes/TestingSession/Results/+types/Telemetry"
const client = ApiClient

export async function loader(args: Route.LoaderArgs) {
    const { year, round, day } = args.params 
    const { request } = args
    const search = new URL(request.url).searchParams

    const queries = buildQueries(search)

    const laps = getTestingSessionLaptimesSeasonYearTestingRoundRoundNumberDayDayLapsPost({
        client,
        throwOnError: true,
        body: { queries },
        path: {
            round_number: round,
            day: Number.parseInt(day),
            year: year,
        },
    }).then((response) => response.data)

    const telemetry = getTestingSessionLapTelemetriesSeasonYearTestingRoundRoundNumberDayDayTelemetriesPost({
        client,
        throwOnError: true,
        path: {
            round_number: round,
            day: Number.parseInt(day),
            year: year,
        },
        body: queries,
    }).then((response) => response.data)

    const telemetryComparison =
        getTestingSessionTelemetrySeasonYearTestingRoundRoundNumberDayDayTelemetryComparisonPost({
            client,
            throwOnError: true,
            path: {
                round_number: round,
                day: Number.parseInt(day),
                year: year,
            },
            body: queries,
        }).then((response) => response.data)

    return { laps, telemetry, telemetryComparison }
}

export function ErrorBoundary() {
    return (
        <section>
            <h1>Error</h1>
            <span>Unable to fetch data</span>
        </section>
    )
}

export async function clientLoader(args: Route.ClientLoaderArgs) {
    const { request, params } = args
    const search = new URL(request.url).searchParams
    const queries = buildQueries(search)

    const telemetry: Promise<DriverTelemetryData>[] = []
    for (const [driver, lapFilter] of search.entries()) {
        telemetry.push(
            queryClient.ensureQueryData({
                queryKey: getLapTelemetryQueryKey({
                    driver: driver,
                    lap: lapFilter,
                    session: params.session as SessionIdentifier,
                    round: params.round,
                    year: params.year,
                }),
                queryFn: async () =>
                    getTestingSessionLapDriverTelemetrySeasonYearTestingRoundRoundNumberDayDayLapLapDriverDriverTelemetryGet(
                        {
                            client,
                            throwOnError: true,
                            path: {
                                round_number: params.round,
                                day: Number.parseInt(params.day),
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

    const path = {
        round_number: params.round,
        day: Number.parseInt(params.day),
        year: params.year,
    }
    const laps = getTestingSessionLaptimesSeasonYearTestingRoundRoundNumberDayDayLapsPost({
        client,
        throwOnError: true,
        body: { queries },
        path,
    }).then((response) => response.data)

    const telemetryComparison =
        getTestingSessionTelemetrySeasonYearTestingRoundRoundNumberDayDayTelemetryComparisonPost({
            client,
            throwOnError: true,
            path,
            body: queries,
        }).then((response) => response.data)

    return {
        telemetry: Promise.all(telemetry),
        laps,
        telemetryComparison,
    }
}

export function HydrateFallback() {
    return (
        <div className="w-full h-64 flex flex-col justify-center items-center">
            <div className="loading-lg loading-spinner" />
        </div>
    )
}

export const handle = {
    breadcrumb: (props: IBreadcrumbProps) => (
        <li>
            {props.active ? (
                <Link to={props.base} viewTransition>
                    Telemetry
                </Link>
            ) : (
                <span>Telemetry</span>
            )}
        </li>
    ),
}

export default function Telemetry(props: Route.ComponentProps) {
    const { loaderData } = props
    return (
        <>
            <Suspense fallback={<LaptimeSectionFallback />}>
                <TelemetryLaptimeSection laps={loaderData.laps} />
            </Suspense>
            <Suspense fallback={<TelemetryChartFallback height={90} sectionTitle="Speed trace" />}>
                <TelemetryChartSection telemetry={loaderData.telemetry} />
            </Suspense>
            <Suspense fallback={<TelemetryChartFallback height={70} sectionTitle="Time delta" />}>
                <TimeDeltaComparison comparison={loaderData.telemetryComparison} />
            </Suspense>
        </>
    )
}
