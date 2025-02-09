import { Chart } from "react-chartjs-2"
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

ChartJS.register([LineController, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title])

export function TelemetryChartFallback(props: { height: number, sectionTitle: string }) {
    const { height, sectionTitle } = props
    return (
        <section className="w-full">
            <h2 className="divider divider-start text-lg">{sectionTitle}</h2>
            <Chart
                type="line"
                height={height}
                data={{
                    datasets: [],
                }}
                options={{
                    scales: {
                        x: {
                            display: true,
                            min: 0,
                            max: 1,
                        },
                        y: {
                            display: true,
                        },
                    },
                }}
            />
        </section>
    )
}
