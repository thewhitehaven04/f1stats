import { createColumnHelper } from "@tanstack/react-table"
import { use, useCallback, useMemo, useState } from "react"
import type { DriverLapData, LapTimingData } from "~/client/generated"
import { ValueOrNa } from "~/components/ValueOrNa"
import { LapsTable } from "~/features/session/laps/components/LapsTable"
import { Laptime } from "../results/components/Laptime"
import { useNavigate } from "react-router"
import { Button } from "~/components/Button"

export interface ILapData {
    [key: `${string}.LapTime`]: LapTimingData["LapTime"]
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
}

export const columnHelper = createColumnHelper<ILapData>()

export function LapComparisonSection({ responsePromise }: { responsePromise: Promise<DriverLapData[]> }) {
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
            })
        })

        return flattenedLaps
    }, [allDriverLaps])

    const [lapSelection, setLapSelection] = useState<Record<string, number[]>>({})

    const toggleSelectedLap = useCallback((driver: string, lap: number) => {
        setLapSelection((prevState) => {
            if (!Object.keys(prevState).includes(driver)) {
                return { ...prevState, [driver]: [lap] }
            }

            if (prevState[driver].includes(lap)) {
                return { ...prevState, [driver]: prevState[driver].filter((currentLap) => currentLap !== lap) }
            }

            return { ...prevState, [driver]: [...prevState[driver], lap] }
        })
    }, [])

    const navigate = useNavigate()

    const handleViewTelemetry = () => {
        navigate("")
    }

    console.log(flattenedLaps)

    const tableColumns = useMemo(
        () => [
            columnHelper.group({
                header: "Lap",
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
                                        className="checkbox"
                                        type="checkbox"
                                        onChange={() => toggleSelectedLap(driverName, lap)}
                                    />
                                )
                            },
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.LapTime`], {
                            id: `${driverName}.laptime`,
                            header: "Time",
                            cell: (info) => <Laptime value={info.getValue()} />,
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.Sector1Time`], {
                            id: `${driverName}.sector1`,
                            header: "S1",
                            cell: (info) => (
                                <Laptime
                                    value={info.getValue()}
                                    isSessionBest={info.row.original[`${driverName}.IsBestS1`]}
                                />
                            ),
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.ST1`], {
                            id: `${driverName}.ST1`,
                            header: "ST1",
                            cell: (info) => <ValueOrNa value={info.getValue()} />,
                            enableHiding: true,
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.Sector2Time`], {
                            id: `${driverName}.sector2`,
                            header: "S2",
                            cell: (info) => (
                                <Laptime
                                    value={info.getValue()}
                                    isSessionBest={info.row.original[`${driverName}.IsBestS2`]}
                                />
                            ),
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.ST2`], {
                            id: `${driverName}.ST2`,
                            header: "ST2",
                            cell: (info) => <ValueOrNa value={info.getValue()} />,
                            enableHiding: true,
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.Sector3Time`], {
                            id: `${driverName}.sector3`,
                            header: "S3",
                            cell: (info) => (
                                <Laptime
                                    value={info.getValue()}
                                    isSessionBest={info.row.original[`${driverName}.IsBestS3`]}
                                />
                            ),
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.ST3`], {
                            id: `${driverName}.ST3`,
                            header: "FL",
                            cell: (info) => <ValueOrNa value={info.getValue()} />,
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
                onClick={handleViewTelemetry}
                className="w-32"
            >
                View telemetry
            </Button>
            <LapsTable columns={tableColumns} data={flattenedLaps} />
        </section>
    )
}
