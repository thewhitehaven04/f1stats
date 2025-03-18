import type { ChartData, TooltipItem } from "chart.js"
import { useMemo } from "react"
import { Chart } from "react-chartjs-2"
import type { ECompound, LapSelectionData } from "~/client/generated"
import { getAlternativeColor } from "~/core/charts/getAlternativeColor"
import { TYRE_COLOR_MAP } from "~/features/session/laps/components/helpers/colorMap"
import { formatTime } from "~/features/session/results/components/helpers"

type TPlotData = {
    x: number
    y: number
    compound: ECompound | null
    isAlternativeStyle: boolean
    color: string
}

export function LineLapsChart(props: {
    isOutliersShown: boolean
    selectedStints: Record<string, number | undefined>
    laps: LapSelectionData
}) {
    const { isOutliersShown, selectedStints, laps } = props
    const datasets: ChartData<"line", TPlotData[]>["datasets"] = useMemo(
        () =>
            laps.driver_lap_data.map((driverData) => ({
                label: driverData.driver,
                data: driverData.laps
                    .filter((lap) =>
                        selectedStints[driverData.driver] ? lap.Stint === selectedStints[driverData.driver] : true,
                    )
                    .map((lap, index) => ({
                        x: lap.LapNumber,
                        y: isOutliersShown
                            ? (lap.LapTime ?? Number.NaN)
                            : !lap.LapTime || lap.LapTime > laps.high_decile * 1.02
                              ? Number.NaN
                              : lap.LapTime,
                        compound: lap.Compound,
                        isAlternativeStyle: driverData.alternative_style,
                        color: driverData.color,
                    })),
                borderColor: driverData.alternative_style ? getAlternativeColor(driverData.color) : driverData.color,
            })),
        [laps, isOutliersShown, selectedStints],
    )

    const maxX = Math.max(...datasets.map((dataset) => dataset.data[dataset.data.length - 1].x)) + 0.15
    const minX = Math.min(...datasets.map((dataset) => dataset.data[0].x)) - 0.15

    return (
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
                        borderColor(ctx) {
                            const data = ctx.dataset.data[ctx.dataIndex] as TPlotData
                            return data.isAlternativeStyle ? getAlternativeColor(data.color) : data.color
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
                        min: isOutliersShown ? undefined : laps.low_decile * 0.95,
                        max: isOutliersShown ? undefined : laps.high_decile * 1.05,
                    },
                    x: {
                        type: "linear",
                        title: {
                            text: "Lap number",
                        },
                        max: maxX,
                        min: minX,
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
                                min: minX,
                                max: maxX 
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
            height={110}
        />
    )
}
