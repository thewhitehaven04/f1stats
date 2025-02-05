import { Fragment, use } from "react"
import type { LapSelectionData } from "~/client/generated"
import { SectorTime } from "~/components/SectorTime"
import { Speedtrap } from "~/components/Speedtrap"
import { TableCell } from "~/components/Table/Cell"
import { TableHeader } from "~/components/Table/Header"
import { TableHeaderCell } from "~/components/Table/Header/cell"
import { TableWrapper } from "~/components/Table/Wrapper"
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
                {laps.driver_lap_data.map(({ driver, laps }) => (
                    <Fragment key={driver}>
                        {laps.map((lap) => {
                            const TyreIcon = getTyreComponentByCompound(lap.Compound)
                            return (
                                <article
                                    key={driver}
                                    className="card card-body border-2 border-solid border-neutral-100 p-4 flex flex-col justify-around card-bordered shadow-md"
                                >
                                    <div className="grid grid-cols-[100px,_1fr] gap-4 items-baseline">
                                        <h3 className="text-lg font-bold">{driver}</h3>
                                        <div className="grid grid-rows-2 justify-center text-lg font-bold">
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
                                    <TableWrapper>
                                        <TableHeader>
                                            <tr>
                                                <TableHeaderCell>Sector time</TableHeaderCell>
                                                <TableHeaderCell>Speed trap</TableHeaderCell>
                                            </tr>
                                        </TableHeader>
                                        <tbody>
                                            <tr>
                                                <TableCell>
                                                    <SectorTime
                                                        value={lap.Sector1Time}
                                                        isPersonalBest={lap.IsPBS1}
                                                        isSessionBest={lap.IsBestS1}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Speedtrap
                                                        key={lap.ST1}
                                                        value={lap.ST1 || 0}
                                                        isSessionBest={lap.IsBestST1}
                                                        withUnit
                                                    />
                                                </TableCell>
                                            </tr>
                                            <tr>
                                                <TableCell>
                                                    <SectorTime
                                                        value={lap.Sector2Time}
                                                        isPersonalBest={lap.IsPBS2}
                                                        isSessionBest={lap.IsBestS2}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Speedtrap
                                                        key={lap.ST2}
                                                        value={lap.ST2 || 0}
                                                        isSessionBest={lap.IsBestST2}
                                                        withUnit
                                                    />
                                                </TableCell>
                                            </tr>
                                            <tr>
                                                <TableCell>
                                                    <SectorTime
                                                        value={lap.Sector3Time}
                                                        isPersonalBest={lap.IsPBS3}
                                                        isSessionBest={lap.IsBestS3}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Speedtrap
                                                        key={lap.ST3}
                                                        value={lap.ST3 || 0}
                                                        isSessionBest={lap.IsBestST3}
                                                        withUnit
                                                    />
                                                </TableCell>
                                            </tr>
                                        </tbody>
                                    </TableWrapper>
                                </article>
                            )
                        })}
                    </Fragment>
                ))}
            </div>
        </section>
    )
}
