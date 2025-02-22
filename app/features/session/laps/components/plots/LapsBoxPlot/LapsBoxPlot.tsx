import { CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip, type ChartConfiguration } from "chart.js"
import { use, useState } from "react"
import clsx from "clsx"
import { BoxAndWiskers, BoxPlotController } from "@sgratzl/chartjs-chart-boxplot"
import Zoom from "chartjs-plugin-zoom"
import type { Route } from ".react-router/types/app/routes/Session/Laps/+types"
import { useLoaderData } from "react-router"
import { LapsBoxChart } from "~/features/session/laps/components/plots/LapsBoxPlot/Chart"
import { PopupCard } from "~/components/PopupCard"

ChartJS.register([BoxPlotController, BoxAndWiskers, LinearScale, CategoryScale, Legend, Tooltip, Zoom])

export default function BoxPlotTab() {
    const data = use(useLoaderData<Route.ComponentProps["loaderData"]>().laps)
    const [isOutliersShown, setIsOutliersShown] = useState(false)
    const [isStintSelectorOpen, setIsStintSelectorOpen] = useState(false)

    const [driverStints, setDriverStints] = useState<Record<string, number | undefined>>(
        Object.fromEntries(data.driver_lap_data.map((lapData) => [lapData.driver, undefined])),
    )

    const handleReset = () => {
        setDriverStints(Object.fromEntries(data.driver_lap_data.map((lapData) => [lapData.driver, undefined])))
        setIsStintSelectorOpen(false)
    }

    return (
        <div className="overflow-x-scroll flex flex-col gap-4">
            <div className="flex flex-row justify-end gap-4">
                <div className="relative">
                    <button
                        type="button"
                        className="btn btn-sm"
                        onClick={() => setIsStintSelectorOpen(!isStintSelectorOpen)}
                    >
                        Select stint
                    </button>

                    {isStintSelectorOpen && (
                        <PopupCard
                            onClose={() => setIsStintSelectorOpen(false)}
                            actions={
                                <button type="button" className="btn btn-sm w-full" onClick={handleReset}>
                                    Reset
                                </button>
                            }
                            title="Stints"
                        >
                            {data.driver_lap_data.map((driver) => (
                                <label className="grid grid-cols-[48px,_128px] gap-2 items-center" key={driver.driver}>
                                    <span>{driver.driver}</span>
                                    <select
                                        className="select select-sm w-full text-end"
                                        onChange={(evt) =>
                                            setDriverStints((stints) => ({
                                                ...stints,
                                                [driver.driver]: Number.parseInt(evt.target.value),
                                            }))
                                        }
                                        value={driverStints[driver.driver]}
                                    >
                                        <option value={undefined}>Select stint</option>
                                        {driver.stints.map((_, index) => (
                                            <option key={index} value={index + 1}>
                                                {index + 1} (
                                                {driver.laps.find((lap) => lap.Stint === index + 1)?.Compound})
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            ))}
                        </PopupCard>
                    )}
                </div>
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
