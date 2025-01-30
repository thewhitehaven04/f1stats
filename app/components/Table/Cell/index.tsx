export function TableCell({ children, className, ...rest }: React.HTMLProps<HTMLTableCellElement>) {
    return (
        <td className={`p-0 first:rounded-l-md last:rounded-r-md ${className}`} {...rest}>
            {children}
        </td>
    )
}
