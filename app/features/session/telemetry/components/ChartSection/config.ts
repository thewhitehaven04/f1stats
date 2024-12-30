import type { ChartProps } from "react-chartjs-2"
import type { IPlotOptions, ISpeedTraceOptions } from "~/features/session/telemetry/components/ChartSection/types"

const BASE_OPTIONS: ChartProps["options"] = {
    elements: {
        point: {
            radius: 0.5,
        },
        line: {
            borderWidth: 2,
        },
    },
}

export const getSpeedTraceOptions = (options: ISpeedTraceOptions): ChartProps<"scatter">["options"] => ({
    ...BASE_OPTIONS,
    plugins: {
        tooltip: {
            enabled: true,
            position: "nearest",
            callbacks: {
                label: (context) => {
                    return `${context.dataset.data[context.dataIndex]} kph`
                },
                title: () => "Speed (kph)",
            },
        },
        legend: {
            display: true,
            title: {
                font: {
                    size: 14,
                }
            },
        }
    },
    showLine: true,
    scales: {
        x: {
            type: "linear",
            max: options.trackLength,
            title: {
                text: "Distance (m)",
                display: true,
                font: {
                    size: 14
                }
            },
        },
        y: {
            type: "linear",
            title: {
                text: "Speed (kph)",
                display: true,
                font: {
                    size: 14
                }
            },
        }
    },
})

export const getOptions = (options: IPlotOptions): ChartProps<"scatter" | "line">["options"] => ({
    ...BASE_OPTIONS,
    plugins: {
        tooltip: {
            enabled: true,
            position: "nearest",
            callbacks: {
                label: (context) => {
                    return `${context.dataset.data[context.dataIndex]} kph`
                },
            },
        },
    },
    showLine: true,
    scales: {
        x: {
            type: "linear",
            max: options.trackLength,
        },
    },
})
