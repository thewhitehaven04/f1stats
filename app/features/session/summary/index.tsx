import type { Route } from ".react-router/types/app/routes/+types/Session"
import { format } from "date-fns"

export interface ISessionSummaryProps {
    summary: Route.ComponentProps["loaderData"]["summary"]
}

export function SessionSummary({ summary }: ISessionSummaryProps) {
    return (
        <div className="card-body flex flex-col gap-2">
            <div className="flex flex-col gap-4 justify-center">
                <h2 className="text-lg">{summary.summary.official_name}</h2>
            </div>
            <h2 className="text-lg">Track conditions</h2>
            <div className="grid grid-cols-2 gap-4">
                {summary.summary.start_time && (
                    <div className="flex flex-col justify-center">
                        <span>Start time</span>
                        <span>{format(summary.summary.start_time, "MMMM dd, yyyy HH:MM")}</span>
                    </div>
                )}
                {summary.summary.finish_time && (
                    <div className="flex flex-col justify-center">
                        <span>Finish time</span>
                        <span>{format(summary.summary.finish_time, "MMMM dd, yyyy HH:MM")}</span>
                    </div>
                )}
                <div className="flex flex-col justify-center">
                    <span>Air temp</span>
                    <span>
                        {summary.weather.air_temp_start} - {summary.weather.air_temp_finish}°C
                    </span>
                </div>
                <div className="flex flex-col justify-center">
                    <span>Track temp</span>
                    <span>
                        {summary.weather.track_temp_start} - {summary.weather.track_temp_finish}°C
                    </span>
                </div>
                <div className="flex flex-col justify-center">
                    <span>Humidity</span>
                    <span>
                        {summary.weather.humidity_start} - {summary.weather.humidity_finish}%
                    </span>
                </div>
            </div>
        </div>
    )
}
