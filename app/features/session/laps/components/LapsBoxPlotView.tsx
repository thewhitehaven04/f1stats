import { Chart } from "react-chartjs-2"
import { Chart as ChartJS, type ChartConfiguration } from "chart.js"
import BOX_PLOT_IMPORTS from "~/core/charts/boxPlotImports"
import type { LapSelectionData } from "~/client/generated"
import { use, useMemo } from "react"

ChartJS.register(...BOX_PLOT_IMPORTS)

export interface IBoxPlotViewProps {
    data: Promise<LapSelectionData>
}

export function BoxPlotView(props: IBoxPlotViewProps) {
    const { data: dataPromise } = props
    const data = use(dataPromise)
    const plotData: ChartConfiguration<"boxplot">["data"] = useMemo(
        () => ({
            labels: ['Drivers'],
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
                backgroundColor: driver.color,
            })),
        }),
        [data],
    )

    return (
        <div className="overflow-x-scroll">
            <Chart
                type="boxplot"
                data={plotData}
                height={170}
                options={{
                    scales: {
                        y: {
                            min: data.min_time,
                            max: (data.high_decile)*1.01,
                        },
                    },
                    minStats: 'min',
                    maxStats: 'max'
                }}
            />
        </div>
    )
}
