import { Chart } from "react-chartjs-2"
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip, type ChartConfiguration } from "chart.js"
import { use, useMemo, useState } from "react"
import { Violin, ViolinController } from "@sgratzl/chartjs-chart-boxplot"
import clsx from "clsx"
import Color from "color"
import { useLoaderData } from "react-router"
import type { Route } from ".react-router/types/app/routes/Session/Results/+types/Laps"
import { getAlternativeColor } from "~/core/charts/getAlternativeColor"

ChartJS.register([Violin, ViolinController, LinearScale, CategoryScale, Legend, Tooltip])

export function ViolinPlotTab() {
    const data = use(useLoaderData<Route.ComponentProps["loaderData"]>().laps)
    const [isOutliersShown, setIsOutliersShown] = useState(false)

    const plotData: ChartConfiguration<"violin">["data"] = useMemo(
        () => ({
            labels: ["Laptimes"],
            datasets: data.driver_lap_data.map((driver) => ({
                label: driver.driver,
                data: [driver.laps.map((driverData) => driverData.LapTime).filter((lap) => lap !== null)],
                borderColor: driver.alternative_style ? getAlternativeColor(driver.color) : driver.color,
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
                    scales: {
                        y: {
                            min: isOutliersShown ? Math.floor(data.min_time) : Math.floor(data.min_time),
                            max: isOutliersShown ? Math.ceil(data.max_time) : Math.ceil(data.high_decile) + 0.5,
                        },
                    },
                    elements: {
                        violin: {
                            borderWidth: 2,
                            itemRadius: 3.5,
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
                height={160}
            />
        </div>
    )
}
