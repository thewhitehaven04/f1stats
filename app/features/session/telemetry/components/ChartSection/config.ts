import type { ChartProps } from "react-chartjs-2"
import type { IPlotOptions, ISpeedTraceOptions } from "~/features/session/telemetry/components/ChartSection/types"

const BASE_OPTIONS = {
    elements: {
        point: {
            radius: 0,
        },
        line: {
            borderWidth: 2,
        },
    },
} as const

export const getSpeedTraceOptions = (options: ISpeedTraceOptions): ChartProps<"line">["options"] => ({
    ...BASE_OPTIONS,
    responsive: true,
    elements: {
        ...BASE_OPTIONS.elements,
        line: {
            ...BASE_OPTIONS.elements.line,
            cubicInterpolationMode: "monotone",
        },
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
            align: "start",
        },
        tooltip: {
            enabled: true,
            includeInvisible: false,
            axis: "x",
            mode: "x",
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
            beginAtZero: true,
        },
        y: {
            type: "linear",
            beginAtZero: true,
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
