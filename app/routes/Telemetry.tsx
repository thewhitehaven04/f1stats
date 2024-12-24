import type { Route } from ".react-router/types/app/routes/+types/Telemetry"
import { ApiClient } from "~/client"
import {
    getSessionTelemetryInterpolatedSeasonYearEventEventSessionSessionIdentifierTelemetryInterpolatedPost,
    type SessionIdentifier,
} from "~/client/generated"
import { Chart } from "react-chartjs-2"
import { Chart as ChartJS, type ChartData } from "chart.js"
import { useCallback, useMemo } from "react"
import LINE_CHART_IMPORTS from "./../features/session/telemetry/components/lineChartImports"
import type { BaseChartComponent, ChartProps } from "node_modules/react-chartjs-2/dist/types"

ChartJS.register(...LINE_CHART_IMPORTS)

const client = ApiClient

export async function loader(loaderArgs: Route.LoaderArgs) {
    const { year, event, session } = loaderArgs.params as { year: string; event: string; session: string }
    const { request } = loaderArgs

    const search = new URL(request.url).searchParams

    const body = Array.from(search.keys()).map((driver) => ({
        driver,
        laps: search.getAll(driver).map((lap) => Number.parseInt(lap)),
    }))

    const telemetry =
        await getSessionTelemetryInterpolatedSeasonYearEventEventSessionSessionIdentifierTelemetryInterpolatedPost({
            client,
            throwOnError: true,
            path: {
                event,
                session_identifier: session as SessionIdentifier,
                year: Number.parseInt(year),
            },
            body,
        }).then((response) => response.data)

    return telemetry
}

const getOptions = (domainMax: number): ChartProps<"scatter" | "line">["options"] => ({
    plugins: {
        legend: {
            title: {
                text: "Driver",
            },
            fullSize: true,
        },
    },
    elements: {
        point: {
            radius: 1,
        },
    },
    showLine: true,
    scales: {
        x: {
            type: "linear",
            max: domainMax,
        },
    },
})

export default function Telemetry(props: Route.ComponentProps) {
    const { loaderData: lapTelemetries } = props
    const labels = lapTelemetries[0].telemetry.Distance
    const max = lapTelemetries[0].telemetry.Distance[lapTelemetries[0].telemetry.Distance.length - 1]

    const options = useMemo(() => getOptions(max), [max])

    const speedDatasets: ChartData<"line">["datasets"] = useMemo(
        () =>
            lapTelemetries.map(({ telemetry, driver: label, color }) => ({
                label: label,
                data: telemetry.Distance.map((distance, index) => ({
                    x: distance,
                    y: telemetry.Speed[index],
                })),
                borderColor: color,
            })),
        [lapTelemetries],
    )

    const rpmDatasets: ChartData<"line">["datasets"] = useMemo(
        () =>
            lapTelemetries.map(({ telemetry, driver: label, color }) => ({
                label,
                data: telemetry.Distance.map((distance, index) => ({
                    x: distance,
                    y: telemetry.RPM[index],
                })),
                borderColor: color,
            })),
        [lapTelemetries],
    )

    const throttleDatasets: ChartData<"line">["datasets"] = useMemo(
        () =>
            lapTelemetries.map(({ telemetry, driver: label, color }) => ({
                label,
                data: telemetry.Distance.map((distance, index) => ({
                    x: distance,
                    y: telemetry.Throttle[index],
                })),
                borderColor: color,
            })),
        [lapTelemetries],
    )
    return (
        <>
            <section>
                <h2 className="divider divider-start text-lg">Speed trace</h2>
                <Chart
                    type="scatter"
                    data={{
                        labels,
                        datasets: speedDatasets,
                    }}
                    options={options}
                    height={240}
                />
            </section>
            <section>
                <h2 className="divider divider-start text-lg">RPM</h2>
                <Chart
                    type="line"
                    data={{
                        labels,
                        datasets: rpmDatasets,
                    }}
                    options={options}
                    height={60}
                />
            </section>
            <section>
                <h2 className="divider divider-start text-lg">Throttle application</h2>
                <Chart type="line" data={{ labels, datasets: throttleDatasets }} options={options} height={60} />
            </section>
        </>
    )
}
