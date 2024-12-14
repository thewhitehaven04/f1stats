import { flexRender, getCoreRowModel, useReactTable, type TableOptions } from "@tanstack/react-table"
import { TableHeader } from "~/components/Table/Header"
import { TableWrapper } from "~/components/Table/Wrapper"

export function LapsTable<T>(options: Omit<TableOptions<T>, "getCoreRowModel">) {
    const { getHeaderGroups, getRowModel } = useReactTable({
        ...options,
        getCoreRowModel: getCoreRowModel(),
    })

    const headerGroups = getHeaderGroups()
    const rowModel = getRowModel()

    return (
        <TableWrapper>
            <TableHeader>
                {headerGroups.map((group) => (
                    <tr key={group.id}>
                        {group.headers.map((header) => (
                            <th key={header.id} colSpan={header.colSpan}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </TableHeader>
            <tbody>
                {rowModel.rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </TableWrapper>
    )
}
