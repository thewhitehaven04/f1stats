import { Chart } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js"
import violinPlotImports from "~/core/charts/violinPlotImports"
import type { LapSelectionData } from "~/client/generated"
import { use } from "react"

ChartJS.register(...violinPlotImports)

export function ViolinPlotTab(props: { data: Promise<LapSelectionData> }) {
    const { data: dataPromise } = props
    const data = use(dataPromise)

    return (
        <div className="overflox-x-scroll">
            <Chart
                type="violin"
                data={{
                    labels: ['Drivers'],
                    datasets: data.driver_lap_data.map((driver) => ({
                        label: driver.driver,
                        data: driver.data.map((lap) => lap.LapTime),
                    })),
                }}
                height={100}
            />
        </div>
    )
}
