import type { ChartData } from "chart.js"
import { use, useMemo } from "react"
import { Chart, type ChartProps } from "react-chartjs-2"
import type { DriverTelemetryData } from "~/client/generated"
import { Chart as ChartJS } from "chart.js"
import LINE_CHART_IMPORTS from "app/features/session/telemetry/components/lineChartImports"

ChartJS.register(...LINE_CHART_IMPORTS)
export interface ITelemetryChartSectionProps {
    telemetry: Promise<DriverTelemetryData[]>
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

export function TelemetryChartSection({ telemetry }: ITelemetryChartSectionProps) {
    const telemetryData = use(telemetry)

    const labels = telemetryData[0].telemetry.Distance
    const max = telemetryData[0].telemetry.Distance[telemetryData[0].telemetry.Distance.length - 1]

    const options = useMemo(() => getOptions(max), [max])

    const speedDatasets: ChartData<"line">["datasets"] = useMemo(
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
