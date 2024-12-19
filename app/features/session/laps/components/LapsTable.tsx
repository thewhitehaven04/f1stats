import { flexRender, getCoreRowModel, useReactTable, type TableOptions } from "@tanstack/react-table"
import { TableHeader } from "~/components/Table/Header"
import { TableWrapper } from "~/components/Table/Wrapper"
import type { ILapData } from "~/features/session/laps/LapComparisonTable"

export function LapsTable(options: Omit<TableOptions<ILapData>, "getCoreRowModel">) {
    const { getHeaderGroups, getRowModel } = useReactTable<ILapData>({
        ...options,
        getCoreRowModel: getCoreRowModel(),
    })

    const headerGroups = getHeaderGroups()
    const rowModel = getRowModel().rows

    return (
        <TableWrapper>
            <TableHeader>
                {headerGroups.map((group) => (
                    <tr key={group.id}>
                        {group.headers.map((header) => (
                            <th className='text-center' key={header.id} colSpan={header.colSpan}>
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
    )
}
