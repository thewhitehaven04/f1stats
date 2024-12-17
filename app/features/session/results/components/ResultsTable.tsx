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
import type { IBaseResultsData } from '~/features/session/results/components/types'

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
    rowSelectionState: RowSelectionState
}

export function ResultsTable<T extends IBaseResultsData>(props: IResultsTableProps<T>) {
    const { rows, columns, onRowSelectionChange, rowSelectionState } = props
    const mergedColumns = useMemo(() => [...baseColumns, ...columns], [columns]) as ColumnDef<T>[]

    const { getRowModel, getFlatHeaders } = useReactTable({
        data: rows,
        columns: mergedColumns,
        onRowSelectionChange,
        state: {
            rowSelection: rowSelectionState,
        },
        getRowId: (row) => row.driverNumber,
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
