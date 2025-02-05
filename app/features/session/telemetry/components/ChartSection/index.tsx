import type { ChartData } from "chart.js"
import { use, useMemo } from "react"
import { Chart } from "react-chartjs-2"
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
import { getOptions, getSpeedTraceOptions } from "~/features/session/telemetry/components/ChartSection/config"
import Color from "color"

ChartJS.register([LineController, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title])
export interface ITelemetryChartSectionProps {
    telemetry: Promise<DriverTelemetryData[]>
}

export function TelemetryChartSection(props: ITelemetryChartSectionProps) {
    const telemetry = use(props.telemetry)
    const labels = telemetry[0].telemetry.Distance
    const max = telemetry[0].telemetry.Distance.at(-1) || 0

    const options = useMemo(() => getOptions({ trackLength: max }), [max])
    const speedTraceOptions = useMemo(() => getSpeedTraceOptions({ trackLength: max }), [max])

    const presets = useMemo(
        () =>
            // add some randomness to color so that two or more laps
            // by the same driver have different colors on the plot
            telemetry.map((lap) => ({
                borderColor: Color.rgb(lap.color)
                    .rotate(15 * Math.random())
                    .hex(),
                borderDash: Math.random() > 0.5 ? [8, 2] : undefined,
            })),
        [telemetry],
    )

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
                <Chart
                    type="line"
                    data={{ labels, datasets: throttleDatasets }}
                    options={options}
                    height={60}
                />
            </section>
        </>
    )
}
