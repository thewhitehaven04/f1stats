import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
    type RowData,
    type TableOptions,
} from "@tanstack/react-table"
import { useMemo } from "react"
import { TableHeader } from "~/components/Table/Header"
import { TableWrapper } from "~/components/Table/Wrapper"
import { clsx } from "clsx"

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

export function ResultsTable<T extends RowData>(options: Omit<TableOptions<T>, "getCoreRowModel">) {
    // hacky workaround for https://github.com/TanStack/table/issues/4382, spent way too much time on this
    const columns = useMemo(() => [...baseColumns, ...options.columns], [options.columns]) as ColumnDef<T>[]

    const { getRowModel, getFlatHeaders, getSelectedRowModel } = useReactTable({
        ...options,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const btnClasses = clsx("btn btn-sm btn-outline", {
        invisible: !Object.values(getSelectedRowModel().rows).find((value) => value),
    })

    return (
        <div className="flex flex-col gap-2">
            <button type="button" className={btnClasses}>
                View laps
            </button>
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
        </div>
    )
}