import { Chart } from "react-chartjs-2"

export function TelemetryChartFallback() {
    return (
        <div className="w-full">
            <div className="skeleton w-full h-8" />
            <Chart type="line" height={200} data={{ datasets: [] }} />
        </div>
    )
}
