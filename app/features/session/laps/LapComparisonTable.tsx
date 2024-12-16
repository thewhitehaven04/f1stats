import { createColumnHelper } from "@tanstack/react-table"
import { use, useMemo } from "react"
import type { DriverLapData, LapTimingData } from "~/client/generated"
import { ValueOrNa } from '~/components/ValueOrNa'
import { LapsTable } from "~/features/session/laps/components/LapsTable"
import { Laptime } from "~/features/session/results/components/helpers"

export interface ILapData {
    [key: `${string}.LapTime`]: LapTimingData["LapTime"]
    [key: `${string}.Sector1Time`]: LapTimingData["Sector1Time"]
    [key: `${string}.ST1`]: LapTimingData["ST1"]
    [key: `${string}.Sector2Time`]: LapTimingData["Sector2Time"]
    [key: `${string}.ST2`]: LapTimingData["ST2"]
    [key: `${string}.Sector3Time`]: LapTimingData["Sector3Time"]
    [key: `${string}.ST3`]: LapTimingData["ST3"]
}

export const columnHelper = createColumnHelper<ILapData>()

export function LapComparisonTable({ responsePromise }: { responsePromise: Promise<DriverLapData[]> }) {
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
            })
        })

        return flattenedLaps
    }, [allDriverLaps])

    const tableColumns = useMemo(
        () =>
            allDriverLaps.flatMap(({ driver: driverName }) =>
                // columnHelper.group({
                //     header: columnGroup.driver,
                //     columns: [
                //         columnHelper.display({
                //             id: `${columnGroup.driver}.selector`,
                //             cell: ({ row }) => (
                //                 <input
                //                     className="checkbox"
                //                     type="checkbox"
                //                     checked={row.getIsSelected()}
                //                     onChange={row.getToggleSelectedHandler()}
                //                 />
                //             ),
                //         }),
                [
                    columnHelper.accessor((row) => row[`${driverName}.LapTime`], {
                        header: `Laptime ${driverName}`,
                        cell: (info) => <Laptime value={info.getValue()} />,
                    }),
                    columnHelper.accessor((row) => row[`${driverName}.Sector1Time`], {
                        header: "Sector 1",
                        cell: (info) => <Laptime value={info.getValue()} />,
                    }),
                    columnHelper.accessor((row) => row[`${driverName}.ST1`], {
                        header: "Speed trap 1",
                        cell: (info) => <ValueOrNa value={info.getValue()} />,
                    }),
                    columnHelper.accessor((row) => row[`${driverName}.Sector2Time`], {
                        header: "Sector 2",
                        cell: (info) => <Laptime value={info.getValue()} />,
                    }),
                    columnHelper.accessor((row) => row[`${driverName}.ST2`], {
                        header: "Speed trap 2",
                        cell: (info) => <ValueOrNa value={info.getValue()} />,
                    }),
                    columnHelper.accessor((row) => row[`${driverName}.Sector3Time`], {
                        header: "Sector 3",
                        cell: (info) => <Laptime value={info.getValue()} />,
                    }),
                    columnHelper.accessor((row) => row[`${driverName}.ST3`], {
                        header: "FL speed",
                        cell: (info) => <ValueOrNa value={info.getValue()} />,
                    }),
                ],
            ),
        [allDriverLaps],
    )

    console.log("ROWS: ", flattenedLaps)
    console.log("COLUMNS: ", tableColumns)

    return <LapsTable columns={tableColumns} data={flattenedLaps} />
}
