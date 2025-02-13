import { use, useMemo, useState } from "react"
import { Chart } from "react-chartjs-2"
import type { LapSelectionData } from "~/client/generated"
import { Chart as ChartJS, type ChartData, type TooltipItem } from "chart.js"
import { formatTime } from "~/features/session/results/components/helpers"
import LINE_CHART_IMPORTS from "~/core/charts/lineImports"
import clsx from "clsx"
import { TYRE_COLOR_MAP } from "~/features/session/laps/components/helpers/colorMap"
import type { TCompound } from "~/features/session/laps/components/helpers/colorMap"
import zoomPlugin from "chartjs-plugin-zoom"
import Color from 'color'

ChartJS.register(...LINE_CHART_IMPORTS, zoomPlugin)

type TPlotData = {
    x: number
    y: number
    compound: TCompound
}

export default function LinePlotTab(props: {
    data: Promise<LapSelectionData>
}) {
    const { data: dataPromise } = props
    const data = use(dataPromise)
    const drivers = data.driver_lap_data

    const [isOutliersShown, setIsOutliersShown] = useState(true)


    const datasets: ChartData<"line">["datasets"] = useMemo(
        () =>
            drivers.map((driverData) => ({
                label: driverData.driver,
                data: driverData.laps.map((lap, index) => ({
                    x: index + 1,
                    y: isOutliersShown
                        ? (lap.LapTime ?? Number.NaN)
                        : !lap.LapTime || lap.LapTime > data.high_decile*1.02
                          ? Number.NaN
                          : lap.LapTime,
                    compound: lap.Compound,
                })),
                borderColor: driverData.color,
            })),
        [drivers, isOutliersShown, data.high_decile],
    )

    return (
        <div className="overflow-x-scroll">
            <div className="flex flex-row justify-end">
                <button
                    type="button"
                    onClick={() => setIsOutliersShown(!isOutliersShown)}
                    className={clsx("btn btn-sm", isOutliersShown && "btn-active")}
                >
                    Show outliers
                </button>
            </div>
            <Chart
                type="line"
                data={{ datasets: datasets }}
                options={{
                    elements: {
                        point: {
                            radius: 5,
                            borderWidth: 1.5,
                            backgroundColor(ctx) {
                                const data = ctx.dataset.data[ctx.dataIndex] as TPlotData
                                return TYRE_COLOR_MAP[data.compound] || "grey"
                            },
                        },
                        line: {
                            borderWidth: 1.5,
                        },
                    },
                    interaction: {
                        mode: "index",
                        intersect: false,
                    },
                    scales: {
                        y: {
                            type: "linear",
                            title: {
                                text: "Lap time (s)",
                                display: true,
                            },
                            min: isOutliersShown ? undefined : data.low_decile * 0.95,
                            max: isOutliersShown ? undefined : data.high_decile * 1.05,
                        },
                        x: {
                            type: "linear",
                            title: {
                                text: "Lap number",
                            },
                            max: drivers[0].session_data.total_laps + 1,
                            min: 0.5,
                        },
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label(tooltipItem: TooltipItem<"line">) {
                                    // TODO: fix typing
                                    const item = tooltipItem.dataset.data[tooltipItem.dataIndex] as {
                                        x: number
                                        y: number
                                        compound: string
                                    }
                                    return `${tooltipItem.dataset.label}: ${formatTime(item.y)} (${item?.compound})`
                                },
                            },
                        },
                        zoom: {
                            limits: {
                                x: {
                                    min: 0.5,
                                    max: drivers[0].session_data.total_laps + 1,
                                },
                            },
                            zoom: {
                                drag: {
                                    enabled: true,
                                },
                                mode: "x",
                                wheel: {
                                    enabled: true,
                                },
                            },
                        },
                    },
                }}
                height={150}
            />
        </div>
    )
}
