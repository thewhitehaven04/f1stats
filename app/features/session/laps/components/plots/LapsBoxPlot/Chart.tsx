import type { ChartConfiguration } from "chart.js"
import { useMemo } from "react"
import { Chart } from "react-chartjs-2"
import type { LapSelectionData } from "~/client/generated"
import { getAlternativeColor } from "~/core/charts/getAlternativeColor"
import { formatTime } from "~/features/session/results/components/helpers"

export function LapsBoxChart({
    isOutliersShown,
    selectedStints,
    laps,
}: { isOutliersShown: boolean; selectedStints: Record<string, number | undefined>; laps: LapSelectionData }) {
    const sessionData = useMemo(
        () => ({
            labels: ["Laptime"],
            datasets: laps.driver_lap_data.map((driver) => ({
                label: driver.driver,
                data: [
                    selectedStints[driver.driver]
                        ? {
                              min: driver.stints[(selectedStints[driver.driver] as number) - 1].min_time,
                              q1: driver.stints[(selectedStints[driver.driver] as number) - 1].low_quartile,
                              q3: driver.stints[(selectedStints[driver.driver] as number) - 1].high_quartile,
                              max: driver.stints[(selectedStints[driver.driver] as number) - 1].max_time,
                              median: driver.stints[(selectedStints[driver.driver] as number) - 1].median,
                              mean: driver.stints[(selectedStints[driver.driver] as number) - 1].avg_time,
                              items: driver.laps
                                  .filter((driverData) => driverData.Stint === selectedStints[driver.driver])
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
                borderColor: driver.alternative_style ? getAlternativeColor(driver.color) : driver.color,
            })),
        }),
        [laps, selectedStints],
    ) satisfies ChartConfiguration<"boxplot">["data"]

    const selectionMax = isOutliersShown
        ? laps.low_decile
        : Math.max(...sessionData.datasets.flatMap((dataset) => dataset.data.flatMap((data) => data.items))) + 0.1
    const selectionMin = isOutliersShown
        ? laps.high_decile
        : Math.min(...sessionData.datasets.flatMap((dataset) => dataset.data.flatMap((data) => data.items))) - 0.1

    return (
        <Chart
            type="boxplot"
            data={sessionData}
            height={laps.driver_lap_data.length * 25}
            options={{
                responsive: true,
                scales: {
                    x: {
                        min: selectionMin,
                        max: selectionMax,
                    },
                },
                interaction: {
                    axis: "x",
                    includeInvisible: false,
                    intersect: false,
                    mode: "x",
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
                plugins: {
                    zoom: {
                        limits: {
                            x: {
                                min: laps.min_time - 1,
                                max: laps.max_time + 1,
                            },
                        },
                        zoom: {
                            drag: {
                                enabled: true,
                            },
                            mode: "x",
                            pinch: {
                                enabled: true,
                            },
                            wheel: {
                                enabled: true,
                            },
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: ({
                                dataset,
                                dataIndex,
                            }: { dataset: (typeof sessionData)["datasets"][number]; dataIndex: number }) => {
                                return (
                                    `Min time: ${formatTime(dataset.data[dataIndex].min)}, ` +
                                    `max time: ${formatTime(dataset.data[dataIndex].max)}, ` +
                                    `25% quantile: ${formatTime(dataset.data[dataIndex].q1)}, ` +
                                    `75% quantile: ${formatTime(dataset.data[dataIndex].q3)}, ` +
                                    `mean: ${formatTime(dataset.data[dataIndex].mean)}, ` +
                                    `median: ${formatTime(dataset.data[dataIndex].median)}`
                                )
                            },
                        },
                    },
                },
                indexAxis: "y",
                minStats: "whiskerMin",
                maxStats: "whiskerMax",
            }}
        />
    )
}
