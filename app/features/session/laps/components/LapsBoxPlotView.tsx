import { Chart } from "react-chartjs-2"
import { Chart as ChartJS, type ChartConfiguration } from "chart.js"
import BOX_PLOT_IMPORTS from "~/core/charts/boxPlotImports"
import type { LapSelectionData } from "~/client/generated"
import { useMemo } from "react"

ChartJS.register(...BOX_PLOT_IMPORTS)

export interface IBoxPlotViewProps {
    data: LapSelectionData
}

export function BoxPlotView(props: IBoxPlotViewProps) {
    const { data } = props
    const plotData: ChartConfiguration<"boxplot">["data"] = useMemo(
        () => ({
            labels: ['Drivers'],
            datasets: data.driver_lap_data.map((driver) => ({
                label: driver.driver,
                data: [
                    {
                        min: driver.min_time || 0,
                        q1: driver.low_quartile || 0,
                        q3: driver.high_quartile || 0,
                        max: driver.max_time || 0,
                        median: driver.median || 0,
                        mean: driver.avg_time || 0,
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
                            min: data.min_time || 0,
                            max: (data.high_decile || 0)*1.01,
                        },
                    },
                    minStats: 'min',
                    maxStats: 'max'
                }}
            />
        </div>
    )
}
