import { Chart } from "react-chartjs-2"
import { Chart as ChartJS, type ChartConfiguration } from "chart.js"
import BOX_PLOT_IMPORTS from "~/core/charts/boxPlotImports"
import type { LapSelectionData } from "~/client/generated"
import { use, useMemo } from "react"

ChartJS.register(...BOX_PLOT_IMPORTS)

export interface IBoxPlotTabProps {
    data: Promise<LapSelectionData>
}

export function BoxPlotTab(props: { data: Promise<LapSelectionData> }) {
    const { data: dataPromise } = props
    const data = use(dataPromise)
    const plotData: ChartConfiguration<"boxplot">["data"] = useMemo(
        () => ({
            labels: ["Laptime"],
            datasets: data.driver_lap_data.map((driver) => ({
                label: driver.driver,
                data: [
                    {
                        min: driver.min_time,
                        q1: driver.low_quartile,
                        q3: driver.high_quartile,
                        max: driver.max_time,
                        median: driver.median,
                        mean: driver.avg_time,
                        items: driver.data.map((driverData) => driverData.LapTime || 0),
                    },
                ],
                backgroundColor: "#eee",
                borderColor: driver.color,
            })),
        }),
        [data],
    )

    return (
        <div className="overflow-x-scroll">
            <Chart
                type="boxplot"
                data={plotData}
                height={data.driver_lap_data.length * 25}
                options={{
                    responsive: true,
                    scales: {
                        x: {
                            min: data.min_time * 0.98,
                            max: data.max_time * 1.02,
                        },
                    },
                    elements: {
                        boxandwhiskers: {
                            borderWidth: 2,
                            itemRadius: 4,
                            itemHitRadius: 6,
                            itemStyle: 'circle',
                            itemBorderWidth: 1,
                            itemBorderColor(ctx) {
                                return typeof ctx.dataset.borderColor === "string" ? ctx.dataset.borderColor : "grey"
                            },
                            meanStyle: 'rectRot',
                            meanBorderColor(ctx) {
                                return typeof ctx.dataset.borderColor === "string" ? ctx.dataset.borderColor : "grey"
                            },
                            meanRadius: 10,
                        },
                    },
                    indexAxis: "y",
                    minStats: "whiskerMin",
                    maxStats: "whiskerMax",
                }}
            />
        </div>
    )
}
