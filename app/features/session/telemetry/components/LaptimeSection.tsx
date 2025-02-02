import { Fragment, use } from "react"
import type { LapSelectionData } from "~/client/generated"
import { Laptime } from "~/components/Laptime"
import { Speedtrap } from "~/components/Speedtrap"
import { getTyreComponentByCompound } from "~/features/session/laps/components/helpers/getTyreIconByCompound"
import { formatTime } from "~/features/session/results/components/helpers"

export interface ITelemetryLaptimeSectionProps {
    laps: Promise<LapSelectionData>
}

export function TelemetryLaptimeSection(props: ITelemetryLaptimeSectionProps) {
    const { laps: lapsPromise } = props
    const laps = use(lapsPromise)

    const bestLap = laps.min_time

    return (
        <section>
            <h2 className="divider divider-start text-lg">Lap comparison</h2>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
                {laps.driver_lap_data.map(({ driver, data: laps }) => (
                    <Fragment key={driver}>
                        {laps.map((lap) => {
                            const TyreIcon = getTyreComponentByCompound(lap.Compound)
                            return (
                                <article
                                    key={driver}
                                    className="card card-body p-4 flex flex-col justify-around card-bordered shadow-md"
                                >
                                    <div className="grid grid-cols-[100px_1fr] gap-4 items-baseline">
                                        <h3 className="text-lg font-bold">{driver}</h3>
                                        <div className="flex flex-col items-start text-lg font-bold">
                                            <div className="flex flex-row gap-2">
                                                {formatTime(lap.LapTime as number)}
                                                {TyreIcon && <TyreIcon className="w-4" />}
                                            </div>
                                            {lap.LapTime !== bestLap && lap.LapTime && bestLap && (
                                                <div className="text-non-personal-best">
                                                    +{formatTime(lap.LapTime - bestLap)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                                        <span>Sector time</span>
                                        <span>Speed trap</span>
                                    </div>

                                    <div
                                        key={lap.Sector1Time}
                                        className="grid grid-cols-[100px_1fr] gap-4 items-center"
                                    >
                                        <Laptime
                                            value={lap.Sector1Time}
                                            isPersonalBest={lap.IsPBS1}
                                            isSessionBest={lap.IsBestS1}
                                        />
                                        <Speedtrap
                                            key={lap.ST1}
                                            value={lap.ST1 || 0}
                                            isSessionBest={lap.IsBestST1}
                                            withUnit
                                        />
                                    </div>

                                    <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                                        <Laptime
                                            value={lap.Sector2Time}
                                            isPersonalBest={lap.IsPBS2}
                                            isSessionBest={lap.IsBestS2}
                                        />
                                        <Speedtrap
                                            key={lap.ST2}
                                            value={lap.ST2 || 0}
                                            isSessionBest={lap.IsBestST2}
                                            withUnit
                                        />
                                    </div>

                                    <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
                                        <Laptime
                                            inline
                                            value={lap.Sector3Time}
                                            isPersonalBest={lap.IsPBS3}
                                            isSessionBest={lap.IsBestS3}
                                        />
                                        <Speedtrap
                                            key={lap.ST3}
                                            value={lap.ST3 || 0}
                                            isSessionBest={lap.IsBestST3}
                                            withUnit
                                        />
                                    </div>
                                </article>
                            )
                        })}
                    </Fragment>
                ))}
            </div>
        </section>
    )
}
