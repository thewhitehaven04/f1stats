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

export const getSpeedTraceOptions = (options: ISpeedTraceOptions): ChartProps<"line">["options"] => ({
    ...BASE_OPTIONS,
    responsive: true,
    line: {
        datasets: {
            xAxisID: 'x',
            yAxisID: 'y',
        }
    },
    plugins: {
        legend: {
            display: true,
            title: {
                font: {
                    size: 14,
                },
            },
            fullSize: true,
            align: 'start',
        },
        tooltip: {
            enabled: true,
            mode: "x",
            xAlign: "right",
            yAlign: "bottom",
        },
    },
    scales: {
        x: {
            type: "linear",
            max: options.trackLength,
            title: {
                text: "Distance (m)",
                display: true,
                font: {
                    size: 14,
                },
            },
        },
        y: {
            type: "linear",
            title: {
                text: "Speed (kph)",
                display: true,
                font: {
                    size: 14,
                },
            },
        },
    },
})

export const getOptions = (options: IPlotOptions): ChartProps<"scatter" | "line">["options"] => ({
    ...BASE_OPTIONS,
    showLine: true,
    scales: {
        x: {
            type: "linear",
            max: options.trackLength,
        },
    },
})
