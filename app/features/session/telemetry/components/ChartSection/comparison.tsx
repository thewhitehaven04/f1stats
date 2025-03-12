import type { ChartData } from "chart.js"
import { use, useMemo } from "react"
import type { TelemetryComparison } from "~/client/generated"
import { Chart, type ChartProps } from "react-chartjs-2"
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
import { BASE_CHART_OPTIONS } from "~/features/session/telemetry/components/ChartSection/config"
import { CircuitMap } from "~/features/session/telemetry/components/CircuitMap"

ChartJS.register([LineController, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title])

export function TimeDeltaComparison(props: { comparison: Promise<TelemetryComparison> }) {
    const { comparison: comparisonPromise } = props
    const comparison = use(comparisonPromise)
    const max = comparison.telemetries[0].comparison.Distance.at(-1) || 0

    const labels = comparison.telemetries[0].comparison.Distance
    const options = {
        ...BASE_CHART_OPTIONS,
        scales: {
            x: {
                type: "linear",
                max: max,
                min: 0,
            },
            y: {
                type: "linear",
                title: {
                    text: "Gap (s)",
                    display: true,
                    font: {
                        size: 14,
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                title: {
                    font: {
                        size: 14,
                    },
                },
                fullSize: true,
            },
            tooltip: {
                enabled: true,
                includeInvisible: false,
                axis: "x",
                mode: "x",
            },
        },
    } satisfies ChartProps<"line">["options"]

    const timeDeltaDatasets: ChartData<"line">["datasets"] = useMemo(
        () =>
            comparison.telemetries.map((comp) => ({
                label: `${comp.driver} vs ${comparison.reference}`,
                borderColor: comp.color,
                data: comp.comparison.Distance.map((distance, index) => ({
                    x: distance,
                    y: comp.comparison.Gap[index],
                })),
            })),
        [comparison],
    )

    return (
        <>
            <section>
                <h2 className="divider divider-start text-lg">Time delta</h2>
                <Chart type="line" height={100} data={{ labels, datasets: timeDeltaDatasets }} options={options} />
            </section>
            <section>
                <h2 className="divider divider-start text-lg">Track map</h2>
                <CircuitMap comparison={comparison} />
            </section>
        </>
    )
}
