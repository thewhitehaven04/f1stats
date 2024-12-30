import { use } from "react"
import type { DriverLapData } from "~/client/generated"
import { Laptime } from "~/components/Laptime"
import { Speedtrap } from "~/components/Speedtrap"
import { formatLaptime } from "~/features/session/results/components/helpers"

export interface ITelemetryLaptimeSectionProps {
    laps: Promise<DriverLapData[]>
}

export function TelemetryLaptimeSection(props: ITelemetryLaptimeSectionProps) {
    const { laps } = props
    const lapData = use(laps)

    return (
        <section>
            <h2 className="divider divider-start text-lg">Lap comparison</h2>
            <article className="grid grid-cols-3 gap-5 items-stretch place-items-stretch">
                {lapData.map(({ driver, data: laps }) => (
                    <div key={driver} className="card card-body card-bordered shadow-sm w-full">
                        {laps.map((lap) => (
                            <>
                                <div key={driver} className="grid grid-cols-2 gap-4 items-center">
                                    <h3 className="text-xl font-bold">{driver}</h3>
                                    <div className="text-xl font-bold">{formatLaptime(lap.LapTime as number)}</div>
                                </div>
                                <div key={lap.Sector1Time} className="grid grid-cols-2 gap-4 items-center">
                                    <Laptime
                                        inline
                                        value={lap.Sector1Time}
                                        isPersonalBest={lap.IsPBS1}
                                        isSessionBest={lap.IsBestS1}
                                    />
                                    <Speedtrap key={lap.ST1} value={lap.ST1 || 0} isSessionBest={lap.IsBestST1} />
                                </div>
                                <div key={lap.Sector2Time} className="grid grid-cols-2 gap-4 items-center">
                                    <Laptime
                                        inline
                                        value={lap.Sector2Time}
                                        isPersonalBest={lap.IsPBS2}
                                        isSessionBest={lap.IsBestS2}
                                    />
                                    <Speedtrap key={lap.ST2} value={lap.ST2 || 0} isSessionBest={lap.IsBestST2} />
                                </div>
                                <div key={lap.Sector3Time} className="grid grid-cols-2 gap-4 items-center">
                                    <Laptime
                                        inline
                                        value={lap.Sector3Time}
                                        isPersonalBest={lap.IsPBS3}
                                        isSessionBest={lap.IsBestS3}
                                    />
                                    <Speedtrap key={lap.ST3} value={lap.ST3 || 0} isSessionBest={lap.IsBestST3} />
                                </div>
                            </>
                        ))}
                    </div>
                ))}
            </article>
        </section>
    )
}
