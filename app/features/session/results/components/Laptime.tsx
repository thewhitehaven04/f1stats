import { formatLaptime } from "~/features/session/results/components/helpers"

export interface ILaptimeProps {
    value: number | null
    isPersonalBest?: boolean
    isSessionBest?: boolean
}

export const Laptime = (props: ILaptimeProps) => {
    const { value, isPersonalBest, isSessionBest } = props
    let classNames = ""

    if (isPersonalBest) {
        classNames = "text-green-600 font-semibold"
    } else if (isSessionBest) {
        // session best implies personal best by definition
        classNames = "text-purple-600 font-semibold"
    }
    return <span className={classNames}>{value ? formatLaptime(value) : "N/A"}</span>
}
