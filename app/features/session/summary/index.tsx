import { format } from "date-fns"
import type { SessionSummary } from "~/client/generated"
import { NaLabel } from "~/components/ValueOrNa"
import { SummaryItem } from "~/features/session/summary/SummaryItem"

export function SessionSummaryCard({
    session,
}: {
    session?: SessionSummary
}) {
    return (
        <section className="w-full">
            <h1 className="card-title text-lg text-neutral-700">
                {session ? `${session.summary.official_name} - ${session.summary.session_type}` : "Session Summary"}
            </h1>
            <h2 className="divider divider-start text-lg">Track conditions</h2>
            <div className="flex flex-col p-0 gap-2">
                <div className="grid grid-cols-2 gap-4">
                    {session?.summary.start_time && session.summary.finish_time ? (
                        <SummaryItem
                            label="Session run time"
                            value={`${format(session.summary.start_time, "MMM dd, yyyy HH:MM")} - ${format(session.summary.finish_time, "HH:MM")}`}
                        />
                    ) : (
                        <NaLabel />
                    )}

                    {session?.summary.start_time && session.summary.finish_time ? (
                        <SummaryItem
                            label="Air temp (start - end)"
                            value={`${session.weather.air_temp_start} - ${session.weather.air_temp_finish}°C`}
                        />
                    ) : (
                        <NaLabel />
                    )}
                    {session?.weather ? (
                        <SummaryItem
                            label="Track temp (start - end)"
                            value={`${session.weather.track_temp_start} - ${session.weather.track_temp_finish}°C`}
                        />
                    ) : (
                        <NaLabel />
                    )}

                    {session?.weather ? (
                        <SummaryItem
                            label="Humidity (start - end)"
                            value={`${session.weather.humidity_start} - ${session.weather.humidity_finish}%`}
                        />
                    ) : (
                        <NaLabel />
                    )}
                </div>
            </div>
        </section>
    )
}
