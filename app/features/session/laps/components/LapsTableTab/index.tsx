import { createColumnHelper } from "@tanstack/react-table"
import { use, useMemo } from "react"
import { Form, useParams } from "react-router"
import type { LapSelectionData, SessionIdentifier } from "~/client/generated"
import { Button } from "~/components/Button"
import { Laptime } from "~/components/Laptime"
import { SectorTime } from "~/components/SectorTime"
import { Speedtrap } from "~/components/Speedtrap"
import { NaLabel } from "~/components/ValueOrNa"
import { getTyreComponentByCompound } from "~/features/session/laps/components/helpers/getTyreIconByCompound"
import { usePrefetchTelemetry } from "~/features/session/laps/components/LapsTableTab/hooks/usePrefetchTelemtry"
import { LapsTable } from "~/features/session/laps/components/LapsTableTab/table"
import type { ILapData } from "~/features/session/laps/LapComparisonTable"

export const columnHelper = createColumnHelper<ILapData>()

export interface ILapsTableViewProps {
    data: Promise<LapSelectionData>
}

export function LapsTableTab(props: ILapsTableViewProps) {
    const { data: promiseData } = props
    const data = use(promiseData)
    const params = useParams<{ year: string; session: SessionIdentifier; event: string }>()
    const { prefetch } = usePrefetchTelemetry()

    const drivers = data.driver_lap_data
    const flattenedLaps = useMemo(() => {
        const flattenedLaps: ILapData[] = []

        // biome-ignore lint/complexity/noForEach:
        drivers.forEach(({ driver: driverName, data: driverLaps }) => {
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
                flattenedLaps[index][`${driverName}.Compound`] = lap.Compound
            })
        })

        return flattenedLaps
    }, [drivers])

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
            ...drivers.flatMap(({ driver: driverName }) =>
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
                                        name={driverName}
                                        value={lap}
                                        onChange={() => prefetch({ driver: driverName, lap: lap.toString() })}
                                        disabled={!cell.row.original[`${driverName}.LapTime`]}
                                    />
                                )
                            },
                            enableHiding: false,
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.LapTime`], {
                            id: `${driverName}.laptime`,
                            header: "Time",
                            cell: (info) => (
                                <Laptime
                                    value={info.getValue()}
                                    isPersonalBest={info.row.original[`${driverName}.IsPB`]}
                                    className="py-2"
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
                        }),
                        columnHelper.accessor((row) => row[`${driverName}.Compound`], {
                            id: `${driverName}.Compound`,
                            header: "Tyre",
                            cell: (info) => {
                                const Icon = getTyreComponentByCompound(info.getValue())
                                return Icon ? (
                                    <div className="w-full flex flex-row justify-center">
                                        <Icon className="w-8" />
                                    </div>
                                ) : (
                                    <NaLabel />
                                )
                            },
                        }),
                    ],
                }),
            ),
        ],
        [drivers, prefetch],
    )

    return (
        <Form
            method="get"
            action={`/year/${params.year}/event/${params.event}/session/${params.session}/laps/telemetry`}
        >
            <LapsTable
                columns={tableColumns}
                data={flattenedLaps}
                initialState={{
                    columnVisibility: drivers.reduce<Record<string, boolean>>((curr, { driver }) => {
                        curr[`${driver}.ST1`] = false
                        curr[`${driver}.ST2`] = false
                        curr[`${driver}.ST3`] = false

                        return curr
                    }, {}),
                }}
                toolbarSlot={<Button type="submit">View telemetry</Button>}
            />
        </Form>
    )
}
