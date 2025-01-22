import { useMemo } from "react"
import { Chart } from "react-chartjs-2"
import type { DriverLapData } from "~/client/generated"
import LINE_CHART_IMPORTS from "~/features/session/telemetry/components/ChartSection/lineChartImports"
import { Chart as ChartJS, Legend, Title, Tooltip, type ChartData } from "chart.js"
ChartJS.register(...LINE_CHART_IMPORTS)

export interface ILapsChartProps {
    drivers: DriverLapData[]
}

export function LapsChart(props: ILapsChartProps) {
    const { drivers } = props

    const datasets: ChartData<"line">["datasets"] = useMemo(
        () =>
            drivers.map((driverData) => ({
                data: driverData.data.map((lap, index) => ({
                    x: index,
                    y: lap.LapTime || 0,
                })),
            })),
        [drivers],
    )

    return <Chart type="line" data={{ datasets: datasets }} height={100} plugins={[Legend, Tooltip, Title]} />
}
