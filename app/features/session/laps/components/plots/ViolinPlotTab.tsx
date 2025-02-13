import { Chart } from "react-chartjs-2"
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip, type ChartConfiguration } from "chart.js"
import type { LapSelectionData } from "~/client/generated"
import { use, useMemo, useState } from "react"
import { Violin, ViolinController } from "@sgratzl/chartjs-chart-boxplot"
import clsx from "clsx"

ChartJS.register([Violin, ViolinController, LinearScale, CategoryScale, Legend, Tooltip])

export function ViolinPlotTab(props: { data: Promise<LapSelectionData> }) {
    const { data: dataPromise } = props
    const data = use(dataPromise)
    const [isOutliersShown, setIsOutliersShown] = useState(false)

    const plotData: ChartConfiguration<"violin">["data"] = useMemo(
        () => ({
            labels: ["Laptime"],
            datasets: data.driver_lap_data.map((driver) => ({
                label: driver.driver,
                data: [driver.laps.map((driverData) => driverData.LapTime).filter((lap) => lap !== null)],
                borderColor: driver.color,
            })),
        }),
        [data],
    )
    return (
        <div className="overflow-x-scroll">
            <div className="flex flex-row justify-end gap-4">
                <button
                    type="button"
                    className={clsx("btn btn-sm", isOutliersShown && "btn-active")}
                    onClick={() => setIsOutliersShown(!isOutliersShown)}
                >
                    Show outliers
                </button>
            </div>
            <Chart
                type="violin"
                data={plotData}
                options={{
                    responsive: true,
                    scales: {
                        y: {
                            min: isOutliersShown ? Math.floor(data.min_time) - 0.5 : Math.floor(data.low_decile) - 0.5,
                            max: isOutliersShown ? Math.ceil(data.max_time) + 0.5 : Math.ceil(data.high_decile) + 0.5,
                        },
                    },
                    elements: {
                        violin: {
                            borderWidth: 2,
                            itemRadius: 4,
                            itemHitRadius: 6,
                            itemStyle: "circle",
                            itemBorderWidth: 1,
                            itemBorderColor(ctx) {
                                return typeof ctx.dataset.borderColor === "string" ? ctx.dataset.borderColor : "grey"
                            },
                            meanRadius: 10,
                        },
                    },
                }}
                height={150}
            />
        </div>
    )
}
