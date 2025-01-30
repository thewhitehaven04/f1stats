import type { HTMLProps } from "react"

export const TableHeaderCell = ({ children, className, ...rest }: HTMLProps<HTMLTableCellElement>) => {
    return (
        <th className={`bg-base-100 py-2 ${className}`} {...rest}>
            {children}
        </th>
    )
}
