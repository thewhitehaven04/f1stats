import type { RowData } from '@tanstack/react-table'
import { useState } from "react"
import { Button } from "~/components/Button"
import { useTableContext } from "~/components/Table/context"

export function ColumnVisibilityButton<T extends RowData>() {
    const { getAllLeafColumns } = useTableContext<T>()

    const [isColumnCardVisible, setIsColumnCardVisible] = useState(false)

    return (
        <div className="relative z-10">
            <Button type="button" className="w-32" onClick={() => setIsColumnCardVisible(!isColumnCardVisible)}>
                Columns
            </Button>
            {isColumnCardVisible && (
                <div className="card bg-base-100 border-1 shadow-xl p-4 absolute top-8 left-0 min-w-40">
                    <div className="card-title mb-4">Columns</div>
                    <div className="card-body p-0 flex flex-col gap-4">
                        {getAllLeafColumns().map(
                            (column) =>
                                column.getCanHide() &&
                                typeof column.columnDef.header === "string" && (
                                    <label key={column.id} className="flex flex-row items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={column.getIsVisible()}
                                            onChange={column.getToggleVisibilityHandler()}
                                            className="checkbox-xs"
                                        />
                                        {column.parent &&
                                            typeof column.parent.columnDef.header === "string" &&
                                            column.parent.columnDef.header}{" "}
                                        - {column.columnDef.header}
                                    </label>
                                ),
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
