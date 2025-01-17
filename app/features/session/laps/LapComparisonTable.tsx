import { createColumnHelper } from "@tanstack/react-table"
import { use, useCallback, useMemo, useState } from "react"
import type { DriverLapData, LapTimingData } from "~/client/generated"
import { LapsTable } from "~/features/session/laps/components/LapsTable"
import { Button } from "~/components/Button"
import { Speedtrap } from "~/components/Speedtrap/index"
import { SectorTime } from "~/components/SectorTime"
import { Laptime } from "~/components/Laptime"

export interface ILapData {
    [key: `${string}.LapTime`]: LapTimingData["LapTime"]
    [key: `${string}.IsPB`]: LapTimingData["IsPB"]
    [key: `${string}.Sector1Time`]: LapTimingData["Sector1Time"]
    [key: `${string}.ST1`]: LapTimingData["ST1"]
    [key: `${string}.Sector2Time`]: LapTimingData["Sector2Time"]
    [key: `${string}.ST2`]: LapTimingData["ST2"]
    [key: `${string}.Sector3Time`]: LapTimingData["Sector3Time"]
    [key: `${string}.ST3`]: LapTimingData["ST3"]
    [key: `${string}.IsBestS1`]: LapTimingData["IsBestS1"]
    [key: `${string}.IsBestS2`]: LapTimingData["IsBestS2"]
    [key: `${string}.IsBestS3`]: LapTimingData["IsBestS3"]
    [key: `${string}.IsBestST1`]: LapTimingData["IsBestST1"]
    [key: `${string}.IsBestST2`]: LapTimingData["IsBestST2"]
    [key: `${string}.IsBestST3`]: LapTimingData["IsBestST3"]
    [key: `${string}.IsPBS1`]: LapTimingData["IsPBS1"]
    [key: `${string}.IsPBS2`]: LapTimingData["IsPBS2"]
    [key: `${string}.IsPBS3`]: LapTimingData["IsPBS3"]
}

export const columnHelper = createColumnHelper<ILapData>()

export interface ILapComparisonSectionProps {
    responsePromise: Promise<DriverLapData[]>
    onViewTelemetry: (selection: Record<string, number[]>) => void
    onLapSelect: (driver: string, lap: number) => void
}

