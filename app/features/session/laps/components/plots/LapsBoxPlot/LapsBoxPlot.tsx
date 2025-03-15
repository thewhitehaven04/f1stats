import { CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from "chart.js"
import { use, useState } from "react"
import clsx from "clsx"
import { BoxAndWiskers, BoxPlotController } from "@sgratzl/chartjs-chart-boxplot"
import Zoom from "chartjs-plugin-zoom"
import { useLoaderData } from "react-router"
import { LapsBoxChart } from "~/features/session/laps/components/plots/LapsBoxPlot/Chart"
import type { Route } from ".react-router/types/app/routes/Session/Results/+types/Laps"
import { StintSelector } from "~/features/session/laps/components/StintSelector"

ChartJS.register([BoxPlotController, BoxAndWiskers, LinearScale, CategoryScale, Legend, Tooltip, Zoom])

export default function BoxPlotTab() {
    const data = use(useLoaderData<Route.ComponentProps["loaderData"]>().laps)
    const [isOutliersShown, setIsOutliersShown] = useState(false)

    const [driverStints, setDriverStints] = useState<Record<string, number | undefined>>(
        Object.fromEntries(data.driver_lap_data.map((lapData) => [lapData.driver, undefined])),
    )

    const stintData = data.driver_lap_data.map((driverLapData) => ({
        driver: driverLapData.driver,
        stints: Array.from({ length: driverLapData.stints.length })
            .map((_, index) => {
                const laps = driverLapData.laps.filter((lap) => lap.Stint === index + 1)
                return (
                    laps.length
                        ? {
                              index: laps[0].Stint,
                              text: `${laps[0].Compound}, ${driverLapData.stints[index].total_laps || 0} laps`,
                          }
                        : null
                ) as { index: number; text: string }
            })
            .filter(Boolean),
    }))

    return (
        <div className="overflow-x-scroll flex flex-col gap-4">
            <div className="flex flex-row justify-end gap-4">
                <StintSelector
                    driverStints={stintData}
                    onChange={({ driver, stint }) => setDriverStints((prev) => ({ ...prev, [driver]: stint }))}
                    onReset={() =>
                        setDriverStints(
                            Object.fromEntries(data.driver_lap_data.map((lapData) => [lapData.driver, undefined])),
                        )
                    }
                    selectionValues={driverStints}
                />
                <button
                    type="button"
                    className={clsx("btn btn-sm", isOutliersShown && "btn-active")}
                    onClick={() => setIsOutliersShown(!isOutliersShown)}
                >
                    Show outliers
                </button>
            </div>
            <LapsBoxChart selectedStints={driverStints} laps={data} isOutliersShown={isOutliersShown} />
        </div>
    )
}
