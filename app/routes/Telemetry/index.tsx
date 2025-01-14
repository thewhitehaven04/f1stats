import type { Route } from ".react-router/types/app/routes/+types/Telemetry"
import { ApiClient } from "~/client"
import {
    getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost,
    getSessionTelemetryInterpolatedSeasonYearEventEventSessionSessionIdentifierTelemetryInterpolatedPost,
    type SessionIdentifier,
    type TelemetryRequest,
} from "~/client/generated"
import { Suspense } from "react"
import { TelemetryLaptimeSection } from "~/features/session/telemetry/components/LaptimeSection"
import { TelemetryChartSection } from "~/features/session/telemetry/components/ChartSection"
import { buildQueries } from "~/routes/Telemetry/helpers"
import { queryClient } from "~/root"
import { getLapTelemetryQueryKey } from "~/features/session/laps/queries"
import { useQueries } from "@tanstack/react-query"
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

// export async function clientLoader(loaderArgs: Route.ClientLoaderArgs) {
//     const { serverLoader, request, params } = loaderArgs
//     const { year, event, session } = params as { year: string; event: string; session: string }
//     const search = new URL(request.url).searchParams

//     const { laps } = await serverLoader()
//     const queries = buildQueries(search)

//     const cached = queryClient.getQueriesData({
//         queryKey: queries.map((query) =>
//             getLapTelemetryQueryKey({
//                 driver: query.driver,
//                 lap: query.lap_filter[0],
//                 session: session as SessionIdentifier,
//                 event: event,
//                 year: year,
//             }),
//         ),
//     })

//     const uncached = queries.filter((query) =>
//         cached.find(([key]) => query.driver === key[4] && query.lap_filter[0] === key[5]),
//     )

//     const unfetchedQueries = uncached.map((query) =>
//         queryClient.fetchQuery({
//             queryKey: getLapTelemetryQueryKey({
//                 driver: query.driver,
//                 lap: query.lap_filter[0],
//                 session: session as SessionIdentifier,
//                 event: event,
//                 year: year,
//             }),
//             queryFn: () =>
//                 getSessionTelemetryInterpolatedSeasonYearEventEventSessionSessionIdentifierTelemetryInterpolatedPost({
//                     client,
//                     throwOnError: true,
//                     path: {
//                         event,
//                         session_identifier: session as SessionIdentifier,
//                         year: year,
//                     },
//                     body: buildQueries(search),
//                 }).then((response) => response.data),
//         }),
//     )

//     const telemetry = []
//     for (const query of cached) {
//         telemetry.push(query[1])
//     }

//     for (const query of unfetchedQueries) {
//         telemetry.push(query)
//     }

//     return { laps, telemetry }
// }

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
                getSessionTelemetryInterpolatedSeasonYearEventEventSessionSessionIdentifierTelemetryInterpolatedPost({
                    client,
                    throwOnError: true,
                    path: {
                        event: params.event || "",
                        session_identifier: params.session as SessionIdentifier,
                        year: params.year || "",
                    },
                    body: queries,
                }).then((response) => response.data),
        })),
    })
    const telemetry = telemetryQueries.filter((query) => !!query.data).map((query) => query.data)

    return (
        <>
            <Suspense fallback={<div className="loading loading-spinner" />}>
                <TelemetryLaptimeSection laps={laps} />
            </Suspense>
            <Suspense fallback={<div className="loading loading-spinner" />}>
                <TelemetryChartSection telemetry={telemetry} />
            </Suspense>
        </>
    )
}
