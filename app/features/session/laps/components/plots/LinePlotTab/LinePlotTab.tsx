import { use, useState } from "react"
import { Chart as ChartJS } from "chart.js"
import LINE_CHART_IMPORTS from "~/core/charts/lineImports"
import clsx from "clsx"
import zoomPlugin from "chartjs-plugin-zoom"
import { useLoaderData } from "react-router"
import type { Route } from ".react-router/types/app/routes/Session/Results/+types/Laps"
import { LineLapsChart } from "~/features/session/laps/components/plots/LinePlotTab/Chart"
import { StintSelector } from "~/features/session/laps/components/StintSelector"

ChartJS.register(...LINE_CHART_IMPORTS, zoomPlugin)

export default function LinePlotTab() {
    const data = use(useLoaderData<Route.ComponentProps["loaderData"]>().laps)
    const [isOutliersShown, setIsOutliersShown] = useState(true)

    const [driverStints, setDriverStints] = useState<Record<string, number | undefined>>(
        Object.fromEntries(data.driver_lap_data.map((lapData) => [lapData.driver, undefined])),
    )
    const stintData = data.driver_lap_data.map((driverLapData) => ({
        driver: driverLapData.driver,
        stints: Array.from({ length: driverLapData.stints.length }).map((_, index) => {
            const laps = driverLapData.laps.filter((lap) => lap.Stint === index + 1)
            return {
                index: index + 1,
                text: `${laps[0].Compound}, ${laps.length || 0} laps`,
            }
        }),
    }))

    return (
        <div className="overflow-x-scroll">
            <div className="flex flex-row justify-end gap-4">
                <StintSelector
                    driverStints={stintData}
                    onChange={({ driver, stint }) => setDriverStints((prev) => ({ ...prev, [driver]: stint }))}
                    onReset={() =>
                        setDriverStints(
                            Object.fromEntries(data.driver_lap_data.map((lapData) => [lapData.driver, undefined])),
                        )
                    }
                />
                <button
                    type="button"
                    onClick={() => setIsOutliersShown(!isOutliersShown)}
                    className={clsx("btn btn-sm", isOutliersShown && "btn-active")}
                >
                    Show outliers
                </button>
            </div>
            <LineLapsChart isOutliersShown={isOutliersShown} selectedStints={driverStints} laps={data} />
        </div>
    )
}
