import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { TableHeader } from "~/components/Table/Header"
import { TableWrapper } from "~/components/Table/Wrapper"
export interface IPracticeData {
    driver: string
    driverNumber: string
    countryCode: string
    teamName: string
    time: number | null
}

const columnHelper = createColumnHelper<IPracticeData>()

const columns = [
    columnHelper.accessor("driverNumber", {
        header: () => <th>Number</th>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("driver", {
        header: () => <th>Driver</th>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("teamName", {
        header: () => <th>Team</th>,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("time", {
        header: () => <th>Time</th>,
        cell: (info) => info.getValue(),
    }),
]

export function PracticeResults({ data }: { data: IPracticeData[] }) {
    const table = useReactTable<IPracticeData>({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
    })

    const rows = table.getRowModel().rows
    const header = table.getFlatHeaders()

    return (
        <TableWrapper>
            <TableHeader>
                {header.map((header) => (
                    <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                ))}
            </TableHeader>
            <tbody>
                {rows.map(({ getVisibleCells, id }) => (
                    <tr key={id}>
                        {getVisibleCells().map(({ column, getContext, id }) => (
                            <td key={id}>{flexRender(column.columnDef.cell, getContext())}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </TableWrapper>
    )
}
