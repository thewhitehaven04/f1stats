import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { TableHeader } from "~/components/Table/Header"
import { TableWrapper } from "~/components/Table/Wrapper"
import { formatLaptime } from '~/features/session/results/components/helpers'
export interface IPracticeData {
    driver: string
    driverNumber: string
    countryCode: string
    teamName: string
    time: number | null
    gap: number | null
}

const Laptime = ({ value }: { value: number | null }) => (
    <span className="text-gray-700">{value ? formatLaptime(value) : "N/A"}</span>
)

const columnHelper = createColumnHelper<IPracticeData>()

const columns = [
    columnHelper.accessor("driverNumber", {
        header: () => <span>Number</span>,
        cell: (info) => info.getValue(),
        enableSorting: true,
    }),
    columnHelper.accessor("driver", {
        header: () => <span>Driver</span>,
        cell: (info) => info.getValue(),
        enableSorting: true,
    }),
    columnHelper.accessor("teamName", {
        header: () => <span>Team</span>,
        cell: (info) => info.getValue(),
        enableSorting: true,
    }),
    columnHelper.accessor("time", {
        header: () => <span>Time</span>,
        cell: (info) => <Laptime value={info.getValue()} />,
        enableSorting: true,
    }),
    columnHelper.accessor("gap", {
        header: () => <span>Gap to leader</span>,
        cell: (info) => <Laptime value={info.getValue()} />,
        enableSorting: true,
    }),
]

export function PracticeResults({ data }: { data: IPracticeData[] }) {
    const { getRowModel, getFlatHeaders } = useReactTable<IPracticeData>({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getRowId: (row) => row.driverNumber,
    })

    return (
        <TableWrapper>
            <TableHeader>
                <tr>
                    {getFlatHeaders().map(({ column, id, getContext }) => (
                        <th key={id}>{flexRender(column.columnDef.header, getContext())}</th>
                    ))}
                </tr>
            </TableHeader>
            <tbody>
                {getRowModel().rows.map(({ id, getVisibleCells }) => (
                    <tr key={id}>
                        {getVisibleCells().map(({ id: cellId, column, getContext }) => (
                            <td key={cellId}>{flexRender(column.columnDef.cell, getContext())}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </TableWrapper>
    )
}
