import type { Route } from ".react-router/types/app/routes/+types/Telemetry"
import { ApiClient } from "~/client"
import {
    getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost,
    getSessionTelemetryInterpolatedSeasonYearEventEventSessionSessionIdentifierTelemetryInterpolatedPost,
    type SessionIdentifier,
} from "~/client/generated"
import { TelemetryChartSection } from "~/features/session/telemetry/components/ChartSection"
import { Suspense, use } from "react"
import { formatLaptime } from "~/features/session/results/components/helpers"

const client = ApiClient

export async function loader(loaderArgs: Route.LoaderArgs) {
    const { year, event, session } = loaderArgs.params as { year: string; event: string; session: string }
    const { request } = loaderArgs

    const search = new URL(request.url).searchParams

    const queries = Array.from(search.keys()).map((driver) => ({
        driver,
        lap_filter: search.getAll(driver).map((lap) => Number.parseInt(lap)),
    }))

    const laps = getSessionLaptimesSeasonYearEventEventSessionSessionIdentifierLapsPost({
        client,
        throwOnError: true,
        body: {
            queries: queries,
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
    const { loaderData } = props
    const { telemetry, laps } = loaderData

    const lapData = use(laps)

    return (
        <>
            <Suspense fallback={<div className="loading loading-spinner" />}>
                <section>
                    <h2 className="divider divider-start text-lg">Lap comparison</h2>
                    {lapData.map(({ driver, data: laps }) => (
                        <div key={driver} className="card">
                            <h3 className="card-title">Laps by {driver}</h3>
                            {laps.map((lap) => (
                                <div key={lap.LapTime}>{formatLaptime(lap.LapTime as number)}</div>
                            ))}
                        </div>
                    ))}
                </section>
            </Suspense>
            <Suspense fallback={<div className="loading loading-spinner" />}>
                <TelemetryChartSection telemetry={telemetry} />
            </Suspense>
        </>
    )
}
