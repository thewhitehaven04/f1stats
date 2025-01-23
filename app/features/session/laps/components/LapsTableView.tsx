import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    type TableOptions,
} from "@tanstack/react-table"
import { useMemo } from "react"
import type { DriverLapData } from "~/client/generated"
import { Laptime } from "~/components/Laptime"
import { SectorTime } from "~/components/SectorTime"
import { Speedtrap } from "~/components/Speedtrap"
import { TableContext } from "~/components/Table/context"
import { TableHeader } from "~/components/Table/Header"
import { ColumnVisibilityButton } from "~/components/Table/Toolbars/ColumnVisibilityButton"
import { TableWrapper } from "~/components/Table/Wrapper"
import { NaLabel } from "~/components/ValueOrNa"
import { getTyreComponentByCompound } from "~/features/session/laps/components/helpers/getTyreIconByCompound"
import type { ILapData } from "~/features/session/laps/LapComparisonTable"

export const columnHelper = createColumnHelper<ILapData>()

export interface ILapsTableProps {
    options: Omit<TableOptions<ILapData>, "getCoreRowModel">
    toolbarSlot?: React.ReactNode
}

function LapsTable({ toolbarSlot, options }: ILapsTableProps) {
    const table = useReactTable<ILapData>({
        ...options,
        getCoreRowModel: getCoreRowModel(),
    })

    const { getHeaderGroups, getRowModel } = table

    const headerGroups = getHeaderGroups()
    const rowModel = getRowModel().rows

    return (
        <TableContext.Provider value={table}>
            <div className="flex flex-col gap-4">
                {toolbarSlot && <div className="flex flex-row justify-end gap-4">{toolbarSlot}</div>}
                <TableWrapper>
                    <TableHeader>
                        {headerGroups.map((group) => (
                            <tr key={group.id}>
                                {group.headers.map((header) => (
                                    <th className="text-center" key={header.id} colSpan={header.colSpan}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </TableHeader>
                    <tbody>
                        {rowModel.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td className="text-center py-0 px-0 align-middle" key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </TableWrapper>
            </div>
        </TableContext.Provider>
    )
}

export interface ILapsTableViewProps {
    drivers: DriverLapData[]
    onLapSelectionChange: (driver: string, lap: number, checked: boolean) => void
}

export function LapsTableView(props: ILapsTableViewProps) {
    const { drivers, onLapSelectionChange } = props

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
                                        onChange={(evt) => onLapSelectionChange(driverName, lap, evt.target.checked)}
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
        [drivers, onLapSelectionChange],
    )

    const columnVisibility = drivers.reduce<Record<string, boolean>>((curr, { driver }) => {
        curr[`${driver}.ST1`] = false
        curr[`${driver}.ST2`] = false
        curr[`${driver}.ST3`] = false

        return curr
    }, {})

    return (
        <div className="overflow-x-scroll">
            <LapsTable
                options={{
                    columns: tableColumns,
                    data: flattenedLaps,
                    initialState: {
                        columnVisibility,
                    },
                }}
                toolbarSlot={<ColumnVisibilityButton />}
            />
        </div>
    )
}
