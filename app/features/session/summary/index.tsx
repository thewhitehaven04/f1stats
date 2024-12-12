import { format } from "date-fns"
import { use } from "react"
import type { SessionSummary } from "~/client/generated"

export interface ISessionSummaryProps {
    summary: Promise<SessionSummary>
}

export function SessionSummaryCard({ summary: summaryPromise }: ISessionSummaryProps) {
    const { summary, weather } = use(summaryPromise)

    return (
        <div className="card-body flex flex-col gap-2">
            <div className="flex flex-col gap-4 justify-center">
                <h2 className="text-lg">{summary.official_name}</h2>
            </div>
            <h2 className="text-lg">Track conditions</h2>
            <div className="grid grid-cols-2 gap-4">
                {summary.start_time && (
                    <div className="flex flex-col justify-center">
                        <span>Start time</span>
                        <span>{format(summary.start_time, "MMMM dd, yyyy HH:MM")}</span>
                    </div>
                )}
                {summary.finish_time && (
                    <div className="flex flex-col justify-center">
                        <span>Finish time</span>
                        <span>{format(summary.finish_time, "MMMM dd, yyyy HH:MM")}</span>
                    </div>
                )}
                <div className="flex flex-col justify-center">
                    <span>Air temp</span>
                    <span>
                        {weather.air_temp_start} - {weather.air_temp_finish}°C
                    </span>
                </div>
                <div className="flex flex-col justify-center">
                    <span>Track temp</span>
                    <span>
                        {weather.track_temp_start} - {weather.track_temp_finish}°C
                    </span>
                </div>
                <div className="flex flex-col justify-center">
                    <span>Humidity</span>
                    <span>
                        {weather.humidity_start} - {weather.humidity_finish}%
                    </span>
                </div>
            </div>
        </div>
    )
}
