import { use } from "react"
import type { DriverLapData } from "~/client/generated"
import { formatLaptime } from "~/features/session/results/components/helpers"

export interface ITelemetryLaptimeSectionProps {
    laps: Promise<DriverLapData[]>
}

export function TelemetryLaptimeSection(props: ITelemetryLaptimeSectionProps) {
    const { laps } = props
    const lapData = use(laps)

    return (
        <section>
            <h2 className="divider divider-start text-lg">Lap overview</h2>
            <div className="flex flex-row gap-4">
                {lapData.map(({ driver, data: laps }) => (
                    <div key={driver} className="card">
                        <h3 className="card-title">{driver}</h3>
                        {laps.map((lap) => (
                            <div key={lap.LapTime}>{formatLaptime(lap.LapTime as number)}</div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}
