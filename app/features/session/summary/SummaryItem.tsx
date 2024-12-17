import type { ReactNode } from "react"

interface ISummaryItemProps {
    label: ReactNode
    value: ReactNode
}

export function SummaryItem(props: ISummaryItemProps) {
    const { label, value } = props

    return (
        <div className="flex flex-col justify-center">
            <span className="font-medium text-gray-500">{label}</span>
            <span>{value}</span>
        </div>
    )
}
