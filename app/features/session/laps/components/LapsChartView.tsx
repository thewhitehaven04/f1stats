import { useMemo } from "react"
import { Chart } from "react-chartjs-2"
import type { DriverLapData } from "~/client/generated"
import LINE_CHART_IMPORTS from "~/features/session/telemetry/components/ChartSection/lineChartImports"
import { Chart as ChartJS, Legend, Title, Tooltip, type ChartData, type TooltipItem } from "chart.js"
import { formatTime } from "~/features/session/results/components/helpers"

ChartJS.register(...LINE_CHART_IMPORTS)

export interface ILapsChartProps {
    drivers: DriverLapData[]
}

export function LapsChartView(props: ILapsChartProps) {
    const { drivers } = props

    const datasets: ChartData<"scatter">["datasets"] = useMemo(
        () =>
            drivers.map((driverData) => ({
                label: driverData.driver,
                data: driverData.data.map((lap, index) => ({
                    x: index + 1,
                    y: lap.LapTime || 0,
                    compound: lap.Compound
                })),
                borderColor: driverData.color,
            })),
        [drivers],
    )

    return (
        <div className="overflow-x-scroll">
            <Chart
                type="line"
                data={{ datasets: datasets }}
                options={{
                    elements: {
                        point: {
                            radius: 6,
                        },
                        line: {
                            borderWidth: 1.5
                        }
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
                        },
                        x: {
                            type: "linear",
                            title: {
                                text: "Lap number",
                            },
                            min: 1
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
