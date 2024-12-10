import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { TableHeader } from "~/components/Table/Header"
import { TableWrapper } from "~/components/Table/Wrapper"
export interface IPracticeData {
    driver: string
    driverNumber: string
    countryCode: string
    teamName: string
    time: number | null
    gap: number | null
}

const columnHelper = createColumnHelper<IPracticeData>()

const columns = [
    columnHelper.accessor("driverNumber", {
        header: () => <span>Number</span>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("driver", {
        header: () => <span>Driver</span>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("teamName", {
        header: () => <span>Team</span>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("time", {
        header: () => <span>Time</span>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("gap", {
        header: () => <span>Gap to leader</span>,
        cell: (info) => info.getValue(),
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
                        {getVisibleCells().map(({ column, getContext, id: cellId }) => (
                            <td key={cellId}>{flexRender(column.columnDef.cell, getContext())}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </TableWrapper>
    )
}
