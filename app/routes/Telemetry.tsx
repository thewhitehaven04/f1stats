import type { Route } from ".react-router/types/app/routes/+types/Telemetry"
import { ApiClient } from "~/client"
import {
    getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost,
    getSessionTelemetryInterpolatedSeasonYearEventEventSessionSessionIdentifierTelemetryInterpolatedPost,
    type SessionIdentifier,
    type TelemetryRequest,
} from "~/client/generated"
import { Suspense } from "react"
import { TelemetryLaptimeSection } from '~/features/session/telemetry/components/LaptimeSection'
import { TelemetryChartSection } from '~/features/session/telemetry/components/ChartSection'
const client = ApiClient

export async function loader(loaderArgs: Route.LoaderArgs) {
    const { year, event, session } = loaderArgs.params as { year: string; event: string; session: string }
    const { request } = loaderArgs

    const search = new URL(request.url).searchParams

    const queries: TelemetryRequest[] = []
    for (const [driver, lap] of search.entries()) {
        const exisitingQuery = queries.find((query) => query.driver === driver)
        if (exisitingQuery) {
            exisitingQuery.lap_filter?.push(Number.parseInt(lap))
        } else {
            queries.push({
                driver,
                lap_filter: [Number.parseInt(lap)],
            })
        }
    }
    const laps = getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost({
        client,
        throwOnError: true,
        body: {
            queries,
        },
        path: {
            event: event,
            session_identifier: session as SessionIdentifier,
            year: Number.parseInt(year),
        },
    }).then((response) => response.data)

    const telemetry =
        getSessionTelemetryInterpolatedSeasonYearEventEventSessionSessionIdentifierTelemetryInterpolatedPost({
            client,
            throwOnError: true,
            path: {
                event,
                session_identifier: session as SessionIdentifier,
                year: Number.parseInt(year),
            },
            body: queries,
        }).then((response) => response.data)

    return { telemetry, laps }
}

export default function Telemetry(props: Route.ComponentProps) {
    const { telemetry, laps } = props.loaderData
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
