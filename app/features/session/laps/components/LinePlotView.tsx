import { use, useMemo, useState } from "react"
import { Chart } from "react-chartjs-2"
import type { LapSelectionData } from "~/client/generated"
import { Chart as ChartJS, Legend, Title, Tooltip, type ChartData, type TooltipItem } from "chart.js"
import { formatTime } from "~/features/session/results/components/helpers"
import LINE_CHART_IMPORTS from "~/core/charts/lineImports"

ChartJS.register(...LINE_CHART_IMPORTS)

export interface ILapsChartProps {
    data: Promise<LapSelectionData>
}

export function LinePlotView(props: ILapsChartProps) {
    const { data: dataPromise } = props
    const data = use(dataPromise)
    const drivers = data.driver_lap_data

    const datasets: ChartData<"scatter">["datasets"] = useMemo(
        () =>
            drivers.map((driverData) => ({
                label: driverData.driver,
                data: driverData.data.map((lap, index) => ({
                    x: index + 1,
                    y: lap.LapTime || 0,
                    compound: lap.Compound,
                })),
                borderColor: driverData.color,
            })),
        [drivers],
    )

    const [isOutliersShown, setIsOutliersShown] = useState(true)
    return (
        <div className="overflow-x-scroll">
            <div className="flex flex-row justify-end">
                <label className="label flex flex-row gap-2">
                    <input
                        type="checkbox"
                        onChange={() => setIsOutliersShown(!isOutliersShown)}
                        checked={isOutliersShown}
                        className="checkbox-sm"
                    />
                    <span className="label-text">Show outliers</span>
                </label>
            </div>
            <Chart
                type="line"
                data={{ datasets: datasets }}
                options={{
                    elements: {
                        point: {
                            radius: 6,
                        },
                        line: {
                            borderWidth: 1.5,
                        },
                    },
                    interaction: {
                        axis: "x",
                        mode: "x",
                    },
                    scales: {
                        y: {
                            type: "linear",
                            title: {
                                text: "Lap time (s)",
                                display: true,
                            },
                            min: isOutliersShown ? undefined : (data.low_decile || 0) * 0.95,
                            max: isOutliersShown ? undefined : (data.high_decile || 200) * 1.05,
                        },
                        x: {
                            type: "linear",
                            title: {
                                text: "Lap number",
                            },
                            min: 1,
                        },
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label(tooltipItem: TooltipItem<"scatter">) {
                                    const item = tooltipItem.dataset.data[tooltipItem.dataIndex]
                                    return `${tooltipItem.dataset.label}: ${formatTime(item?.y || 0)} (${item?.compound})`
                                },
                            },
                        },
                    },
                }}
                height={150}
                plugins={[Legend, Tooltip, Title]}
            />
        </div>
    )
}
