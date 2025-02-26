import type { ChartData, TooltipItem } from "chart.js"
import { useMemo } from "react"
import { Chart } from "react-chartjs-2"
import type { LapSelectionData } from "~/client/generated"
import { TYRE_COLOR_MAP, type TCompound } from "~/features/session/laps/components/helpers/colorMap"
import { formatTime } from "~/features/session/results/components/helpers"

type TPlotData = {
    x: number
    y: number
    compound: TCompound
}

export function LineLapsChart(props: {
    isOutliersShown: boolean
    selectedStints: Record<string, number | undefined>
    laps: LapSelectionData
}) {
    const { isOutliersShown, selectedStints, laps } = props
    const datasets: ChartData<"line">["datasets"] = useMemo(
        () =>
            laps.driver_lap_data.map((driverData) => ({
                label: driverData.driver,
                data: driverData.laps
                    .filter((lap) =>
                        selectedStints[driverData.driver] ? lap.Stint === selectedStints[driverData.driver] : true,
                    )
                    .map((lap, index) => ({
                        x: index + 1,
                        y: isOutliersShown
                            ? (lap.LapTime ?? Number.NaN)
                            : !lap.LapTime || lap.LapTime > laps.high_decile * 1.02
                              ? Number.NaN
                              : lap.LapTime,
                        compound: lap.Compound,
                    })),
                borderColor: driverData.color,
            })),
        [laps, isOutliersShown, selectedStints],
    )

    const isEveryStintSelected = Object.values(selectedStints).every((stint) => !!stint)
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
                        max: laps.driver_lap_data[0].session_data.total_laps + 1,
                        min: 1,
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
                                max: isEveryStintSelected
                                    ? Math.max(...datasets.map((dataset) => dataset.data.length))
                                    : laps.driver_lap_data[0].session_data.total_laps + 1,
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
