import type { Route } from ".react-router/types/app/routes/+types/Telemetry"
import { ApiClient } from "~/client"
import {
    getSessionLapDriverTelemetrySeasonYearEventEventSessionSessionIdentifierLapLapDriverDriverTelemetryGet,
    getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost,
    getSessionTelemetryInterpolatedSeasonYearEventEventSessionSessionIdentifierTelemetryInterpolatedPost,
    type SessionIdentifier,
    type TelemetryRequest,
} from "~/client/generated"
import { Suspense } from "react"
import { TelemetryLaptimeSection } from "~/features/session/telemetry/components/LaptimeSection"
import { TelemetryChartSection } from "~/features/session/telemetry/components/ChartSection"
import { buildQueries } from "~/routes/Telemetry/helpers"
import { getLapTelemetryQueryKey } from "~/features/session/laps/queries"
import { useQueries, useSuspenseQueries } from "@tanstack/react-query"
import { useParams, useSearchParams } from "react-router"
const client = ApiClient

export async function loader(loaderArgs: Route.LoaderArgs) {
    const { year, event, session } = loaderArgs.params as { year: string; event: string; session: string }
    const { request } = loaderArgs
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
    }).then((response) => response.data)

    return { laps }
}

export default function Telemetry(props: Route.ComponentProps) {
    const { laps } = props.loaderData
    const [search] = useSearchParams()
    const params = useParams<{ year: string; event: string; session: string }>()

    const queries = buildQueries(search)

    // fetching on client as opposed to server because unless the user is using a direct link,
    // the data will be prefetched on the laps page. This steps would retrieve data from client-side cache
    const telemetryQueries = useQueries({
        queries: queries.map((query) => ({
            queryKey: getLapTelemetryQueryKey({
                driver: query.driver,
                lap: query.lap_filter[0],
                session: params.session as SessionIdentifier,
                event: params.event || "",
                year: params.year || "",
            }),
            queryFn: () =>
                getSessionLapDriverTelemetrySeasonYearEventEventSessionSessionIdentifierLapLapDriverDriverTelemetryGet({
                    client,
                    throwOnError: true,
                    path: {
                        event: params.event || "",
                        session_identifier: params.session as SessionIdentifier,
                        year: params.year || "",
                        lap: query.lap_filter[0].toString(),
                        driver: query.driver,
                    },
                }).then((response) => response.data),
        })),
        combine: (result) => ({
            data: result.filter((res) => res.status === "success").map((res) => res.data),
            isPending: result.some((res) => res.status === "pending"),
        }),
    })

    return (
        <>
            <Suspense fallback={<div className="loading loading-spinner" />}>
                <TelemetryLaptimeSection laps={laps} />
            </Suspense>
            {!telemetryQueries.isPending && <TelemetryChartSection telemetry={telemetryQueries.data} />}
        </>
    )
}
