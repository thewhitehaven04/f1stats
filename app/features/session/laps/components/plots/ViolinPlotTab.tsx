import { Chart } from "react-chartjs-2"
import { Chart as ChartJS, type ChartConfiguration } from "chart.js"
import violinPlotImports from "~/core/charts/violinPlotImports"
import type { LapSelectionData } from "~/client/generated"
import { use, useMemo } from "react"

ChartJS.register(...violinPlotImports)

export function ViolinPlotTab(props: { data: Promise<LapSelectionData> }) {
    const { data: dataPromise } = props
    const data = use(dataPromise)
    const plotData: ChartConfiguration<'violin'>["data"] = useMemo(
        () => ({
            labels: ["Laptime"],
            datasets: data.driver_lap_data.map((driver) => ({
                label: driver.driver,
                data: driver.data.map((driverData) => driverData.LapTime || 0),
            })),
        }),
        [data],
    )
    return (
        <div className="overflox-x-scroll">
            <Chart
                type="violin"
                data={plotData}
                options={{
                    responsive: true,
                }}
                height={100}
            />
        </div>
    )
}
