import type { ChartData } from "chart.js"
import { use, useMemo } from "react"
import { Chart } from "react-chartjs-2"
import type { DriverTelemetryData } from "~/client/generated"
import { Chart as ChartJS, Legend, Tooltip } from "chart.js"
import LINE_CHART_IMPORTS from "./lineChartImports"
import { getOptions, getSpeedTraceOptions } from "~/features/session/telemetry/components/ChartSection/config"

ChartJS.register(...LINE_CHART_IMPORTS)
export interface ITelemetryChartSectionProps {
    telemetry: Promise<DriverTelemetryData[]>
}

export function TelemetryChartSection(props: ITelemetryChartSectionProps) {
    const telemetryData = use(props.telemetry)

    const labels = telemetryData[0].telemetry.Distance
    const max = telemetryData[0].telemetry.Distance[telemetryData[0].telemetry.Distance.length - 1]

    const options = useMemo(() => getOptions({ trackLength: max }), [max])
    const speedTraceOptions = useMemo(() => getSpeedTraceOptions({ trackLength: max }), [max])

    const speedDatasets: ChartData<"scatter">["datasets"] = useMemo(
        () =>
            telemetryData.map(({ telemetry, driver: label, color }) => ({
                label: label,
                data: telemetry.Distance.map((distance, index) => ({
                    x: distance,
                    y: telemetry.Speed[index],
                })),
                borderColor: color,
            })),
        [telemetryData],
    )

    const rpmDatasets: ChartData<"line">["datasets"] = useMemo(
        () =>
            telemetryData.map(({ telemetry, driver: label, color }) => ({
                label,
                data: telemetry.Distance.map((distance, index) => ({
                    x: distance,
                    y: telemetry.RPM[index],
                })),
                borderColor: color,
            })),
        [telemetryData],
    )

    const throttleDatasets: ChartData<"line">["datasets"] = useMemo(
        () =>
            telemetryData.map(({ telemetry, driver: label, color }) => ({
                label,
                data: telemetry.Distance.map((distance, index) => ({
                    x: distance,
                    y: telemetry.Throttle[index],
                })),
                borderColor: color,
            })),
        [telemetryData],
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
                    options={speedTraceOptions}
                    height={280}
                    plugins={[Legend, Tooltip]}
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
