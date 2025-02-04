import { Chart } from "react-chartjs-2"
import { Chart as ChartJS, type ChartConfiguration } from "chart.js"
import BOX_PLOT_IMPORTS from "~/core/charts/boxPlotImports"
import type { LapSelectionData } from "~/client/generated"
import { use, useMemo, useState } from "react"
import clsx from "clsx"
import { StintSelector } from "~/features/session/laps/components/plots/LapsBoxPlot/StintSelector"

ChartJS.register(...BOX_PLOT_IMPORTS)

export function BoxPlotTab(props: { data: Promise<LapSelectionData> }) {
    const { data: dataPromise } = props
    const data = use(dataPromise)
    const [isOutliersShown, setIsOutliersShown] = useState(false)

    const [driverStints, setDriverStints] = useState<Record<string, number>>({})

    const sessionData: ChartConfiguration<"boxplot">["data"] = useMemo(
        () => ({
            labels: ["Laptime"],
            datasets: data.driver_lap_data.map((driver) => ({
                label: driver.driver,
                data: [
                    driverStints[driver.driver]
                        ? {
                              min: driver.stints[driverStints[driver.driver] - 1].min_time,
                              q1: driver.stints[driverStints[driver.driver] - 1].low_quartile,
                              q3: driver.stints[driverStints[driver.driver] - 1].high_quartile,
                              max: driver.stints[driverStints[driver.driver] - 1].max_time,
                              median: driver.stints[driverStints[driver.driver] - 1].median,
                              mean: driver.stints[driverStints[driver.driver] - 1].avg_time,
                              items: driver.laps
                                  .filter((driverData) => driverData.Stint === driverStints[driver.driver])
                                  .map((driverData) => driverData.LapTime || 0),
                          }
                        : {
                              min: driver.session_data.min_time,
                              q1: driver.session_data.low_quartile,
                              q3: driver.session_data.high_quartile,
                              max: driver.session_data.max_time,
                              median: driver.session_data.median,
                              mean: driver.session_data.avg_time,
                              items: driver.laps.map((driverData) => driverData.LapTime || 0),
                          },
                ],
                backgroundColor: "#eee",
                borderColor: driver.color,
            })),
        }),
        [data, driverStints],
    )

    return (
        <div className="overflow-x-scroll flex flex-col gap-4">
            <div className="flex flex-row justify-end gap-4">
                <StintSelector
                    stints={data.driver_lap_data.map((driver) => ({
                        driver: driver.driver,
                        stints: Array.from({ length: driver.stints.length }).map((_, index) => index + 1),
                    }))}
                    onStintChange={({ driver, stint }) => {
                        setDriverStints((prev) => ({ ...prev, [driver]: stint }))
                    }}
                    onReset={() => setDriverStints({})}
                />
                <button
                    type="button"
                    className={clsx("btn btn-sm", isOutliersShown && "btn-active")}
                    onClick={() => setIsOutliersShown(!isOutliersShown)}
                >
                    Show outliers
                </button>
            </div>
            <Chart
                type="boxplot"
                data={sessionData}
                height={data.driver_lap_data.length * 25}
                options={{
                    responsive: true,
                    scales: {
                        x: {
                            min: isOutliersShown ? data.min_time * 0.98 : data.low_decile * 0.99,
                            max: isOutliersShown ? data.max_time * 1.02 : data.high_decile * 1.01,
                        },
                    },
                    elements: {
                        boxandwhiskers: {
                            borderWidth: 2,
                            itemRadius: 4,
                            itemHitRadius: 6,
                            itemStyle: "circle",
                            itemBorderWidth: 1,
                            itemBorderColor(ctx) {
                                return typeof ctx.dataset.borderColor === "string" ? ctx.dataset.borderColor : "grey"
                            },
                            meanStyle: "rectRot",
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