export function LapComparisonSection(props: ILapComparisonSectionProps) {
    const { responsePromise, onViewTelemetry, onLapSelect } = props
    const allDriverLaps = use(responsePromise)

    const flattenedLaps = useMemo(() => {
        const flattenedLaps: ILapData[] = []

        // biome-ignore lint/complexity/noForEach:
        allDriverLaps.forEach(({ driver: driverName, data: driverLaps }) => {
            driverLaps.forEach((lap, index) => {
                if (!flattenedLaps[index]) {
                    flattenedLaps[index] = {}
                }

                flattenedLaps[index][`${driverName}.LapTime`] = lap.LapTime
                flattenedLaps[index][`${driverName}.IsPB`] = lap.IsPB
                flattenedLaps[index][`${driverName}.Sector1Time`] = lap.Sector1Time
                flattenedLaps[index][`${driverName}.ST1`] = lap.ST1
                flattenedLaps[index][`${driverName}.Sector2Time`] = lap.Sector2Time
                flattenedLaps[index][`${driverName}.ST2`] = lap.ST2
                flattenedLaps[index][`${driverName}.Sector3Time`] = lap.Sector3Time
                flattenedLaps[index][`${driverName}.ST3`] = lap.ST3
                flattenedLaps[index][`${driverName}.IsBestS1`] = lap.IsBestS1
                flattenedLaps[index][`${driverName}.IsBestS2`] = lap.IsBestS2
                flattenedLaps[index][`${driverName}.IsBestS3`] = lap.IsBestS3
                flattenedLaps[index][`${driverName}.IsBestST1`] = lap.IsBestST1
                flattenedLaps[index][`${driverName}.IsBestST2`] = lap.IsBestST2
                flattenedLaps[index][`${driverName}.IsBestST3`] = lap.IsBestST3
                flattenedLaps[index][`${driverName}.IsPBS1`] = lap.IsPBS1
                flattenedLaps[index][`${driverName}.IsPBS2`] = lap.IsPBS2
                flattenedLaps[index][`${driverName}.IsPBS3`] = lap.IsPBS3
            })
        })

        return flattenedLaps
    }, [allDriverLaps])

    const [lapSelection, setLapSelection] = useState<Record<string, number[]>>({})

    const toggleSelectedLap = useCallback(
        (driver: string, lap: number, checked: boolean) => {
            if (checked) {
                onLapSelect(driver, lap)
            }

            setLapSelection((prevState) => {
                if (!Object.keys(prevState).includes(driver)) {
                    return { ...prevState, [driver]: [lap] }
                }

                if (prevState[driver].includes(lap)) {
                    return { ...prevState, [driver]: prevState[driver].filter((currentLap) => currentLap !== lap) }
                }

                return { ...prevState, [driver]: [...prevState[driver], lap] }
            })
            setLapSelection((prevState) => ({ ...prevState, [driver]: [lap] }))
        },
        [onLapSelect],
    )

    const tableColumns = useMemo(
        () => [
            columnHelper.group({
                header: "Lap",
                enablePinning: true,
                columns: [
                    columnHelper.display({
                        id: "lap",
                        cell: (cell) => cell.row.index + 1,
                    }),
                ],
            }),
            ...allDriverLaps.flatMap(({ driver: driverName }) =>
                columnHelper.group({
                    header: driverName,
                    id: driverName,
                    columns: [
                        columnHelper.display({
                            id: `${driverName}.selector`,
                            cell: (cell) => {
                                const lap = cell.row.index + 1
                                return (
                                    <input
                                        className="checkbox align-middle ml-4 mr-2"
                                        type="checkbox"
                                        onChange={(evt) => toggleSelectedLap(driverName, lap, evt.target.checked)}
                                    />
                                )
                            },
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.LapTime`], {
                            id: `${driverName}.laptime`,
                            header: "Time",
                            cell: (info) => (
                                <Laptime
                                    value={info.getValue()}
                                    isPersonalBest={info.row.original[`${driverName}.IsPB`]}
                                />
                            ),
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.Sector1Time`], {
                            id: `${driverName}.sector1`,
                            header: "S1",
                            cell: (info) => (
                                <SectorTime
                                    value={info.getValue()}
                                    isSessionBest={info.row.original[`${driverName}.IsBestS1`]}
                                    isPersonalBest={info.row.original[`${driverName}.IsPBS1`]}
                                />
                            ),
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.ST1`], {
                            id: `${driverName}.ST1`,
                            header: "ST1",
                            cell: (info) => (
                                <Speedtrap
                                    value={info.getValue()}
                                    isSessionBest={info.row.original[`${driverName}.IsBestST1`]}
                                />
                            ),
                            enableHiding: true,
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.Sector2Time`], {
                            id: `${driverName}.sector2`,
                            header: "S2",
                            cell: (info) => (
                                <SectorTime
                                    value={info.getValue()}
                                    isSessionBest={info.row.original[`${driverName}.IsBestS2`]}
                                    isPersonalBest={info.row.original[`${driverName}.IsPBS2`]}
                                />
                            ),
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.ST2`], {
                            id: `${driverName}.ST2`,
                            header: "ST2",
                            cell: (info) => (
                                <Speedtrap
                                    value={info.getValue()}
                                    isSessionBest={info.row.original[`${driverName}.IsBestST2`]}
                                />
                            ),
                            enableHiding: true,
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.Sector3Time`], {
                            id: `${driverName}.sector3`,
                            header: "S3",
                            cell: (info) => (
                                <SectorTime
                                    value={info.getValue()}
                                    isSessionBest={info.row.original[`${driverName}.IsBestS3`]}
                                    isPersonalBest={info.row.original[`${driverName}.IsPBS3`]}
                                />
                            ),
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.ST3`], {
                            id: `${driverName}.ST3`,
                            header: "FL",
                            cell: (info) => (
                                <Speedtrap
                                    value={info.getValue()}
                                    isSessionBest={info.row.original[`${driverName}.IsBestST3`]}
                                />
                            ),
                            enableHiding: true,
                        }),
                    ],
                }),
            ),
        ],
        [allDriverLaps, toggleSelectedLap],
    )

    return (
        <section className="flex flex-col gap-2 overflow-x-scroll">
            <h2 className="divider divider-start text-lg">Lap by lap comparison</h2>
            <Button
                type="button"
                disabled={!Object.values(lapSelection).find((value) => !!value.length)}
                onClick={() => onViewTelemetry(lapSelection)}
                className="w-32"
            >
                View telemetry
            </Button>
            <div className="overflow-x-scroll">
                <LapsTable columns={tableColumns} data={flattenedLaps} />
            </div>
        </section>
    )
}
