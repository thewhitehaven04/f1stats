import type { ChartData } from "chart.js"
import { use, useMemo, type ReactNode } from "react"
import { Chart, type ChartProps } from "react-chartjs-2"
import type { DriverTelemetryData } from "~/client/generated"
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js"
import { BASE_CHART_OPTIONS, getSpeedTraceOptions } from "~/features/session/telemetry/components/ChartSection/config"
import { getAlternativeColor } from "~/core/charts/getAlternativeColor"
import zoom from 'chartjs-plugin-zoom'

ChartJS.register([LineController, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title, zoom])

export function TelemetryChartSection(props: {
    telemetry: Promise<DriverTelemetryData[]>
    telemetryComparisonSlot: ReactNode
}) {
    const telemetry = use(props.telemetry)
    const labels = telemetry[0].telemetry.Distance
    const hiDistance = telemetry[0].telemetry.Distance.at(-1) || 0

    const speedTraceOptions = useMemo(() => getSpeedTraceOptions({ trackLength: hiDistance }), [hiDistance])

    const chartOptions = {
        ...BASE_CHART_OPTIONS,
        showLine: true,
        scales: {
            x: {
                type: "linear",
                min: 0,
                max: hiDistance,
            },
        },
        interaction: {
            mode: "x",
            intersect: false,
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                includeInvisible: false,
                axis: "x",
                mode: "nearest",
            },
            zoom: {
                limits: {
                    x: {
                        min: 0,
                        max: hiDistance,
                    },
                },
                zoom: {
                    drag: {
                        enabled: true,
                    },
                    mode: "x",
                    wheel: {
                        enabled: true,
                    },
                },
            },
        },
    } satisfies ChartProps<"line">["options"]

    const presets = useMemo(() => {
        return telemetry.map((lap) => ({
            borderWidth: lap.alternative_style ? 2.5 : 2,
            borderColor: lap.alternative_style ? getAlternativeColor(lap.color) : lap.color,
            borderDash: lap.alternative_style ? [6, 1.5] : undefined,
        }))
    }, [telemetry])

    const speedDatasets: ChartData<"line">["datasets"] = useMemo(
        () =>
            telemetry.map((lap, index) => ({
                label: lap.driver,
                data: lap.telemetry.Distance.map((distance, index) => ({
                    x: distance,
                    y: lap.telemetry.Speed[index],
                })),
                ...presets[index],
            })),
        [telemetry, presets],
    )

    const rpmDatasets: ChartData<"line">["datasets"] = useMemo(
        () =>
            telemetry.map((lap, index) => ({
                label: lap.driver,
                data: lap.telemetry.Distance.map((distance, index) => ({
                    x: distance,
                    y: lap.telemetry.RPM[index],
                })),
                ...presets[index],
            })),
        [telemetry, presets],
    )

    const throttleDatasets: ChartData<"line">["datasets"] = useMemo(
        () =>
            telemetry.map((lap, index) => ({
                label: lap.driver,
                data: lap.telemetry.Distance.map((distance, index) => ({
                    x: distance,
                    y: lap.telemetry.Throttle[index],
                })),
                ...presets[index],
            })),
        [telemetry, presets],
    )

    const brakeDatasets: ChartData<"line">["datasets"] = useMemo(
        () =>
            telemetry.map((lap, index) => ({
                label: lap.driver,
                data: lap.telemetry.Distance.map((distance, index) => ({
                    x: distance,
                    y: lap.telemetry.Brake[index] ? 1 : 0,
                })),
                ...presets[index],
            })),
        [telemetry, presets],
    )

    return (
        <>
            <section>
                <h2 className="divider divider-start text-lg">Speed trace</h2>
                <Chart
                    type="line"
                    data={{
                        labels,
                        datasets: speedDatasets,
                    }}
                    options={speedTraceOptions}
                    height={120}
                />
            </section>
            {props.telemetryComparisonSlot}
            <section>
                <h2 className="divider divider-start text-lg">RPM</h2>
                <Chart
                    type="line"
                    data={{
                        labels,
                        datasets: rpmDatasets,
                    }}
                    options={chartOptions}
                    height={30}
                />
            </section>
            <section>
                <h2 className="divider divider-start text-lg">Throttle application</h2>
                <Chart type="line" data={{ labels, datasets: throttleDatasets }} options={chartOptions} height={25} />
            </section>
            <section>
                <h2 className="divider divider-start text-lg">Brake application</h2>
                <Chart type="line" data={{ labels, datasets: brakeDatasets }} options={chartOptions} height={25} />
            </section>
        </>
    )
}
