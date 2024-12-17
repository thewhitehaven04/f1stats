import { format } from "date-fns"
import { use } from "react"
import type { SessionSummary } from "~/client/generated"
import { SummaryItem } from "~/features/session/summary/SummaryItem"

export interface ISessionSummaryProps {
    summary: Promise<SessionSummary>
}

export function SessionSummaryCard({ summary: summaryPromise }: ISessionSummaryProps) {
    const { summary, weather } = use(summaryPromise)

    return (
        <section>
            <h1 className="card-title text-lg">{summary.official_name}</h1>
            <h2 className="divider divider-start text-lg">Track conditions</h2>
            <div className="flex flex-col p-0 gap-2 w-full">
                <div className="grid grid-cols-2 gap-4">
                    {summary.start_time && summary.finish_time && (
                        <SummaryItem
                            label="Session run time"
                            value={`${format(summary.start_time, "MMMM dd, yyyy HH:MM")} - ${format(summary.finish_time, "HH:MM")}`}
                        />
                    )}
                    <SummaryItem
                        label="Air temp (start-end)"
                        value={`${weather.air_temp_start}°C - ${weather.air_temp_finish}°C`}
                    />
                    <SummaryItem
                        label="Track temp (start - end)"
                        value={`${weather.track_temp_start}°C - ${weather.track_temp_finish}°C`}
                    />
                    <SummaryItem
                        label="Humidity (start-end)"
                        value={`${weather.humidity_start}% - ${weather.humidity_finish}%`}
                    />
                </div>
            </div>
        </section>
    )
}
