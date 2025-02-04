import type { RowData } from "@tanstack/react-table"
import { useState } from "react"
import { PopupCard } from "~/components/PopupCard"
import { useTableContext } from "~/components/Table/context"

export function ColumnVisibilityButton() {
    const { getAllLeafColumns } = useTableContext<RowData>()

    const [isColumnCardVisible, setIsColumnCardVisible] = useState(false)

    return (
        <div className="relative z-10">
            <button type="button" className="btn btn-sm" onClick={() => setIsColumnCardVisible(!isColumnCardVisible)}>
                Columns
            </button>
            {isColumnCardVisible && (
                <PopupCard title="Columns" onClose={() => setIsColumnCardVisible(false)}>
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
                </PopupCard>
            )}
        </div>
    )
}
