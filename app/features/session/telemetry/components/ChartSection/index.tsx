import type { ChartData } from "chart.js"
import { use, useMemo } from "react"
import { Chart } from "react-chartjs-2"
import type { DriverTelemetryData, TelemetryComparison } from "~/client/generated"
import { Chart as ChartJS, Legend, Title, Tooltip } from "chart.js"
import LINE_CHART_IMPORTS from "./lineChartImports"
import { getOptions, getSpeedTraceOptions, getTimeDeltaOptions } from "~/features/session/telemetry/components/ChartSection/config"

ChartJS.register(...LINE_CHART_IMPORTS)
export interface ITelemetryChartSectionProps {
    telemetry: Promise<DriverTelemetryData[]>
    comparison: Promise<TelemetryComparison>
}

export function TelemetryChartSection(props: ITelemetryChartSectionProps) {
    const telemetry = use(props.telemetry)
    const comparison = use(props.comparison)

    const labels = telemetry[0].telemetry.Distance
    const max = telemetry[0].telemetry.Distance.at(-1) || 0

    const options = useMemo(() => getOptions({ trackLength: max }), [max])
    const speedTraceOptions = useMemo(() => getSpeedTraceOptions({ trackLength: max }), [max])
    const timeDeltaOptions = useMemo(() => getTimeDeltaOptions({ trackLength: max }), [max])

    const speedDatasets: ChartData<"line">["datasets"] = useMemo(
        () =>
            telemetry.map((lap) => ({
                label: lap.driver,
                data: lap.telemetry.Distance.map((distance, index) => ({
                    x: distance,
                    y: lap.telemetry.Speed[index],
                })),
                borderColor: lap.color,
            })),
        [telemetry],
    )

    const rpmDatasets: ChartData<"line">["datasets"] = useMemo(
        () =>
            telemetry.map((lap) => ({
                label: lap.driver,
                data: lap.telemetry.Distance.map((distance, index) => ({
                    x: distance,
                    y: lap.telemetry.RPM[index],
                })),
                borderColor: lap.color,
            })),
        [telemetry],
    )

    const throttleDatasets: ChartData<"line">["datasets"] = useMemo(
        () =>
            telemetry.map((lap) => ({
                label: lap.driver,
                data: lap.telemetry.Distance.map((distance, index) => ({
                    x: distance,
                    y: lap.telemetry.Throttle[index],
                })),
                borderColor: lap.color,
            })),
        [telemetry],
    )

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
                <h2 className="divider divider-start text-lg">Speed trace</h2>
                <Chart
                    type="line"
                    data={{
                        labels,
                        datasets: speedDatasets,
                    }}
                    options={speedTraceOptions}
                    height={150}
                    plugins={[Legend, Tooltip]}
                />
            </section>
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
                    plugins={[Legend, Tooltip, Title]}
                />
            </section>
            <section>
                <h2 className="divider divider-start text-lg">Throttle application</h2>
                <Chart
                    type="line"
                    data={{ labels, datasets: throttleDatasets }}
                    options={options}
                    height={60}
                    plugins={[Legend, Tooltip, Title]}
                />
            </section>
        </>
    )
}
