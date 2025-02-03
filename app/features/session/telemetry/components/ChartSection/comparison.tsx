import type { ChartData } from "chart.js"
import { use, useMemo } from "react"
import type { TelemetryComparison } from "~/client/generated"
import { Chart } from "react-chartjs-2"
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
import { getTimeDeltaOptions } from "~/features/session/telemetry/components/ChartSection/config"

ChartJS.register([LineController, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title])

export interface ITelemetryComparisonProps {
    comparison: Promise<TelemetryComparison>
}

export function TimeDeltaComparison(props: ITelemetryComparisonProps) {
    const { comparison: comparisonPromise } = props
    const comparison = use(comparisonPromise)
    const max = comparison.telemetries[0].comparison.Distance.at(-1) || 0

    const timeDeltaOptions = useMemo(() => getTimeDeltaOptions({ trackLength: max }), [max])
    const labels = comparison.telemetries[0].comparison.Distance

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
        <section>
            <h2 className="divider divider-start text-lg">Time delta</h2>
            <Chart
                type="line"
                height={100}
                data={{ labels, datasets: timeDeltaDatasets }}
                options={timeDeltaOptions}
                plugins={[Legend, Tooltip, Title]}
            />
        </section>
    )
}
