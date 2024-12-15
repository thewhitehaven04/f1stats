import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
    type OnChangeFn,
    type RowData,
    type RowSelectionState,
} from "@tanstack/react-table"
import { useMemo } from "react"
import { TableHeader } from "~/components/Table/Header"
import { TableWrapper } from "~/components/Table/Wrapper"

const baseColumnHelper = createColumnHelper()

const baseColumns = [
    baseColumnHelper.display({
        id: "selector",
        cell: ({ row }) => (
            <input
                className="checkbox"
                type="checkbox"
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
            />
        ),
    }),
]

export interface IResultsTableProps<T extends RowData> {
    columns: ColumnDef<T>[]
    rows: T[]
    onRowSelectionChange: OnChangeFn<RowSelectionState>
}

export function ResultsTable<T extends RowData>(props: IResultsTableProps<T>) {
    const { rows, columns, onRowSelectionChange } = props
    const mergedColumns = useMemo(() => [...baseColumns, ...columns], [columns]) as ColumnDef<T>[]

    const { getRowModel, getFlatHeaders } = useReactTable({
        data: rows,
        columns: mergedColumns,
        onRowSelectionChange,
        getCoreRowModel: getCoreRowModel(),
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
